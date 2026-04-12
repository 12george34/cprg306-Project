import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    );

    const body = await request.text();
    const sig = request.headers.get('stripe-signature')!;

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const userId = session.metadata?.userId;
        const items = JSON.parse(session.metadata?.items || '[]');
        const total = session.amount_total / 100;

        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({ userId, total, status: 'paid', orderDate: new Date().toISOString() })
            .select()
            .single();

        if (orderError) {
            console.error(orderError);
            return Response.json({ error: orderError.message }, { status: 500 });
        }

        const orderItems = items.map((item: any) => ({
            orderId: order.id,
            bookId: item.id,
            qty: item.qty ?? 1,
            price: item.price,
        }));

        await supabase.from('orderItems').insert(orderItems);
    }

    return Response.json({ received: true });
}
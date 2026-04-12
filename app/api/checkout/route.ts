import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    const { items } = await request.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
            price_data: {
                currency: 'cad',
                product_data: {
                    name: item.title,
                    images: [item.cover_url],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.qty ?? 1,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        metadata: {
            userId: user?.id ?? '',
            items: JSON.stringify(items),
        },
    });

    return Response.json({ url: session.url });
}
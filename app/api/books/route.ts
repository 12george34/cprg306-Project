import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre') || 'Popular'
    const supabase = await createClient()

    const { data, error } = await supabase.from('books').select('*').eq('genre', genre)

    console.log('genre:', genre)
    console.log('data:', data)
    console.log('error:', error)

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json(data)
}
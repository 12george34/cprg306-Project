import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const genres = [
    { subject: 'fiction', genre: 'Popular' },
    { subject: 'adventure', genre: 'Recently Added' },
    { subject: 'fantasy', genre: 'Most Anticipated' },
    { subject: 'mystery', genre: 'Staff Picks' },
    { subject: 'children', genre: 'Kids' },
    { subject: 'horror', genre: 'Horror' },
]

async function seed() {
    for (const { subject, genre } of genres) {
        const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=10`)
        const data = await res.json()

        for (const book of data.works) {
            await supabase.from('books').insert({
                title: book.title,
                author: book.authors?.[0]?.name ?? 'Unknown',
                cover_url: book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : null,
                genre,
                price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
                stock: 10,
            })
        }
        console.log(`✓ Seeded ${genre}`)
    }
    console.log('Done!')
}

seed()
'use client';
import React, { useState } from 'react'
import '../globals.css'
import { useRouter } from 'next/navigation';


const testItems = [
  { id: '1', title: 'Pride and Prejudice', author: 'Jane Austen', cover_url: 'https://covers.openlibrary.org/b/id/14348537-M.jpg', price: 12.59, qty: 1 },
  { id: '2', title: 'Hamlet', author: 'William Shakespeare', cover_url: 'https://covers.openlibrary.org/b/id/8281954-M.jpg', price: 7.82, qty: 1 },
]


export default function cart() {
  const [cartItems, setCartItems] = useState(testItems)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)


  async function handleCheckout() {
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems })
    })

    const { url } = await res.json()
    window.location.href = url


  }




  return (

    <div className='bg-black min-h-screen w-full flex flex-col items-center text-center'>


      <header>
        <h1 className='text-[32px] text-white mt-10'>Shopping Cart</h1>
      </header>

      <main className='w-full px-10 mt-6'>
        {cartItems.map(item => (
          <div key={item.id} className='flex items-center bg-gray-800 rounded-lg p-4 mb-4'>
            <img src={item.cover_url} alt={item.title} className='w-16 h-24 object-cover rounded' />
            <div className='flex-1 text-black'>
              <p className='font-bold'>{item.title}</p>
              <p className='text-gray-400 text-sm'>{item.author}</p>
              <p className='text-green-600'>${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className='text-white text-xl mt-4 mb-4'>
          Total: ${total.toFixed(2)}
        </div>

        <button onClick={handleCheckout} disabled={loading} className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-500'>
          {loading ? "loading..." : "Checkout"}
        </button>
      </main>

    </div>
  )
}

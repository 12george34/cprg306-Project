'use client';
import React, { useEffect, useState } from 'react'
import '../globals.css'
import { useRouter } from 'next/navigation';


interface CartItem {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  price: number;
  qty: number;
}

export default function cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);


  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)


  function handleRemove(id: string) {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  }

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
        {cartItems.length === 0 ? (
          <p className='text-white mt-10'>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className='flex items-center bg-gray-800 rounded-lg p-4 mb-4'>
                <img src={item.cover_url} alt={item.title} className='w-16 h-24 object-cover rounded' />
                <div className='flex-1 text-left ml-4'>
                  <p className='font-bold text-white'>{item.title}</p>
                  <p className='text-gray-400 text-sm'>{item.author}</p>
                  <p className='text-green-600'>${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className='text-red-400 hover:text-red-600 ml-4'
                >
                  Remove
                </button>
              </div>
            ))}

            <div className='text-white text-xl mt-4 mb-4'>
              Total: ${total.toFixed(2)}
            </div>

            <button onClick={handleCheckout} disabled={loading} className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-500'>
              {loading ? "loading..." : "Checkout"}
            </button>
          </>
        )}
      </main>
    </div>
  )
}


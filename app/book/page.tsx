"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  price: number;
  stock: number;
}

function BookContent() {
  const [book, setBook] = useState<Book | null>(null);
  const [added, setAdded] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id || id === "undefined") return;
    fetch(`/api/books/${id}`)
      .then((r) => r.json())
      .then((data) => setBook(data));
  }, [id]);

  function handleAddToCart() {
    if (!book) return;

    const existing = localStorage.getItem("cart");
    const cart = existing ? JSON.parse(existing) : [];

    const alreadyIn = cart.find((item: any) => item.id === book.id);
    if (!alreadyIn) {
      cart.push({ ...book, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
  }

  if (!book) return <div>Loading...</div>;

  return (
    <main>
      <div className="mt-5 flex justify-center gap-8">
        <div className="max-h-[500px] max-w-[300px] w-full">
          <img
            src={book.cover_url}
            alt={`${book.title} cover`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl">{book.title}</h1>
          <h2 className="text-2xl">{book.author}</h2>
          <p className="text-2xl text-left">${book.price}</p>
          <h2 className="text-xl text-left">
            {book.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            ) : (
              <p>Out of stock</p>
            )}
          </h2>
        </div>
      </div>
    </main>
  );
}

export default function Book() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookContent />
    </Suspense>
  );
}
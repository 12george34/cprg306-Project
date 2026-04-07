"use client";

import { placeholderBook } from "@/lib/placeholder-data";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Book {
  title: string;
  author: string;
  coverURL: string;
  pubDate: string;
  price: number;
  stock: number;
  isbn: string;
}

export default function Book() {
  // const book = placeholderBook;

  const [book, setBook] = useState<Book | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Get book data from database
  useEffect(() => {
    console.log("id:", id);
    if (!id || id === "undefined") return;

    fetch(`/api/books/${id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Received data:", data);
        setBook(data);
      });
  }, [id]); // re-fetches if id changes

  if (!book) return <div>Loading...</div>;

  return (
    <main>
      <div className="mt-5 flex justify-center gap-8">
        <div className="max-h-[500px] max-w-[300px] w-full">
          <img
            src={book.coverURL}
            alt={`${book.title} cover`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl">{book.title}</h1>
          <h2 className="text-2xl">
            {book.author}, {book.pubDate}
          </h2>
          <p className="text-2xl text-right">${book.price}</p>
          <h2 className="text-xl text-right">
            {book.stock > 0 ? <p>Add to Cart</p> : <p>Out of stock</p>}
          </h2>
        </div>
      </div>
      <div>
        <h2 className="text-2xl">Summary:</h2>
        <p>Summary text</p>
        <p>ISBN: {book.isbn}</p>
      </div>
    </main>
  );
}

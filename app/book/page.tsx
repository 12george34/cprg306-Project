"use client";

import { placeholderBook } from "@/lib/placeholder-data";

export default function Book() {
  const book = placeholderBook;

  return (
    <main>
      <div className="mt-5 flex justify-center gap-8">
        <img src={book.coverURL} width="250" />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl">{book.title}</h1>
          <h2 className="text-2xl">{book.author}, {book.pubDate}</h2>
          <p className="text-2xl text-right">${book.price}</p>
          <h2 className="text-xl text-right">{book.stock > 0 ? <p>Add to Cart</p> : <p>Out of stock</p>}</h2>
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

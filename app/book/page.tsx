"use client";

import { placeholderBook } from "@/lib/placeholder-data";

export default function Book() {
  const book = placeholderBook;

  return (
    <main>
      <div className="flex gap-5">
        <img src={book.coverURL} width="250" />
        <div>
          <h1 className="text-4xl">{book.title}</h1>
          <h2>{book.author}</h2>
          <p>Published: {book.pubDate}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Price: {book.price}</p>
          <h2>{book.stock > 0 ? <p>Add to Cart</p> : <p>Out of stock</p>}</h2>
        </div>
      </div>
      <div>
        <h2>Summary:</h2>
        <p>Summary text</p>
      </div>
    </main>
  );
}

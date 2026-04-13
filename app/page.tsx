"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function BookRow({ title, genre, sortBy }: { title: string; genre: string; sortBy: string }) {
  const [books, setBooks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/books?genre=${genre}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [genre]);

  const sorted = [...books].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Title: A-Z") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section className="w-full px-10 my-6">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {sorted.map((book: any) => (
          <div
            key={book.id}
            className="flex-shrink-0 w-32 flex flex-col items-center cursor-pointer"
            onClick={() => router.push(`/book?id=${book.id}`)}
          >
            <img
              src={book.cover_url}
              alt={book.title}
              className="w-28 h-40 object-cover rounded shadow"
            />
            <p className="text-xs text-center mt-1 dark:text-white">{book.title}</p>
            <p className="text-xs text-center text-gray-500">{book.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("Default");

  return (
    <div className="flex flex-col flex-1 items-center font-sans">
      <button onClick={() => router.push("../cart")}>
        <FontAwesomeIcon icon={faShoppingCart} className="cart" />
      </button>

      <header className="header">
        <h1 className="text-5xl text-white mt-4">Welcome to Haylo</h1>
      </header>

      {/* Sort dropdown */}
      <div className="w-full px-10 mt-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        >
          <option>Default</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Title: A-Z</option>
        </select>
      </div>

      <main className="w-full">
        <BookRow title="Popular" genre="Popular" sortBy={sortBy} />
        <BookRow title="Recently Added" genre="Recently Added" sortBy={sortBy} />
        <BookRow title="Most Anticipated" genre="Most Anticipated" sortBy={sortBy} />
        <BookRow title="Staff Picks" genre="Staff Picks" sortBy={sortBy} />
        <BookRow title="Horror" genre="Horror" sortBy={sortBy} />
      </main>
    </div>
  );
}
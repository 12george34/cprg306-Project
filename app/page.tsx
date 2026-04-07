"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import router from "next/dist/shared/lib/router/router";

function BookRow({ title, genre }: { title: string, genre: string }) {
  const [books, setBooks] = useState<any[]>([]);
  const router = useRouter();
 
  useEffect(() => {
    fetch(`/api/books?genre=${genre}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [genre]);

  return (
    <section className="w-full px-10 my-6">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {books.map((book: any) => (
          <div key={book.id} className="flex-shrink-0 w-32 flex flex-col items-center cursor-pointer"
            onClick={() => router.push(`/book?id=${book.id}`)}>
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

  return (
    <div className="flex flex-col flex-1 items-center font-sans dark:bg-black">
      <button onClick={() => router.push("../cart")}>
        <FontAwesomeIcon icon={faShoppingCart} className="cart" />
      </button>

      <header className="header">
        <h1 className="text-5xl dark:text-white">
          Welcome to Haylo
        </h1>
      </header>

      <main className="main">
        <p>New This Week</p>
        <p>Popular</p>
        <p>Recently added</p>
        <p>Most Anticipated</p>
        <p>Staff Picks</p>
        <p>Buy 2, Get a free third kids book</p>
        <p>Horror</p>
      </main>
    </div>
  );
}

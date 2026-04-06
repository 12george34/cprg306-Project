"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import router from "next/dist/shared/lib/router/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-50 font-sans dark:bg-black">
      <button onClick={() => router.push("../cart")}>
        <FontAwesomeIcon icon={faShoppingCart} className="cart" />
      </button>

      <header className="header">
        <h1 className="text-5xl text-black dark:text-white">
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

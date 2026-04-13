"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSignIn(event: React.SyntheticEvent) {
    // Prevent reloading page on submit
    event.preventDefault();

    // Reset error message
    setError("");

    // Log in
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      setError(response.error.message);
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <header className="header">
        <h1 className="text-5xl dark:text-black text-center mt-5">Login</h1>
      </header>

      <form
        className="border rounded-lg mx-8 my-8 py-5 flex flex-col items-center gap-6"
        onSubmit={handleSignIn}
      >
        {/* Enter email */}
        <div className="flex">
          <label className="w-24 text-left text-lg">Email: </label>
          <input
            className="border rounded px-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Enter password */}
        <div className="flex">
          <label className="w-24 text-left text-lg">Password: </label>
          <input
            className="border rounded px-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Display error */}
        {error ? (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        ) : null}

        {/* Submit button */}
        <button
          className="border rounded px-4 py-1 text-xl active:scale-90"
          type="submit"
          disabled={!email || !password}
        >
          Login
        </button>

        {/* Sign-Up Link */}
        <div className="flex flex-col items-center">
          <p className="my-3">Don't have an account?</p>
          <Link
            href="/signup"
            className="border rounded px-4 py-1 text-xl active:scale-90 "
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

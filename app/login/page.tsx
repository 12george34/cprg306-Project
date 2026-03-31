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

  async function handleSignIn(event) {
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
      router.push("/page");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSignIn}>
        {/* Enter email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Enter password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Display error */}
        <div>{error ? <p>{error}</p> : null}</div>
        {/* Submit button */}
        <button
          type="submit"
          onClick={handleSignIn}
          disabled={!email || !password}
        >
          Login
        </button>
      </form>
    </div>
  );
}

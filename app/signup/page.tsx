"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSignUp(event: React.SyntheticEvent) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    });
    const signUpError = response.error;

    if (signUpError) {
      setError(signUpError.message);
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <header className="header">
        <h1 className="text-5xl dark:text-white">Sign Up</h1>
      </header>

      <form
        className="border rounded-lg mx-8 my-8 py-5 flex flex-col items-center gap-6"
        onSubmit={handleSignUp}
      >
        <div className="flex">
          <label className="w-36 text-left text-lg">Name: </label>
          <input
            className="border rounded px-2"
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                  .join(" "),
              )
            }
            required
          />
        </div>
        <div className="flex">
          <label className="w-36 text-left text-lg">Email: </label>
          <input
            className="border rounded px-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex">
          <label className="w-36 text-left text-lg">Password: </label>
          <input
            className="border rounded px-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex">
          <label className="w-36 text-left text-lg">Confirm Password: </label>
          <input
            className="border rounded px-2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="border rounded px-4 py-1 text-xl active:scale-90"
          type="submit"
          disabled={!name || !email || !password || !confirmPassword}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed to register");
    else router.push("/login");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-slate-800 rounded-xl">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
      <div className="mt-4 text-center">
        Already registered?{" "}
        <a className="text-blue-600 underline" href="/login">
          Login here
        </a>
      </div>
    </div>
  );
}

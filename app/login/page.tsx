"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    else router.push("/");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 bg-stone-800 p-8 rounded-xl">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
      <div className="mt-4 text-center">
        New user?{" "}
        <a className="text-blue-600 underline" href="/register">
          Register here
        </a>
      </div>
    </div>
  );
}

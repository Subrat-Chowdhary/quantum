"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("librarian");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed to register");
    else {
      // Redirect to appropriate login page based on role
      const loginPath = role === "admin" ? "/admin/login" : "/library/login";
      router.push(loginPath);
    }
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded text-black"
        >
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
      <div className="mt-4 text-center text-gray-300">
        Already registered?{" "}
        <div className="flex justify-center space-x-4 mt-2">
          <a className="text-red-400 underline" href="/admin/login">
            Admin Login
          </a>
          <a className="text-green-400 underline" href="/library/login">
            Library Login
          </a>
        </div>
      </div>
    </div>
  );
}

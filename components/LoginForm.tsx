"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  redirectPath: string;
  title: string;
  bgColor?: string;
  expectedRole?: string;
}

export default function LoginForm({ redirectPath, title, bgColor = "bg-stone-800", expectedRole }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(expectedRole || "librarian");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else if (res?.ok) {
        // Force a page refresh to trigger middleware and proper redirection
        // The middleware will handle role validation and redirect appropriately
        window.location.href = redirectPath;
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`max-w-sm mx-auto mt-20 ${bgColor} p-8 rounded-xl`}>
      <h2 className="text-2xl mb-4 text-white">{title}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded text-black"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded text-black"
        >
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
        {error && <div className="text-red-400">{error}</div>}
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="mt-4 text-center text-gray-300">
        New user?{" "}
        <a className="text-blue-400 underline" href="/register">
          Register here
        </a>
      </div>
    </div>
  );
}
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-lg mx-auto mt-20">
      <h1 className="text-3xl mb-4">Welcome to Auth Demo</h1>
      {session?.user ? (
        <div className="w-96 h-auto bg-slate-600 p-4 rounded-xl">
          <p>
            Signed in as <strong>{session.user.email}</strong> <br />
            Name: <strong>{session.user.name}</strong> <br />
            Role: <strong>{session.user.role}</strong>
          </p>
          <form action="/api/auth/signout" method="post">
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div className="w-96 h-auto bg-stone-600 p-4 rounded-xl">
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </Link>
          <Link href="/register" className="ml-2 text-blue-700 underline">
            Register
          </Link>
        </div>
      )}
    </main>
  );
}

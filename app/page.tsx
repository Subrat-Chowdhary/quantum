import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-lg mx-auto mt-20">
      <h1 className="text-3xl mb-4">Next Auth enabled boilerplate</h1>
      {session?.user ? (
        <div className="w-96 h-auto bg-slate-600 p-4 rounded-xl">
          <p>
            Signed in as <strong>{session.user.email}</strong> <br />
            Name: <strong>{session.user.name}</strong> <br />
            Role: <strong>{session.user.role}</strong>
          </p>
          <form action="/api/auth/signout" method="post">
            <Button >
              Logout
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-96 h-auto bg-stone-200 p-4 rounded-xl space-y-4">
          <div className="flex space-x-4">
            <Link href="/admin/login">
              <Button className="bg-red-600 hover:bg-red-700">
                Admin Login
              </Button>
            </Link>
            <Link href="/library/login">
              <Button className="bg-green-600 hover:bg-green-700">
                Library Login
              </Button>
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/register" className="text-blue-700 underline">
              Register
            </Link>
            <Link href="/test-auth" className="text-purple-700 underline text-sm">
              Test Authentication
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

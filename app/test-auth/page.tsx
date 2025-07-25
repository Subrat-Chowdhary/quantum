import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TestAuthPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>
      
      {user ? (
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">✅ Authenticated User</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          
          <div className="mt-4 space-x-4">
            {user.role === "admin" ? (
              <Link href="/admin/dashboard">
                <Button className="bg-red-600 hover:bg-red-700">
                  Go to Admin Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/library/dashboard">
                <Button className="bg-green-600 hover:bg-green-700">
                  Go to Library Dashboard
                </Button>
              </Link>
            )}
            
            <form action="/api/auth/signout" method="post" className="inline">
              <Button variant="outline">
                Logout
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">❌ Not Authenticated</h2>
          <p className="mb-4">You need to log in to access protected areas.</p>
          
          <div className="space-x-4">
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
        </div>
      )}

      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🧪 Test Links</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Login Pages:</h3>
            <ul className="space-y-1">
              <li><Link href="/admin/login" className="text-blue-600 underline">Admin Login</Link></li>
              <li><Link href="/library/login" className="text-blue-600 underline">Library Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Protected Pages:</h3>
            <ul className="space-y-1">
              <li><Link href="/admin/dashboard" className="text-blue-600 underline">Admin Dashboard</Link></li>
              <li><Link href="/library/dashboard" className="text-blue-600 underline">Library Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Other:</h3>
            <ul className="space-y-1">
              <li><Link href="/register" className="text-blue-600 underline">Register</Link></li>
              <li><Link href="/" className="text-blue-600 underline">Home</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
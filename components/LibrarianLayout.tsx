import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { redirect } from "next/navigation";

interface LibrarianLayoutProps {
  children: React.ReactNode;
}

export default async function LibrarianLayout({ children }: LibrarianLayoutProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/library/login");
  }
  
  if (user.role !== "librarian") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-green-800 dark:bg-green-900">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-green-900 dark:bg-green-950">
            <h1 className="text-white text-xl font-bold">Library System</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <a
              href="/library/dashboard"
              className="flex items-center px-4 py-2 text-white hover:bg-green-700 dark:hover:bg-green-800 rounded-lg transition-colors"
            >
              📚 Dashboard
            </a>
            <a
              href="/library/books"
              className="flex items-center px-4 py-2 text-white hover:bg-green-700 dark:hover:bg-green-800 rounded-lg transition-colors"
            >
              📖 Books
            </a>
            <a
              href="/library/members"
              className="flex items-center px-4 py-2 text-white hover:bg-green-700 dark:hover:bg-green-800 rounded-lg transition-colors"
            >
              👤 Members
            </a>
            <a
              href="/library/loans"
              className="flex items-center px-4 py-2 text-white hover:bg-green-700 dark:hover:bg-green-800 rounded-lg transition-colors"
            >
              📋 Loans
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Welcome, {user.name}
              </h2>
              <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                {user.role}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </span>
              <ThemeToggle />
              <form action="/api/auth/signout" method="post">
                <Button 
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-950"
                >
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
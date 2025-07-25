import LibrarianLayout from "@/components/LibrarianLayout";
import { getCurrentUser } from "@/lib/session";

export default async function LibraryDashboard() {
  const user = await getCurrentUser();

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Library Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to the library management system. Manage books, members, and loans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              📚 Books
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-300">1,234</p>
            <p className="text-green-600 dark:text-green-300 text-sm">Total books</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              👤 Members
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-300">567</p>
            <p className="text-green-600 dark:text-green-300 text-sm">Active members</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              📋 Active Loans
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-300">89</p>
            <p className="text-green-600 dark:text-green-300 text-sm">Currently borrowed</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              ⚠️ Overdue
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-300">12</p>
            <p className="text-green-600 dark:text-green-300 text-sm">Overdue items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-300">Book returned: "The Great Gatsby"</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-300">New member registered: John Doe</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Book borrowed: "To Kill a Mockingbird"</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">6 hours ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Current Session
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Name:</span> {user?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Role:</span> {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
}
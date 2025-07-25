import AdminLayout from "@/components/AdminLayout";
import { getCurrentUser } from "@/lib/session";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to the admin panel. You have full access to system management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              User Management
            </h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              Manage system users and their roles
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              System Settings
            </h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              Configure system-wide settings
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Reports
            </h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              View system reports and analytics
            </p>
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
    </AdminLayout>
  );
}
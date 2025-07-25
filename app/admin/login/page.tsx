import LoginForm from "@/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
      <LoginForm 
        redirectPath="/admin/dashboard"
        title="Admin Login"
        bgColor="bg-red-800"
        expectedRole="admin"
      />
    </div>
  );
}
import LoginForm from "@/components/LoginForm";

export default function LibraryLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
      <LoginForm 
        redirectPath="/library/dashboard"
        title="Library Login"
        bgColor="bg-green-800"
        expectedRole="librarian"
      />
    </div>
  );
}
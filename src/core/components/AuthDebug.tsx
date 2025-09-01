import { useAuth } from "../hooks/useAuth";

export default function AuthDebug() {
  const auth = useAuth();

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Loading: {auth.loading ? "Yes" : "No"}</div>
        <div>Logged In: {auth.isLoggedIn ? "Yes" : "No"}</div>
        <div>User: {auth.user ? auth.user.email : "None"}</div>
        <div>User ID: {auth.user?.uid || "None"}</div>
      </div>
    </div>
  );
}

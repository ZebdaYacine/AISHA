import { useEffect, useState } from "react";
import { collection, getDocs, FirestoreError } from "firebase/firestore";
import { db } from "../firebase";

type User = {
  address: string;
  email: string;
  is_artisan: boolean;
  password: string;
  phone: string;
  photo_profile: string;
  province: string;
  role: string;
  type: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log("Fetching users from Firestore...");
        const usersCol = collection(db, "users");
        console.log("Collection reference created:", usersCol);

        const userSnapshot = await getDocs(usersCol);
        console.log("Snapshot received, docs count:", userSnapshot.docs.length);

        const userList = userSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Document data:", data);
          return data as User;
        });

        setUsers(userList);
        setLoading(false);
        console.log("Users loaded successfully:", userList.length);
      } catch (err) {
        console.error("Error fetching users:", err);

        if (err instanceof FirestoreError) {
          switch (err.code) {
            case "permission-denied":
              setError(
                "Permission denied. Please check your Firebase security rules."
              );
              break;
            case "unavailable":
              setError("Firebase service is currently unavailable.");
              break;
            case "invalid-argument":
              setError(
                "Invalid collection name or Firebase configuration issue."
              );
              break;
            case "failed-precondition":
              setError("Firebase operation failed due to a precondition.");
              break;
            case "aborted":
              setError("Firebase operation was aborted.");
              break;
            case "out-of-range":
              setError("Firebase operation is out of range.");
              break;
            case "unimplemented":
              setError("Firebase operation is not implemented.");
              break;
            case "internal":
              setError("Firebase internal error occurred.");
              break;
            case "data-loss":
              setError("Firebase data loss occurred.");
              break;
            default:
              setError(`Firebase error: ${err.message} (Code: ${err.code})`);
          }
        } else if (err instanceof Error) {
          // Handle network errors or other JavaScript errors
          if (
            err.message.includes("400") ||
            err.message.includes("Bad Request")
          ) {
            setError(
              "Bad request to Firebase. Please check your internet connection and try again."
            );
          } else if (
            err.message.includes("network") ||
            err.message.includes("fetch")
          ) {
            setError("Network error. Please check your internet connection.");
          } else {
            setError(`Error: ${err.message}`);
          }
        } else {
          setError(
            "Failed to fetch users. Please check your internet connection and Firebase configuration."
          );
        }

        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <span className="font-bold">Error:</span>
          <span className="ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Province</th>
            <th>Role</th>
            <th>Type</th>
            <th>Is Artisan</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                No users found in the database
              </td>
            </tr>
          ) : (
            users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.email || "N/A"}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.province || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {user.role || "N/A"}
                  </span>
                </td>
                <td>{user.type || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      user.is_artisan ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {user.is_artisan ? "Yes" : "No"}
                  </span>
                </td>
                <td className="max-w-xs truncate" title={user.address}>
                  {user.address || "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-600">
        Total users: {users.length}
      </div>
    </div>
  );
}

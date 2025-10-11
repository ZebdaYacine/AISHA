import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function SimpleFirebaseTest() {
  const [status, setStatus] = useState("Ready to test");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus("Testing connection...");

    try {
      // Simple test - just try to create a collection reference
      const testCol = collection(db, "users");
      setStatus("Collection reference created successfully");
      // Try to get docs (this might fail due to permissions)
      const snapshot = await getDocs(testCol);
      setStatus(`✅ Success! Found ${snapshot.docs.length} documents`);
    } catch (error) {
      console.error("Test error:", error);
      setStatus(
        `❌ Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    setLoading(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Simple Firebase Test</h2>
        <p className="text-sm text-gray-600 mb-4">
          This will test basic Firebase connectivity
        </p>

        <button
          className="btn btn-primary"
          onClick={testConnection}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Test Connection"
          )}
        </button>

        <div className="mt-4">
          <strong>Status:</strong> {status}
        </div>
      </div>
    </div>
  );
}

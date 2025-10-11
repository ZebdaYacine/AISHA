import { useState } from "react";
import { collection, getDocs, FirestoreError } from "firebase/firestore";
import { db } from "../firebase";

export default function CollectionTest() {
  const [collectionName, setCollectionName] = useState("users");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testCollection = async () => {
    setLoading(true);
    setResult("Testing...");

    try {
      console.log(`Testing collection: ${collectionName}`);
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);

      setResult(
        `✅ Success! Found ${snapshot.docs.length} documents in "${collectionName}"`
      );
      console.log(
        `Collection "${collectionName}" has ${snapshot.docs.length} documents`
      );

      if (snapshot.docs.length > 0) {
        console.log("First document:", snapshot.docs[0].data());
      }
    } catch (err) {
      console.error(`Error testing collection "${collectionName}":`, err);

      if (err instanceof FirestoreError) {
        setResult(`❌ Error: ${err.code} - ${err.message}`);
      } else {
        setResult(`❌ Error: ${err}`);
      }
    }

    setLoading(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Test Collection Access</h2>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Collection Name</span>
            </label>
            <div className="input-gro`up">
              <input
                type="text"
                placeholder="Enter collection name"
                className="input input-bordered"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={testCollection}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Test"
                )}
              </button>
            </div>
          </div>

          <div className="alert">
            <span>{result}</span>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Common collection names to try:</strong>
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>users</li>
              <li>user</li>
              <li>User</li>
              <li>Users</li>
              <li>customers</li>
              <li>profiles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

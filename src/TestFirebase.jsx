import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function TestFirebase() {
  const [status, setStatus] = useState("Testing...");
  const [user, setUser] = useState(null);
  const [testEmail] = useState(
    `test${Math.floor(Math.random() * 10000)}@test.com`
  );
  const [testPassword] = useState("test123456");

  useEffect(() => {
    // Test 1: Check Firebase connection
    console.log("Firebase Auth Object:", auth);
    console.log("Firebase App Name:", auth.app.name);

    if (auth) {
      setStatus("✅ Firebase Connected!");
    } else {
      setStatus("❌ Firebase Not Connected");
    }
  }, []);

  const testSignUp = async () => {
    try {
      setStatus("Creating test user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        testEmail,
        testPassword
      );
      setUser(userCredential.user);
      setStatus(`✅ User Created: ${userCredential.user.email}`);
      console.log("User created:", userCredential.user);
    } catch (error) {
      setStatus(`❌ Signup Error: ${error.code}`);
      console.error("Signup error:", error);
    }
  };

  const testSignIn = async () => {
    try {
      setStatus("Signing in...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        testEmail,
        testPassword
      );
      setUser(userCredential.user);
      setStatus(`✅ Signed In: ${userCredential.user.email}`);
      console.log("Signed in:", userCredential.user);
    } catch (error) {
      setStatus(`❌ Login Error: ${error.code}`);
      console.error("Login error:", error);
    }
  };

  const testSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setStatus("✅ Signed Out Successfully");
    } catch (error) {
      setStatus(`❌ Logout Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Firebase Test
      </h2>

      <div
        className={`p-3 mb-4 rounded-lg ${
          status.includes("✅")
            ? "bg-green-100 dark:bg-green-900"
            : "bg-red-100 dark:bg-red-900"
        }`}
      >
        <p className="font-medium">{status}</p>
        <p className="text-sm mt-1">Test Email: {testEmail}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={testSignUp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Test Sign Up
        </button>

        <button
          onClick={testSignIn}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Test Sign In
        </button>

        <button
          onClick={testSignOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Test Sign Out
        </button>
      </div>

      {user && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="font-semibold">Current User:</p>
          <p className="text-sm">Email: {user.email}</p>
          <p className="text-sm">UID: {user.uid.substring(0, 10)}...</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <p className="text-sm font-medium mb-2">Check Browser Console for:</p>
        <ul className="text-xs space-y-1">
          <li>• Firebase Auth Object</li>
          <li>• Firebase App Name</li>
          <li>• Any error messages</li>
        </ul>
      </div>
    </div>
  );
}

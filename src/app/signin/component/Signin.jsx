"use client"

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Folosim router-ul pentru redirecționare
import { useWallet } from "../../context/globalContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/"; 
  console.log(redirect);
   const { setAuth, setEmail: setContextEmail } = useWallet();
   const handleSubmit = async (e) => {
    e.preventDefault();
    // Validare locală
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Apel către ruta API pentru autentificare
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Actualizăm autentificarea și redirecționăm
      setAuth(true)
      console.log("auth setted true");
      setAuthenticated(true);
      setContextEmail(email)  
      setTimeout(() => {
        router.push(redirect); // Redirecționare către pagina principală
      }, 2000); // Redirecționare către pagina principală
    } else {
      // Setăm eroarea pentru UI
      setErrors((prev) => ({
        ...prev,
        form:
          data.message === "Incorrect password."
            ? "The password you entered is incorrect. Please try again."
            : data.message === "User not found. Please sign up."
            ? (
              <>
                User not found. Please{" "}
                <a href="/signup" className="text-blue-500 underline">Sign Up</a>.
              </>
            )
            : data.message || "Error signing in. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Partea stângă */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-900 text-white p-8">
        <div className="relative max-w-md">
          <img
            src="/assets/illustration.png"
            alt="AML Risk Illustration"
            className="rounded-lg shadow-lg"
          />
          <div className="mt-6 text-center">
            <h2 className="text-lg font-bold">Checking wallets for illicit funds</h2>
            <p className="mt-2 text-sm text-gray-400">
              Be safe with us. We take care of your crypto.
            </p>
          </div>
        </div>
      </div>

      {/* Partea dreaptă */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
        <p className="text-sm text-gray-500 mb-8">
          or <a href="/signup" className="text-blue-500 hover:underline">Create an account</a>
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showPassword ? "👁️" : "🔒"}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Form Error */}
          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          {
            authenticated && 
                            <p className="text-green-500 text-sm mt-2">
                                Sign in successful! Welcome aboard! 🎉
                            </p>
          }    
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
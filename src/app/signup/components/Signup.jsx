"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Folosim router-ul pentru redirecționare
import { useWallet } from "../../context/globalContext";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setAuth, setEmail: setContextEmail } = useWallet();
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [subscribeNews, setSubscribeNews] = useState(false);
    const [errors, setErrors] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const searchParams = useSearchParams();
      const router = useRouter();
      const redirect = searchParams.get("redirect") || "/";
    console.log(errors);
    console.log("Errors length:", Object.keys(errors).length);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {}; // Create an empty object to collect validation errors

    // Email validation
    if (!email) {
        newErrors.email = "Email is required."; // Add an error for the email field if it's empty
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Invalid email format."; // Add an error if the email is not in the correct format
    }

    // Password validation
    if (!password) {
        newErrors.password = "Password is required."; // Add an error for the password field if it's empty
    } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long."; // Add an error if the password is too short
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match."; // Add an error if the passwords don't match
    }

  // Terms validation
    if (!agreeTerms) {
        newErrors.terms = "You must agree to the terms and conditions."; // Add an error if terms are not agreed to
    }

  setErrors(newErrors); // Save all collected errors to the state

  // Return true if there are no errors (Object.keys returns an array of keys, and its length is 0 if the object is empty)
  
    // Trimite datele către API
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        setAuth(true); // Actualizează starea de autentificat
        setContextEmail(data.email); // Setează emailul în context
        setAuthenticated(true);
        setTimeout(() => {
          router.push(redirect)
        }, 2000)
      } else {
        
        console.log(data.message);
        
        setAuthenticated(false);
        setErrors((prevErrors) => ({
            ...prevErrors,
            authenticated:
              data.message === "User already exists!"
                ? (
                  <>
                    User already exists! Please <a href="/sign-in" className="text-blue-500 underline">Sign In</a>.
                  </>
                )
                : (
                  <>
                    Error during sign up. Please try again later. <a href="#" onClick={() => window.location.reload()} className="text-blue-500 underline">Reload the page</a>.
                  </>
                ),
          }));
      }
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {/* Left section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-900 text-white p-8">
    <div className="relative max-w-md">
        {/* Imaginea principală */}
        <img
        src="/assets/illustration.png"
        alt="AML Risk Illustration"
        className="rounded-lg shadow-lg"
        />
        {/* Textul de sub imagine */}
        <div className="mt-6 text-center">
        <h2 className="text-lg font-bold">Checking wallets for illicit funds</h2>
        <p className="mt-2 text-sm text-gray-400">
            Be safe with us. We take care of your crypto.
        </p>
        </div>
    </div>
    </div>

      {/* Right section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create an account</h2>
        <p className="text-sm text-gray-500 mb-8">
          Already have one? <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Email */}
          <div>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                // Actualizează erorile pentru email
                setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };

                if (!value) {
                    updatedErrors.email = "Email is required.";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    updatedErrors.email = "Invalid email format.";
                } else {
                    delete updatedErrors.email;
                }

                return updatedErrors;
                });
            }}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mt-4">
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                // Actualizează erorile pentru password
                if (errors) {
                    setErrors((prevErrors) => {
                        const updatedErrors = { ...prevErrors };
    
                        if (!value) {
                        updatedErrors.password = "Password is required.";
                        } else if (value.length < 8) {
                        updatedErrors.password = "Password must be at least 8 characters long.";
                        } else {
                        delete updatedErrors.password; // Elimină eroarea dacă parola este validă
                        }
    
                        return updatedErrors;
                    });
                }
                }}
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
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div className="mt-4">
            <div className="relative">
            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);

                // Actualizează erorile pentru confirmare
                setErrors((prevErrors) => {
                    const updatedErrors = { ...prevErrors };

                    if (value !== password) {
                    updatedErrors.confirmPassword = "Passwords do not match.";
                    } else {
                    delete updatedErrors.confirmPassword;
                    }

                    return updatedErrors;
                });
                }}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
            >
                {showConfirmPassword ? "👁️" : "🔒"}
            </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Agree to Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
            I agree to the <a href="#" className="text-blue-500 underline">terms and conditions</a>.
          </label>
        </div>

         {/* Subscribe to News Checkbox */}
         <div className="flex items-center">
          <input
            type="checkbox"
            id="subscribeNews"
            checked={subscribeNews}
            onChange={(e) => setSubscribeNews(e.target.checked)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="subscribeNews" className="ml-2 text-sm text-gray-600">
            I want to receive news and updates.
          </label>
        </div>

        {/* Submit Button */}
        {errors.authenticated && (
            <p className="text-red-500 text-sm mt-2">{errors.authenticated}</p>
        )}
        {authenticated && (
            <p className="text-green-500 text-sm mt-2">
                Sign up successful! Welcome aboard! 🎉
            </p>
        )}
        <div className="mt-6">
            <button
            type="submit"
            onClick={handleSubmit}
            disabled={
                Object.keys(errors).length > 0 || !email || !password || !confirmPassword || !agreeTerms
            }
            className={`w-full py-3 rounded-md ${
                Object.keys(errors).length > 0 || !email || !password || !confirmPassword || !agreeTerms
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            >
            Create an account
            </button>
        </div>
        </form>
        
      </div>
    </div>
    </Suspense>
  );
};

export default SignUp;
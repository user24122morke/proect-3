// components/AuthModal.js
"use client";

import React from "react";
import { useWallet } from "../../context/globalContext";
import { useRouter } from "next/navigation";

const AuthModal = ({ onClose }) => {
  const router = useRouter();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">ERROR</h2>
        <p className="text-gray-600 mb-4">
          You need to <a href="/signin" className="text-blue-600 hover:underline">authorize</a> to use all the features of the site.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={() => {
              router.push(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
              onClose();
            }}
          >
            Sign in
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            onClick={() => {
              router.push(`/signup?redirect=${encodeURIComponent(window.location.pathname)}`);
              onClose();
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

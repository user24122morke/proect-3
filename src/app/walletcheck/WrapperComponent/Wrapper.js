"use client";


import { useWallet } from "@/app/context/globalContext";
import WalletCheck from "../WalletCheckComponent";

const Wrapper = () => {
  const {email} = useWallet();
  console.log(email);
  
  return (
    <>
        
      <div className="w-[100%] flex justify-center h-6 p-10">
      <a href="/" className="flex items-center space-x-2">
          {/* Logo */}
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2 2 2m-2-6v4"
              />
            </svg>
          </div>
          {/* Text */}
          <span className="text-lg font-bold text-gray-800">AML Check</span>
        </a>
      </div>
   
      <WalletCheck/>
    </>
  )
};

export default Wrapper;

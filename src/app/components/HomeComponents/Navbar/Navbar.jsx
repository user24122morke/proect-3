"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">O</span>
          </div>
          <span>AML Check</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/products" className="text-gray-700 hover:text-blue-500">Products</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-500">Pricing</Link>
          <Link href="/risks" className="text-gray-700 hover:text-blue-500">Risks</Link>
          <Link href="/faq" className="text-gray-700 hover:text-blue-500">FAQ</Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-500">Blog</Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-500">About Us</Link>
        </nav>

        {/* Login Button */}
        <Link
          href="/login"
          className="hidden md:inline-block bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
        >
          Login
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={toggleMobileMenu}
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link href="/products" className="text-gray-700 hover:text-blue-500">
                Products
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-500">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/risks" className="text-gray-700 hover:text-blue-500">
                Risks
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-700 hover:text-blue-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-blue-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="text-gray-700 hover:text-blue-500">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

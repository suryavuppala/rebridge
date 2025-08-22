"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          {/* Logo and website name - pushed left */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/logo.jpeg" 
                alt="ReBridge Logo" 
                width={100} 
                height={100} 
                className="h-10 w-auto"
              />
              <span className="ml-2 text-2xl font-bold text-gray-800">ReBridge.</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links - pushed right */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-green-600 border-b-2 border-transparent hover:border-green-600">
                Home
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-green-600 border-b-2 border-transparent hover:border-green-600">
                About Us
              </Link>
              <Link href="/stats" className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-green-600 border-b-2 border-transparent hover:border-green-600">
                Stats
              </Link>
              <Link href="/pricing" className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-green-600 border-b-2 border-transparent hover:border-green-600">
                Price List 
              </Link>
              <Link href="/faqs" className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-green-600 border-b-2 border-transparent hover:border-green-600">
                FAQ's
              </Link>
              <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-green-600 border-b-2 border-transparent hover:border-green-600">
                Contact
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-green-600 hover:bg-gray-50">
              Home
            </Link>
            <Link href="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-green-600 hover:bg-gray-50">
              About Us
            </Link>
            <Link href="/services" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-green-600 hover:bg-gray-50">
              FAQ's
            </Link>
            <Link href="/contact" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-green-600 hover:bg-gray-50">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
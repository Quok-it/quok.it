"use client";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[75px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-4">
            <Image
              src="/logo.png"
              alt="Quok.it Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
              quality={100}
            />
            <span className="text-lg md:text-2xl font-bold text-white hover:text-red-500 transition-colors">
              Quok.it
            </span>
          </Link>
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2 text-red-500 text-xl lg:text-2xl font-semibold whitespace-nowrap">
            <span className="h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-red-500 animate-pulse" />
            Coming Soon
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/blog"
              className={`text-lg font-medium transition-colors ${
                pathname === "/blog"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/waitlist"
              className={`text-lg font-medium transition-colors ${
                pathname === "/waitlist"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Waitlist
            </Link>
            <Link
              href="/learn"
              className={`text-lg font-medium transition-colors ${
                pathname === "/learn"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              About
            </Link>
            <Link
              href="https://twitter.com/quok_it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors"
            >
              <FaXTwitter size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button - Now visible on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden p-2 text-white"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Modified for better visibility */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95">
            <div className="flex flex-col py-4">
              <div className="px-4 py-2 text-red-500 text-lg font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Coming Soon
              </div>
              <Link
                href="/blog"
                className="px-4 py-2 text-white hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/waitlist"
                className="px-4 py-2 text-white hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Waitlist
              </Link>
              <Link
                href="/learn"
                className="px-4 py-2 text-white hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="https://twitter.com/quok_it"
                className="px-4 py-2 text-white hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Twitter
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

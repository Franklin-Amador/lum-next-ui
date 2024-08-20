// * v3

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  const [shouldShowSidebarButton, setShouldShowSidebarButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const excludedPages = ["/login", "/forgot"];
    setShouldShowSidebarButton(!excludedPages.includes(pathname));
    setIsLoading(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <nav className="bg-blue-600 shadow-md">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href="/" className="ml-4 font-bold text-xl text-white">
              Lumina
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center h-16">
          {shouldShowSidebarButton && (
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          <Link href="/" className="ml-4 font-bold text-xl text-white">
            Lumina
          </Link>
        </div>
      </div>
    </nav>
  );
}
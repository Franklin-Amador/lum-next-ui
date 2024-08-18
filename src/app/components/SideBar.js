"use client";

import React from "react";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out fixed left-0 top-0 z-40`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          <SidebarLink href="/" label="Home" />
          <SidebarLink href="/instructores" label="Instructores" />
          <SidebarLink href="/solicitudes" label="Solicitudes" />
        </ul>
      </nav>
      <button
        onClick={() => {
            // Elimina el token de la cookie
            document.cookie = "token=; path=/;";
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = "/login";
        }}
        className="w-full py-2 px-4 mt-8 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </aside>
  );
}

function SidebarLink({ href, label }) {
  return (
    <li>
      <Link
        href={href}
        className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200 ease-in-out"
      >
        {label}
      </Link>
    </li>
  );
}
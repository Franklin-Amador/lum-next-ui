
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage y almacenarlo en el estado
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">

      {/* Botones para redireccionar */}
      <div className="space-y-6">
        <Link
          href="/instructores"
          className="block px-12 py-6 text-xl bg-blue-600 text-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
        >
          Ver Instructores
        </Link>
        <Link
          href="/solicitudes"
          className="block px-12 py-6 text-xl bg-green-600 text-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:bg-green-700 hover:scale-105"
        >
          Ver Solicitudes
        </Link>
      </div>
    </div>
  );
}


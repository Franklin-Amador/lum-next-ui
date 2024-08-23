
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import settings from './services/settings';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);  // Para manejar el estado de carga
  const router = useRouter();

  useEffect(() => {
    // Función para obtener el token de las cookies
    const getTokenFromCookies = () => {
      const name = "token=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    };

    const validateToken = async () => {
      const token = getTokenFromCookies();

      if (!token) {
        router.push('/login');  // Redirigir si no hay token
        return;
      }

      try {
        const response = await fetch(`${settings.domain}/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Enviar el token en los headers
          },
        });

        if (response.ok) {
          // Si el token es válido, permitir el acceso
          setIsLoading(false);
        } else {
          // Si el token no es válido, redirigir al login
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al validar el token:', error);
        router.push('/login');  // Redirigir al login en caso de error
      }
    };

    validateToken();  // Validar el token al montar el componente
  }, [router]);

  if (isLoading) {
    return <div>Validando el token...</div>;  // Mostrar un mensaje de carga mientras se valida el token
  }

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

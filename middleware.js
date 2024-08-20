// middleware.js
"use server";
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req) {
  // Obtener el token de las cookies
  const token = req.cookies.get('token')?.value;

  // Definir la URL de autenticación
  const authUrl = new URL(`/login`, req.url);

  // Lista de rutas públicas que no requieren autenticación
  const publicRoutes = [`/login`, `/register`, `/forgot-password`];

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Si es una ruta pública, permitir el acceso sin verificación
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir al login
  if (!token) {
    return NextResponse.redirect(authUrl);
  }

  try {
    // Validar el token llamando a la API de validación
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Redirigir al login si la respuesta es un 403
    if (response.status === 403) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/login`);
    }

    // Si la validación falla por otro motivo, redirigir al login
    if (!response.ok) {
      return NextResponse.redirect(authUrl);
    }

    // Si el token es válido, permitir el acceso
    return NextResponse.next();
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.redirect(authUrl);
  }
}

// Configuración del matcher para aplicar el middleware a todas las rutas
export const config = {
  matcher: [`/`,`instructores`,`/solicitudes`],
};

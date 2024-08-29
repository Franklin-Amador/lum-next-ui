
// pages/login.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import settings from '../../services/settings';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateUser } = useUser(); // Hook para actualizar el contexto del usuario

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${settings.domain}/login/custom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 404) {
        router.push('/404');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Credenciales incorrectas');
      }

      const data = await response.json();

      // Almacena el token en una cookie segura (no accesible por JavaScript)
      Cookies.set('token', data.idToken, { expires: 1, secure: true, sameSite: 'Strict' });

      // Actualiza el UserContext con los datos del usuario
      updateUser({
        rol_id: data.user.rol_id,
        nombre: data.user.nombre,
        email: data.user.email,
        // Agrega más datos del usuario si es necesario
      });

      // Redirige al usuario según el rol
      switch (data.user.rol_id) {
        case 1:
          router.push('/');
          break;
        case 2:
          router.push('/user');
          break;
        case 3:
          router.push('/colaborador');
          break;
        default:
          throw new Error('Rol no reconocido');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot" // Cambia esta ruta por la ruta correcta en tu aplicación
            className="text-blue-500 hover:underline"
          >
            ¿Olvidó su contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

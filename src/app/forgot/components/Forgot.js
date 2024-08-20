// pages/forgot-password.js
"use client"; // Asegúrate de que el componente funcione en el lado del cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import settings from '@/app/services/settings';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${settings.domain}/r/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el correo electrónico de recuperación');
      }

      setSuccess('Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Recuperar Contraseña</h1>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition`}
          >
            {loading ? 'Enviando...' : 'Enviar Correo Electrónico'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Volver al login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

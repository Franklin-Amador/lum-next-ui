"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SolicitudDetails({ params }) {
  const [solicitudData, setSolicitudData] = useState(null);
  const [message, setMessage] = useState('');
  const { solicitud } = params;
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('solicitudData');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.Id_Solicitud === Number(solicitud)) {
        setSolicitudData(parsedData);
      } else {
        console.error('El ID de solicitud en localStorage no coincide con el de la URL');
      }
    } else {
      console.error('No se encontraron datos de solicitud en localStorage');
    }

    // Función para limpiar los datos del localStorage al salir de la página
    const handleBeforeUnload = () => {
      localStorage.removeItem('solicitudData');
    };

    // Agregar el evento para antes de que se descargue la página
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Limpiar el evento cuando el componente se desmonte
      window.removeEventListener('beforeunload', handleBeforeUnload);
      localStorage.removeItem('solicitudData'); // También se asegura de borrar los datos al salir de la página
    };
  }, [solicitud]);

  const handleAction = async (action) => {
    try {
      const id = solicitudData.Id_Solicitud;
      let url = '';
      let method = 'POST';
      let payload = {};

      if (action === 'accept') {
        url = 'http://127.0.0.1:8000/solicitud';
        payload = { Id_Solicitud: id }; // Payload para aceptar la solicitud
      } else if (action === 'reject') {
        url = `http://127.0.0.1:8000/solicitudr/${id}`;
        method = 'PUT';
        payload = { Id_Solicitud: id }; // Payload para rechazar la solicitud
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error al ${action} la solicitud`);

      setMessage(`Solicitud ${action === 'accept' ? 'aprobada' : 'rechazada'}`);
      // Limpiar los datos de solicitud del localStorage
      localStorage.removeItem('solicitudData');
      // Redireccionar a la página de solicitudes después de un breve retraso
      setTimeout(() => router.push('/solicitudes'), 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    // Borra los datos de solicitud del localStorage
    localStorage.removeItem('solicitudData');
    // Redirecciona a la página de solicitudes
    router.push('/solicitudes');
  };

  if (!solicitudData) return <p className="text-center text-gray-600">Cargando...</p>;

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Volver a Solicitudes
        </button>
        <h2 className="text-3xl font-extrabold text-black mb-4">Detalles de la Solicitud</h2>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            <strong>Nombre:</strong> {solicitudData.primer_Nombre} {solicitudData.segundo_Nombre} {solicitudData.primer_Apellido} {solicitudData.segundo_Apellido}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>Fecha de Solicitud:</strong> {new Date(solicitudData.Fecha_Solicitud).toLocaleDateString()}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>Estado:</strong> {solicitudData.Estado}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>Descripción:</strong> {solicitudData.Descripción}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>Email:</strong> {solicitudData.mail}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>ID de Especialidad:</strong> {solicitudData.Id_Especialidad}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>ID de Solicitud:</strong> {solicitudData.Id_Solicitud}
          </p>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => handleAction('accept')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Aceptar
          </button>
          <button
            onClick={() => handleAction('reject')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Rechazar
          </button>
        </div>
        {message && <p className="mt-4 text-lg font-semibold text-red-600">{message}</p>}
      </div>
    </section>
  );
}

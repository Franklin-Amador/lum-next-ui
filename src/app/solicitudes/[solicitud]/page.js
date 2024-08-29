
// "use client";

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { acepptSolicitud, rejectSolicitud } from "../../services/solicitudes"; // Importa las funciones

// export default function SolicitudDetails({ params }) {
//   const [solicitudData, setSolicitudData] = useState(null);
//   const [message, setMessage] = useState('');
//   const { solicitud } = params;
//   const router = useRouter();

//   useEffect(() => {
//     const data = localStorage.getItem('solicitudData');
//     if (data) {
//       const parsedData = JSON.parse(data);
//       if (parsedData.Id_Solicitud === Number(solicitud)) {
//         setSolicitudData(parsedData);
//       } else {
//         console.error('El ID de solicitud en localStorage no coincide con el de la URL');
//       }
//     } else {
//       console.error('No se encontraron datos de solicitud en localStorage');
//     }

//     const handleBeforeUnload = () => {
//       localStorage.removeItem('solicitudData');
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       localStorage.removeItem('solicitudData');
//     };
//   }, [solicitud]);

//   const handleAction = async (action) => {
//     try {
//       const id = solicitudData.Id_Solicitud;

//       if (action === 'accept') {
//         await acepptSolicitud(id);
//       } else if (action === 'reject') {
//         await rejectSolicitud(id);
//       }

//       setMessage(`Solicitud ${action === 'accept' ? 'aprobada' : 'rechazada'}`);
//       localStorage.removeItem('solicitudData');
//       setTimeout(() => router.push('/solicitudes'), 2000);
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   const handleBack = () => {
//     localStorage.removeItem('solicitudData');
//     router.push('/solicitudes');
//   };

//   if (!solicitudData) return <p className="text-center text-gray-600">Cargando...</p>;

//   return (
//     <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
//           <button
//             onClick={handleBack}
//             className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
//           >
//             Volver a Solicitudes
//           </button>
//           <h2 className="text-3xl font-extrabold text-black mb-4">Detalles de la Solicitud</h2>
//           <div className="space-y-4">
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>Nombre:</strong> {solicitudData.primer_Nombre} {solicitudData.segundo_Nombre} {solicitudData.primer_Apellido} {solicitudData.segundo_Apellido}
//             </p>
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>Fecha de Solicitud:</strong> {new Date(solicitudData.Fecha_Solicitud).toLocaleDateString()}
//             </p>
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>Estado:</strong> {solicitudData.Estado}
//             </p>
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>Descripción:</strong> {solicitudData.Descripción}
//             </p>
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>Email:</strong> {solicitudData.mail}
//             </p>
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>ID de Especialidad:</strong> {solicitudData.Id_Especialidad}
//             </p>
//             <p className="text-lg font-semibold text-gray-800">
//               <strong>ID de Solicitud:</strong> {solicitudData.Id_Solicitud}
//             </p>
//           </div>
//           <div className="flex space-x-4 mt-6">
//             <button
//               onClick={() => handleAction('accept')}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//             >
//               Aceptar
//             </button>
//             <button
//               onClick={() => handleAction('reject')}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Rechazar
//             </button>
//           </div>
//           {message && <p className="mt-4 text-lg font-semibold text-red-600">{message}</p>}
//         </div>

//         <div className="lg:col-span-1 p-6 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
//           <img
//             src="/img/anon.webp"
//             alt="Imagen de perfil por defecto"
//             className="max-w-full h-auto rounded-full"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { acepptSolicitud, rejectSolicitud } from "../../services/solicitudes";

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

    const handleBeforeUnload = () => {
      localStorage.removeItem('solicitudData');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      localStorage.removeItem('solicitudData');
    };
  }, [solicitud]);

  const handleAction = async (action) => {
    try {
      if (!solicitudData) {
        throw new Error("Datos de la solicitud no disponibles");
      }

      const id = solicitudData.Id_Solicitud; // Usar el ID almacenado en el estado `solicitudData`
      const mail =  solicitudData.email; // email de la solicitud para el correo de rechazo

      if (action === 'accept') {
        await acepptSolicitud(id);
      } else if (action === 'reject') {
        await rejectSolicitud(id, mail);
      }

      setMessage(`Solicitud ${action === 'accept' ? 'aprobada' : 'rechazada'}`);
      localStorage.removeItem('solicitudData');
      setTimeout(() => router.push('/solicitudes'), 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    localStorage.removeItem('solicitudData');
    router.push('/solicitudes');
  };

  if (!solicitudData) return <p className="text-center text-gray-600">Cargando...</p>;

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
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

        <div className="lg:col-span-1 p-6 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
          <img
            src="/img/anon.webp"
            alt="Imagen de perfil por defecto"
            className="max-w-full h-auto rounded-full"
          />
        </div>
      </div>
    </section>
  );
}


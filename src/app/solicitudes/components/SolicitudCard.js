
// // * cards v2

// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// export default function SolicitudCard({ solicitud }) {
//   const router = useRouter();

//   const handleClick = () => {
//     if (solicitud.Id_Solicitud) {
//       // Guarda los datos en localStorage
//       localStorage.setItem('solicitudData', JSON.stringify(solicitud));
//       // Redirige a la ruta dinámica con el ID de la solicitud
//       router.push(`/solicitudes/${solicitud.Id_Solicitud}`);
//     } else {
//       console.error('El ID de la solicitud es indefinido');
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="flex flex-col items-start justify-between w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 cursor-pointer"
//       style={{ outline: 'none', border: 'none' }} // Para eliminar el borde en el hover
//     >
//       <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-800">
//         {solicitud.primer_Nombre} {solicitud.segundo_Nombre} {solicitud.primer_Apellido} {solicitud.segundo_Apellido}
//       </h2>
//       <p className="text-gray-700 mb-2 text-xs sm:text-sm md:text-base">
//         <strong className="font-semibold">Fecha de Solicitud:</strong> {new Date(solicitud.Fecha_Solicitud).toLocaleDateString()}
//       </p>
//       <p className="text-gray-700 mb-2 text-xs sm:text-sm md:text-base">
//         <strong className="font-semibold">Estado:</strong> <span className={`px-2 py-1 rounded ${solicitud.Estado === 'Aprobado' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{solicitud.Estado}</span>
//       </p>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SolicitudCard({ solicitud }) {
  const router = useRouter();

  const handleClick = () => {
    if (solicitud.Id_Solicitud) {
      // Guarda los datos en localStorage
      localStorage.setItem('solicitudData', JSON.stringify(solicitud));
      // Redirige a la ruta dinámica con el ID de la solicitud
      router.push(`/solicitudes/${solicitud.Id_Solicitud}`);
    } else {
      console.error('El ID de la solicitud es indefinido');
    }
  };

  // URL de imagen por defecto
  const defaultImageUrl = "/img/anon.webp";
  const imageUrl = solicitud.ImagenUrl || defaultImageUrl; // Usar la imagen por defecto si solicitud.ImagenUrl es null o undefined

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-start justify-between   p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 cursor-pointer"
    // Para eliminar el borde en el hover
    >
      <Image
        src={imageUrl} 
        alt={`${solicitud.primer_Nombre} ${solicitud.primer_Apellido}`}
        width={300} // Ajusta el tamaño según necesites
        height={200}
        // Ajusta el tamaño según necesites
          className="w-full object-cover rounded-lg mb-4"
          style={{ maxHeight: '250px', maxWidth: '175px', margin: 'auto'}} // Limita la altura máxima de la imagen
      />
      <h2 className="text-sm sm:text-1xl md:text-2xl lg:text-3xl font-bold mb-2 text-gray-800">
        {solicitud.primer_Nombre} {solicitud.segundo_Nombre} {solicitud.primer_Apellido} {solicitud.segundo_Apellido}
      </h2>
      <p className="text-gray-700 mb-2 text-xs sm:text-sm md:text-base">
        <strong className="font-semibold">Fecha de Solicitud:</strong> {new Date(solicitud.Fecha_Solicitud).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-2 text-xs sm:text-sm md:text-base">
        <strong className="font-semibold">Estado:</strong> <span className={`px-2 py-1 rounded ${solicitud.Estado === 'Aprobado' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{solicitud.Estado}</span>
      </p>
    </div>
  );
}

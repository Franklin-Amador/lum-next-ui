// "use client";

// import React, { useEffect, useState } from "react";
// import SolicitudCard from "./components/SolicitudCard";

// export default function Page() {
//   const [solicitudes, setSolicitudes] = useState([]);
//   const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [specialties, setSpecialties] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/solicitudes/instructor")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setSolicitudes(data);
//         setLoadingSolicitudes(false);
//         // Extraer especialidades únicas
//         const uniqueSpecialties = [...new Set(data.map(solicitud => solicitud.Especialidad))];
//         setSpecialties(uniqueSpecialties);
//       })
//       .catch((error) => {
//         setError(error.toString());
//         setLoadingSolicitudes(false);
//       });
//   }, []);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const filteredSolicitudes = solicitudes.filter(solicitud =>
//     selectedSpecialty === "" || solicitud.Especialidad === selectedSpecialty
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSolicitudes = filteredSolicitudes.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);

//   return (
//     <main className="flex flex-col items-center justify-start p-6 min-h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-6 mt-6 text-gray-900">Solicitudes</h1>
      
//       {/* Filtros */}
//       <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
//         <div className="flex items-center space-x-2">
//           <label htmlFor="specialtyFilter" className="text-gray-700">Filtrar por especialidad:</label>
//           <select
//             id="specialtyFilter"
//             value={selectedSpecialty}
//             onChange={(e) => setSelectedSpecialty(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800"
//           >
//             <option value="">Todas</option>
//             {specialties.map((specialty) => (
//               <option key={specialty} value={specialty}>
//                 {specialty}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Elementos por página */}
//         <div className="flex items-center space-x-2">
//           <label htmlFor="itemsPerPage" className="text-gray-700">Elementos por página:</label>
//           <select
//             id="itemsPerPage"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800"
//           >
//             {[5, 10, 20, 50].map((number) => (
//               <option key={number} value={number}>
//                 {number}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Contenido */}
//       {loadingSolicitudes ? (
//         <p>Cargando solicitudes...</p>
//       ) : error ? (
//         <p className="text-red-500">Error: {error}</p>
//       ) : currentSolicitudes.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {currentSolicitudes.map((solicitud) => (
//               <SolicitudCard key={solicitud.Id_Solicitud} solicitud={solicitud} />
//             ))}
//           </div>
//           <div className="flex justify-center items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
//             >
//               Anterior
//             </button>
//             <span className="px-4 py-2 text-gray-700">{`Página ${currentPage} de ${totalPages}`}</span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
//             >
//               Siguiente
//             </button>
//           </div>
//         </>
//       ) : (
//         <p>No se encontraron solicitudes.</p>
//       )}
//     </main>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import SolicitudCard from "./components/SolicitudCard";

export default function Page() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/solicitudes/instructor")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSolicitudes(data);
        setLoadingSolicitudes(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoadingSolicitudes(false);
      });
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Filtrar solicitudes por fecha
  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const solicitudFecha = new Date(solicitud.Fecha_Solicitud).toISOString().split('T')[0];
    return selectedDate === "" || solicitudFecha === selectedDate;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSolicitudes = filteredSolicitudes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);

  return (
    <main className="flex flex-col items-center justify-start p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 mt-6 text-gray-900">Solicitudes</h1>
      
      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="dateFilter" className="text-gray-700">Filtrar por fecha:</label>
          <input
            type="date"
            id="dateFilter"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800"
          />
        </div>

        {/* Elementos por página */}
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-700">Elementos por página:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800"
          >
            {[5, 10, 20, 50].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contenido */}
      {loadingSolicitudes ? (
        <p>Cargando solicitudes...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : currentSolicitudes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentSolicitudes.map((solicitud) => (
              <SolicitudCard key={solicitud.Id_Solicitud} solicitud={solicitud} />
            ))}
          </div>
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-gray-700">{`Página ${currentPage} de ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-700">No se encontraron resultados.</p>
      )}
    </main>
  );
}




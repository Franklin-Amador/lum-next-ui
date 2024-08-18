
// "use client";

// import React, { useEffect, useState } from "react";
// import InstructorCard from "./components/InstructorCard"; // Ruta corregida

// export default function Page() {
//   const [instructors, setInstructors] = useState([]);
//   const [loadingInstructors, setLoadingInstructors] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [selectedScore, setSelectedScore] = useState("");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/instructores")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setInstructors(data);
//         setLoadingInstructors(false);
//       })
//       .catch((error) => {
//         setError(error.toString());
//         setLoadingInstructors(false);
//       });
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1); // Reiniciar a la primera página
//   };

//   const filteredInstructors = instructors.filter((instructor) => {
//     return (
//       instructor.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedSpecialty === "" || instructor.Especialidad === selectedSpecialty) &&
//       (selectedScore === "" || instructor.Promedio_Score === selectedScore || (selectedScore === "None" && instructor.Promedio_Score === "None"))
//     );
//   });

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentInstructors = filteredInstructors.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reiniciar a la primera página
//   };

//   return (
//     <div className="flex flex-col min-h-screen p-6 bg-gray-50">
//       <div className="flex flex-col mb-6">
//         <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Instructores</h1>
//         <input
//           type="text"
//           placeholder="Buscar instructores..."
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label htmlFor="specialtyFilter" className="block text-gray-700 mb-2">Filtrar por especialidad:</label>
//             <select
//               id="specialtyFilter"
//               value={selectedSpecialty}
//               onChange={(e) => setSelectedSpecialty(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Todas</option>
//               <option value="Matemáticas">Matemáticas</option>
//               <option value="Física">Física</option>
//               <option value="Química">Química</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="scoreFilter" className="block text-gray-700 mb-2">Filtrar por promedio:</label>
//             <select
//               id="scoreFilter"
//               value={selectedScore}
//               onChange={(e) => setSelectedScore(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Todos</option>
//               <option value="None">Sin puntuación</option>
//               <option value="5">5</option>
//               <option value="4">4</option>
//               <option value="3">3</option>
//               <option value="2">2</option>
//               <option value="1">1</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="itemsPerPage" className="block text-gray-700 mb-2">Elementos por página:</label>
//             <select
//               id="itemsPerPage"
//               value={itemsPerPage}
//               onChange={handleItemsPerPageChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {[5, 10, 20, 50].map((number) => (
//                 <option key={number} value={number}>
//                   {number}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="flex-grow">
//         {loadingInstructors ? (
//           <p className="text-center text-gray-500">Cargando instructores...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">Error: {error}</p>
//         ) : currentInstructors.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentInstructors.map((instructor) => (
//               <InstructorCard key={instructor.Correo} instructor={instructor} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No se encontraron instructores.</p>
//         )}
//       </div>
//       <div className="flex justify-center items-center mt-6">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//         >
//           Anterior
//         </button>
//         <span className="px-4 py-2 text-gray-700 mx-2">{`Página ${currentPage} de ${totalPages}`}</span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//         >
//           Siguiente
//         </button>
//       </div>
//     </div>
//   );
// }

// ! v2
"use client";

import React, { useEffect, useState } from "react";
import InstructorCard from "./components/InstructorCard"; // Ruta corregida
import Cookies from 'js-cookie';

export default function Page() {
  const [instructors, setInstructors] = useState([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedScore, setSelectedScore] = useState("");

  useEffect(() => {
    const fetchInstructors = async () => {
      const token = Cookies.get('token');  // Obtén el token de las cookies
      try {
        const response = await fetch("http://127.0.0.1:8000/instructores", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),  // Agrega el token a los encabezados si existe
          } 
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoadingInstructors(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const filteredInstructors = instructors.filter((instructor) => {
    return (
      instructor.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedSpecialty === "" || instructor.Especialidad === selectedSpecialty) &&
      (selectedScore === "" || instructor.Promedio_Score === selectedScore || (selectedScore === "None" && instructor.Promedio_Score === "None"))
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstructors = filteredInstructors.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reiniciar a la primera página
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <div className="flex flex-col mb-6">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Instructores</h1>
        <input
          type="text"
          placeholder="Buscar instructores..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="specialtyFilter" className="block text-gray-700 mb-2">Filtrar por especialidad:</label>
            <select
              id="specialtyFilter"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              <option value="Matemáticas">Matemáticas</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
            </select>
          </div>
          <div>
            <label htmlFor="scoreFilter" className="block text-gray-700 mb-2">Filtrar por promedio:</label>
            <select
              id="scoreFilter"
              value={selectedScore}
              onChange={(e) => setSelectedScore(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="None">Sin puntuación</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <div>
            <label htmlFor="itemsPerPage" className="block text-gray-700 mb-2">Elementos por página:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 20, 50].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        {loadingInstructors ? (
          <p className="text-center text-gray-500">Cargando instructores...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : currentInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentInstructors.map((instructor) => (
              <InstructorCard key={instructor.Correo} instructor={instructor} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No se encontraron instructores.</p>
        )}
      </div>
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-gray-700 mx-2">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

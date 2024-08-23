
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import SolicitudCard from "./components/SolicitudCard";
import { useRouter } from 'next/navigation';
import { getSolicitudes } from '../services/solicitudes';
import { HTTPError } from '../utils/HttpsError';
import { EvaluateResponse } from '../utils/requestEvaluator';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function Page() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const router = useRouter();

  const fetchSolicitudes = useCallback(async () => {
    try {
      const data = await getSolicitudes();
      setSolicitudes(data);
    } catch (error) {
      setError(error.toString());
      if (error instanceof HTTPError) {
        const redirectUrl = EvaluateResponse(error.response);
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }
    } finally {
      setLoadingSolicitudes(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const filteredSolicitudes = useMemo(() => {
    return solicitudes.filter(solicitud => {
      const solicitudFecha = new Date(solicitud.Fecha_Solicitud);
      const solicitudMes = solicitudFecha.toISOString().split('T')[0].slice(0, 7);
      return selectedMonth === "" || solicitudMes === selectedMonth;
    });
  }, [solicitudes, selectedMonth]);

  const totalPages = useMemo(() => Math.ceil(filteredSolicitudes.length / itemsPerPage), [filteredSolicitudes.length, itemsPerPage]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(prevPage => {
      if (newPage > 0 && newPage <= totalPages) {
        return newPage;
      }
      return prevPage;
    });
  }, [totalPages]);

  const handleItemsPerPageChange = useCallback((event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  const handleMonthChange = useCallback((event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  }, []);

  const currentSolicitudes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSolicitudes.slice(startIndex, endIndex);
  }, [filteredSolicitudes, currentPage, itemsPerPage]);

  return (
    <main className="flex flex-col items-center justify-start p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 mt-6 text-gray-900">Solicitudes</h1>
      
      <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="monthFilter" className="text-gray-700">Filtrar por mes:</label>
          <input
            type="month"
            id="monthFilter"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-700">Elementos por página:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </div>
      </div>

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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-gray-700">{`Página ${currentPage} de ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
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
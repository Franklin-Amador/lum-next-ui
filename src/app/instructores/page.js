
// pages/instructores.js
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import InstructorCard from "./components/InstructorCard";
import { useRouter } from 'next/navigation';
import { getInstructores, getCategorias, getEspecialidades } from '../services/instructores';
import { EvaluateResponse } from '../utils/requestEvaluator';
import { HTTPError } from '../utils/HttpsError';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function Page() {
    const [instructors, setInstructors] = useState([]);
    const [loadingInstructors, setLoadingInstructors] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [filteredSpecialties, setFilteredSpecialties] = useState([]);
    const router = useRouter();

    const fetchData = useCallback(async () => {
        try {
            const [specialtiesData, categoriesData] = await Promise.all([
                getEspecialidades(),
                getCategorias(),
            ]);
            setSpecialties(specialtiesData);
            setCategories(categoriesData);
            setFilteredSpecialties(specialtiesData);
        } catch (error) {
            setError(error.toString());
            if (error instanceof HTTPError) {
                router.push(EvaluateResponse(error));
            }
        }
    }, [router]);

    const fetchInstructors = useCallback(async () => {
        try {
            const data = await getInstructores();
            setInstructors(data);
        } catch (error) {
            setError(error.toString());
            if (error instanceof HTTPError) {
                router.push(EvaluateResponse(error));
            }
        } finally {
            setLoadingInstructors(false);
        }
    }, [router]);

    useEffect(() => {
        fetchData();
        fetchInstructors();
    }, [fetchData, fetchInstructors]);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredSpecialties(
                specialties.filter(specialty => specialty.Id_Categoria === Number(selectedCategory))
            );
        } else {
            setFilteredSpecialties(specialties);
        }
        setSelectedSpecialty("");
    }, [selectedCategory, specialties]);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const filteredInstructors = useMemo(() => {
        return instructors.filter(instructor => {
            const matchesSearch = instructor.Nombre_Completo.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSpecialty = selectedSpecialty === "" || instructor.Especialidad === selectedSpecialty;
            const isInSelectedCategory = !selectedCategory || filteredSpecialties.some(specialty => specialty.Nombre === instructor.Especialidad);

            return matchesSearch && matchesSpecialty && isInSelectedCategory;
        });
    }, [instructors, searchQuery, selectedSpecialty, selectedCategory, filteredSpecialties]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentInstructors = useMemo(() => filteredInstructors.slice(startIndex, endIndex), [filteredInstructors, startIndex, endIndex]);
    const totalPages = useMemo(() => Math.ceil(filteredInstructors.length / itemsPerPage), [filteredInstructors.length, itemsPerPage]);

    const handlePageChange = useCallback((newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }, [totalPages]);

    const handleItemsPerPageChange = useCallback((event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    }, []);

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
                        <label htmlFor="categoryFilter" className="block text-gray-700 mb-2">Filtrar por categoría:</label>
                        <select
                            id="categoryFilter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todas</option>
                            {categories.map(category => (
                                <option key={category.Id_Categoria} value={category.Id_Categoria}>
                                    {category.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="specialtyFilter" className="block text-gray-700 mb-2">Filtrar por especialidad:</label>
                        <select
                            id="specialtyFilter"
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todas</option>
                            {filteredSpecialties.map(specialty => (
                                <option key={specialty.Nombre} value={specialty.Nombre}>
                                    {specialty.Nombre}
                                </option>
                            ))}
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
                            {ITEMS_PER_PAGE_OPTIONS.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {loadingInstructors ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentInstructors.map(instructor => (
                            <InstructorCard key={instructor.Id_Instructor} instructor={instructor} />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="mx-4 text-gray-700">
                    Página {currentPage} de {totalPages}
                </span>
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

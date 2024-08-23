"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { getCategorias, getEspecialidades } from "@/app/services/instructores";
import { EvaluateResponse } from "@/app/utils/requestEvaluator";
import { HTTPError } from "@/app/utils/HttpsError";
import Image from 'next/image';

export default function FormularioSolicitud({ onSubmit }) {
    const [categories, setCategories] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [filteredSpecialties, setFilteredSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({
        Id_Especialidad: "",
        primer_Nombre: "",
        segundo_Nombre: "",
        primer_Apellido: "",
        segundo_Apellido: "",
        mail: "",
        Descripción: "",
        ImagenUrl: null,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [error, setError] = useState(null);
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

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                    setFormData((prevData) => ({ ...prevData, ImagenUrl: fileUrl }));
                    setImageFile(file);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, Id_Especialidad: selectedSpecialty };

        try {
            await onSubmit(updatedFormData);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Crear Solicitud</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="categoryFilter" className="block text-gray-700 mb-2">Categoría:</label>
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Elegir</option>
                        {categories.map(category => (
                            <option key={category.Id_Categoria} value={category.Id_Categoria}>
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="specialtyFilter" className="block text-gray-700 mb-2">Especialidad:</label>
                    <select
                        id="specialtyFilter"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Elegir</option>
                        {filteredSpecialties.map(specialty => (
                            <option key={specialty.Id_Especialidad} value={specialty.Id_Especialidad}>
                                {specialty.Nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="primer_Nombre" className="block text-gray-700 mb-2">Primer Nombre:</label>
                    <input
                        type="text"
                        id="primer_Nombre"
                        name="primer_Nombre"
                        value={formData.primer_Nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="segundo_Nombre" className="block text-gray-700 mb-2">Segundo Nombre:</label>
                    <input
                        type="text"
                        id="segundo_Nombre"
                        name="segundo_Nombre"
                        value={formData.segundo_Nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="primer_Apellido" className="block text-gray-700 mb-2">Primer Apellido:</label>
                    <input
                        type="text"
                        id="primer_Apellido"
                        name="primer_Apellido"
                        value={formData.primer_Apellido}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="segundo_Apellido" className="block text-gray-700 mb-2">Segundo Apellido:</label>
                    <input
                        type="text"
                        id="segundo_Apellido"
                        name="segundo_Apellido"
                        value={formData.segundo_Apellido}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="mail" className="block text-gray-700 mb-2">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="Descripción" className="block text-gray-700 mb-2">Descripción:</label>
                    <textarea
                        id="Descripción"
                        name="Descripción"
                        value={formData.Descripción}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="imagen" className="block text-gray-700 mb-2">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.ImagenUrl && imageDimensions.width && imageDimensions.height && (
                        <div className="mt-4">
                            <Image
                                src={formData.ImagenUrl}
                                alt="Preview"
                                width={imageDimensions.width}
                                height={imageDimensions.height}
                                className="object-contain"
                            />
                            <p>Dimensiones: {imageDimensions.width} x {imageDimensions.height}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Enviar Solicitud
                </button>
            </form>
        </div>
    );
}

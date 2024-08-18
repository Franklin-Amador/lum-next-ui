"use client";

import React from "react";

export default function InstructorCard({ instructor }) {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg border border-gray-300 shadow-lg p-4 sm:p-6 transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">{instructor.Nombre_Completo}</h2>
            <div className="w-full space-y-2">
                <p className="text-xs sm:text-sm text-gray-700"><span className="font-semibold">Correo:</span> {instructor.Correo}</p>
                <p className="text-xs sm:text-sm text-gray-700"><span className="font-semibold">Especialidad:</span> {instructor.Especialidad}</p>
                <p className="text-xs sm:text-sm text-gray-700"><span className="font-semibold">Cantidad de Cursos:</span> {instructor.Cantidad_Cursos}</p>
                <p className="text-xs sm:text-sm text-gray-700"><span className="font-semibold">Promedio Score:</span> {instructor.Promedio_Score === "None" ? "0" : instructor.Promedio_Score}</p>
                <p className="text-xs sm:text-sm text-gray-700"><span className="font-semibold">Cantidad de Inscripciones:</span> {instructor.Cantidad_Inscripciones}</p>
            </div>
        </div>
    );
}

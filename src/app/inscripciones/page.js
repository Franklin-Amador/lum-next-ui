"use client";

import FormularioSolicitud from "./components/InscripcionForm";
import { useRouter } from "next/navigation";

export default function CrearSolicitudPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la solicitud');
      }

      // Redirigir o mostrar mensaje después del éxito
      router.push('/solicitudes'); // Redirige a la página de solicitudes o cualquier otra página que desees
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <FormularioSolicitud onSubmit={handleSubmit} />
    </div>
  );
}

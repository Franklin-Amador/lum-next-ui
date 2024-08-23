"use client";

import FormularioSolicitud from "./components/InscripcionForm";
import { useRouter } from "next/navigation";
import { createSolicitud } from "../services/solicitudes";


export default function CrearSolicitudPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const response = await createSolicitud(formData);

      // Redirigir o mostrar mensaje después del éxito
      router.push('/solicitudes'); // Redirige a la página de solicitudes o cualquier otra página que desees
    } catch (error) {
      if (error instanceof HTTPError) {
        console.error('Redirigiendo según el error de HTTP:', error.message);
        // Manejar redirección según sea necesario, se puede hacer dentro de `createSolicitud`
      } else {
        console.error('Error al crear la solicitud:', error.message);
        // Mostrar mensaje de error o tomar otra acción
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <FormularioSolicitud onSubmit={handleSubmit} />
    </div>
  );
}

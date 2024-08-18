// components/Modal.js
// import React from 'react';

// const Modal = ({ isOpen, onClose, onAccept, onReject }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
//         <h2 className="text-xl font-bold mb-4">Confirmar Acción</h2>
//         <p className="mb-4">¿Deseas aceptar o rechazar esta solicitud?</p>
//         <div className="flex justify-between">
//           <button
//             onClick={onAccept}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Aceptar
//           </button>
//           <button
//             onClick={onReject}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Rechazar
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// * v2

// components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onAccept, onReject, solicitud }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4 text-black">Detalles de la Solicitud</h2>
        <p className="mb-2 text-black">
          <strong className="font-semibold">Nombre:</strong> {solicitud.primer_Nombre} {solicitud.segundo_Nombre} {solicitud.primer_Apellido} {solicitud.segundo_Apellido}
        </p>
        <p className="mb-2 text-black">
          <strong className="font-semibold">Email:</strong> {solicitud.mail}
        </p>
        <p className="mb-2 text-black">
          <strong className="font-semibold">Fecha de Solicitud:</strong> {new Date(solicitud.Fecha_Solicitud).toLocaleDateString()}
        </p>
        <p className="mb-2 text-black">
          <strong className="font-semibold">Estado:</strong> <span className={`px-2 py-1 rounded ${solicitud.Estado === 'Aprobado' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{solicitud.Estado}</span>
        </p>
        <p className="mb-4 text-black">
          <strong className="font-semibold">Descripción:</strong> {solicitud.Descripción}
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => { onAccept(solicitud.Id_Solicitud); onClose(); }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Aceptar
          </button>
          <button
            onClick={() => { onReject(solicitud.Id_Solicitud); onClose(); }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Rechazar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


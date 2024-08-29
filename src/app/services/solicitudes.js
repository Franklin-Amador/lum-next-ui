// services/solicitudes.js
import Cookies from 'js-cookie';
import settings from './settings';
import { HTTPError } from '../utils/HttpsError';
import { EvaluateResponse } from '../utils/requestEvaluator';

export const getSolicitudes = async () => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/solicitudes/instructor`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const redirectUrl = EvaluateResponse(response);
        if (redirectUrl) {
            window.location.href = redirectUrl; // Redirigir al usuario
        }
        throw new HTTPError(response);
    }

    return await response.json();
}

export const createSolicitud = async (formData) => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/inscripcion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        const redirectUrl = EvaluateResponse(response);
        if (redirectUrl) {
            window.location.href = redirectUrl; // Redirigir al usuario
        }
        throw new HTTPError(response);
    }

    return await response.json();
}

export const acepptSolicitud = async (id) => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/solicitud`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Id_Solicitud: id })
    });

    if (!response.ok) {
        const redirectUrl = EvaluateResponse(response);
        if (redirectUrl) {
            window.location.href = redirectUrl; // Redirigir al usuario
        }
        throw new HTTPError(response);
    }

    return await response.json();
}

export const rejectSolicitud = async (id, mail) => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/solicitud/rechazo`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Id_Solicitud: id , email: mail})
    });

    if (!response.ok) {
        const redirectUrl = EvaluateResponse(response);
        if (redirectUrl) {
            window.location.href = redirect
        }
        throw new HTTPError(response);
    }

    return await response.json();
}


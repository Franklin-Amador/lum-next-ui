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
    const response = await fetch(`${settings.domain}/inscripcion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
    const response = await fetch(`${settings.domain}/solicitudes/${id}/aceptar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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


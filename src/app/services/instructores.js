
// services/instructores.js
import Cookies from 'js-cookie';
import settings from './settings';
import { HTTPError } from '../utils/HttpsError';
import { EvaluateResponse } from '../utils/requestEvaluator';

export const getInstructores = async () => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/instructores`, {
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

export const getCategorias = async () => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/categorias`, {
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

export const getEspecialidades = async () => {
    const token = Cookies.get('token');
    const response = await fetch(`${settings.domain}/especialidades`, {
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

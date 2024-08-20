// utils/EvaluateResponse.js
export function EvaluateResponse(response) {
    switch (response.status) {
        case 403:
            return '/login';
        case 401:
            return '/login';
        case 404:
            return '/404';
        default:
            return '';
    }
}
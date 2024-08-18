// pages/api/login.js
import fetch from 'node-fetch'; // Asegúrate de instalar node-fetch si usas Node.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await fetch('http://127.0.0.1:8000/login/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();
      const { token } = data;
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}

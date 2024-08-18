export default async function handler(req, res) {
    try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/http://127.0.0.1:8000/instructores");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching instructores:", error);
      res.status(500).json({ message: "Error fetching instructores", error: error.message });
    }
  }
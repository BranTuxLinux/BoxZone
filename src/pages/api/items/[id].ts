import { NextApiRequest, NextApiResponse } from "next";

// Este es el handler para tu ruta /api/items/[id]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Accedemos al parámetro "id" desde req.query
  const { id } = req.query; // req.query.id es el parámetro de la ruta

  // Verificamos si "id" está presente
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  // Lógica para manejar la solicitud dependiendo del método HTTP
  switch (req.method) {
    case "GET":
      // Aquí puedes hacer algo con el "id", por ejemplo, buscar un ítem
      return res.status(200).json({ message: `Fetching item with ID: ${id}` });
    // Agregar otros casos para POST, PUT, DELETE si es necesario
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

import prisma from "../../../prisma.js";


export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // Obtener los usuarios de la base de datos
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            });
            res.status(200).json(users); // Devolver los usuarios en formato JSON
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({ error: "Error al obtener los usuarios." });
        }
    } else {
        res.status(405).json({ error: "Método no permitido." }); // Si el método no es GET
    }
}

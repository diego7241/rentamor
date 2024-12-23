import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "user", // Asignamos rol por defecto
                },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error creating user" });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}

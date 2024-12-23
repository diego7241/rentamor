import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: "Contraseña actualizada exitosamente." });
    } catch (error) {
        res.status(400).json({ message: "Token inválido o expirado." });
    }
}

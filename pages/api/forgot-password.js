import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(200).json({ message: "Correo enviado si el email está registrado." });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;

    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Enviar correo
    await transporter.sendMail({
        to: email,
        subject: "Restablecer Contraseña",
        html: `<p>Haz clic en el enlace para restablecer tu contraseña:</p>
               <a href="${resetUrl}" target="_blank">${resetUrl}</a>`,
    });

    res.status(200).json({ message: "Correo enviado." });
}

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Buscar el usuario en la base de datos
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    console.log("Usuario encontrado:", user);

                    // Validar que exista el usuario
                    if (!user) throw new Error("No user found with this email");

                    // Comparar contraseñas
                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    console.log("Contraseña válida:", isValid);

                    if (!isValid) throw new Error("Invalid credentials");

                    // Retornar los datos del usuario
                    return { id: user.id, name: user.name, email: user.email, role: user.role };
                } catch (error) {
                    console.error("Error en authorize:", error.message);
                    throw new Error(error.message || "Authorization failed");
                }
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Redirige al Dashboard principal después de iniciar sesión
            console.log(`Redirecting to: ${baseUrl}/dashboard`);
            return `${baseUrl}/dashboard`;
        },
        async session({ session, token }) {
            // Agregar datos de usuario al objeto de sesión
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            // Almacena datos adicionales en el JWT
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin", // Ruta personalizada para el inicio de sesión
    },
    secret: process.env.NEXTAUTH_SECRET,
});

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserDashboard({ session }) {
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ callbackUrl: "/auth/signin" }); // Intentamos redirigir directamente
        router.push("/auth/signin"); // Redirige manualmente por si falla la primera opción
    };

    return (
        <div className="flex h-screen">
            <nav className="w-64 bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-6">Menú</h2>
                <ul className="space-y-4">
                    <li>
                        <Link href="/explorar" className="text-blue-500 hover:underline">
                            Explorar acompañantes
                        </Link>
                    </li>
                    <li>
                        <Link href="/historial" className="text-blue-500 hover:underline">
                            Historial de reservas
                        </Link>
                    </li>
                </ul>
                <button
                    onClick={handleSignOut}
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Cerrar sesión
                </button>
            </nav>
            <main className="flex-grow p-8">
                <h1 className="text-3xl font-bold">Bienvenido, {session.user.name}!</h1>
                <p className="mt-4">Email: {session.user.email}</p>
                <p>Rol: {session.user.role}</p>
            </main>
        </div>
    );
}

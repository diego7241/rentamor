import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserDashboard from "./dashboard/UserDashboard"; // Importa el componente para usuarios

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            // Si el usuario no está autenticado, redirige a la página de inicio de sesión
            router.push("/auth/signin");
        } else if (status === "authenticated") {
            const role = session.user.role;
            // Redirige al dashboard correspondiente según el rol
            if (role === "admin") {
                router.push("/dashboard/admin");
            } else if (role === "accompanist") {
                router.push("/dashboard/accompanist");
            }
        }
    }, [status, session, router]);

    if (status === "loading") return <p className="text-center mt-5">Cargando...</p>;

    // Renderiza el Dashboard del usuario si el rol es 'user'
    if (session?.user.role === "user") {
        return <UserDashboard session={session} />;
    }

    return null; // Evita mostrar contenido mientras se redirige
}

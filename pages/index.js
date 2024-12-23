import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirige automáticamente al inicio de sesión
        router.push("/auth/signin");
    }, [router]);

    return null; // Opcional, no mostramos nada en esta página
}

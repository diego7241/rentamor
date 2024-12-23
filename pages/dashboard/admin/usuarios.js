import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ManageUsers() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === "authenticated" && session.user.role === "admin") {
            // Llamar al endpoint para obtener los usuarios
            fetch("/api/admin/users")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Error al obtener los usuarios");
                    }
                    return res.json();
                })
                .then((data) => {
                    setUsers(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [status, session]);

    if (status === "loading") return <p className="text-center mt-5">Cargando...</p>;
    if (!session || session.user.role !== "admin") {
        return (
            <div className="text-center mt-5">
                <h1>No autorizado</h1>
                <p>Solo los administradores tienen acceso a esta página.</p>
            </div>
        );
    }

    if (loading) return <p className="text-center mt-5">Cargando usuarios...</p>;
    if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Gestionar Usuarios</h1>
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Nombre</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                        <th className="py-2 px-4 border-b text-left">Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Cargando...</p>;
    if (!session || session.user.role !== "admin")
        return <p>No autorizado. Debes ser administrador para acceder a este panel.</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            {/* Sección de estadísticas */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Estadísticas Generales</h2>
                <div className="grid grid-cols-3 gap-4">
                    <StatCard title="Usuarios Registrados" value="25" />
                    <StatCard title="Acompañantes Activos" value="8" />
                    <StatCard title="Reservas Totales" value="120" />
                </div>
            </section>

            {/* Sección de gestión de usuarios */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
                <UserTable />
            </section>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-2xl font-bold text-pink-600">{value}</p>
        </div>
    );
}

function UserTable() {
    const users = [
        { id: 1, name: "Juan Diego", email: "juan@gmail.com", role: "user" },
        { id: 2, name: "Maria Pérez", email: "maria@gmail.com", role: "accompanist" },
        { id: 3, name: "Admin User", email: "admin@gmail.com", role: "admin" },
    ];

    return (
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left">Nombre</th>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Rol</th>
                    <th className="py-2 px-4 border-b text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.role}</td>
                        <td className="py-2 px-4 border-b text-center">
                            <button className="text-blue-500 hover:underline mr-4">Editar</button>
                            <button className="text-red-500 hover:underline">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

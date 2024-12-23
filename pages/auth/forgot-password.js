import { useState } from "react";
import { useRouter } from "next/router";

export default function ForgotPassword() {
    const [message, setMessage] = useState(""); // Mensaje de éxito o error
    const [isError, setIsError] = useState(false); // Indica si el mensaje es de error
    const [isLoading, setIsLoading] = useState(false); // Indica si está cargando
    const router = useRouter(); // Para redirigir

    return (
        <div
            className="flex min-h-screen"
            style={{
                background: "radial-gradient(circle, #FFD1DC, #FFF6F8)",
            }}
        >
            <div className="w-full flex items-center justify-center p-8">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Recuperar Contraseña
                    </h2>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setMessage(""); // Limpiar el mensaje previo
                            setIsError(false); // Reiniciar el estado de error
                            setIsLoading(true); // Activar el estado de carga

                            const email = e.target.email.value;

                            try {
                                const res = await fetch("/api/forgot-password", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ email }),
                                });

                                if (res.ok) {
                                    setMessage("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
                                } else {
                                    const data = await res.json();
                                    setMessage(data.message || "Ocurrió un error. Inténtalo nuevamente.");
                                    setIsError(true);
                                }
                            } catch (error) {
                                setMessage("Error en la conexión. Inténtalo más tarde.");
                                setIsError(true);
                            } finally {
                                setIsLoading(false); // Finalizar el estado de carga
                            }
                        }}
                    >
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-pink-500 text-white py-2 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl ${isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-pink-600"
                                }`}
                        >
                            {isLoading ? "Enviando..." : "Enviar Enlace"}
                        </button>
                    </form>
                    {message && (
                        <p
                            className={`mt-4 text-center ${isError ? "text-red-500" : "text-green-500"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    {/* Botón para volver al inicio de sesión */}
                    <button
                        onClick={() => router.push("/auth/signin")}
                        className="mt-6 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 shadow-lg"
                    >
                        Volver al inicio de sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

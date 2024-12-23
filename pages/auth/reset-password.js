import { useRouter } from "next/router";

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;

    return (
        <div
            className="flex min-h-screen"
            style={{
                background: "radial-gradient(circle, #FFD1DC, #FFF6F8)",
            }}
        >
            <div className="w-full flex items-center justify-center p-8">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Restablecer Contraseña</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const password = e.target.password.value;

                            fetch("/api/reset-password", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ token, password }),
                            }).then((res) => {
                                if (res.ok) {
                                    alert("Contraseña actualizada correctamente.");
                                    window.location.href = "/auth/signin";
                                } else {
                                    res.json().then((data) => alert(data.message));
                                }
                            });
                        }}
                    >
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Nueva Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200 shadow-lg hover:shadow-xl"
                        >
                            Restablecer Contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

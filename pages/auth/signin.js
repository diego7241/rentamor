import { signIn } from "next-auth/react";

export default function SignIn() {
    return (
        <div
            className="flex flex-col lg:flex-row min-h-screen"
            style={{
                background: "radial-gradient(circle, #FFD1DC, #FFF6F8)",
            }}
        >
            {/* Sección izquierda */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 animate-fade-in">
                <img src="/images/logo.png" alt="Logo RentAmor" className="w-24 h-24 lg:w-32 lg:h-32 mb-6" />
                <h1 className="text-3xl lg:text-5xl font-extrabold text-pink-600 mb-4">RentAmor</h1>
                <p className="text-base lg:text-lg text-pink-800 text-center">
                    Regístrate para disfrutar de experiencias únicas con nuestros acompañantes.
                </p>
            </div>

            {/* Sección derecha */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                <div className="bg-white p-6 lg:p-8 rounded-lg shadow-2xl w-full max-w-sm lg:max-w-md">
                    <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.email.value;
                            const password = e.target.password.value;
                            signIn("credentials", { email, password });
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
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Contraseña
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
                            Ingresar
                        </button>
                    </form>

                    {/* Enlace para recuperar contraseña */}
                    <p className="mt-4 text-center text-gray-600">
                        ¿Olvidaste tu contraseña?{" "}
                        <a href="/auth/forgot-password" className="text-pink-500 hover:underline">
                            Recuperar Contraseña
                        </a>
                    </p>

                    {/* Enlace para registrarse */}
                    <p className="mt-4 text-center text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <a href="/registro" className="text-pink-500 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

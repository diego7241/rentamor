import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // Si tienes estilos globales

export default function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './components/ClientLayout';
import { metadata } from './metadata';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import LoadingWrapper from './components/LoadingWrapper';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>  {/* Envuelve la aplicación con el AuthProvider */}
          <LoadingWrapper> {/* Asegura que el contenido se renderice solo cuando se haya verificado la autenticación */}
            <ClientLayout>
              {children}
            </ClientLayout>
          </LoadingWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

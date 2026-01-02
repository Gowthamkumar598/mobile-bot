import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
    title: 'Mobile Cart | Premium Phone Store',
    description: 'Find your perfect smartphone with our AI assistant.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <CartProvider>
                    <main className="min-h-screen">
                        {children}
                    </main>
                </CartProvider>
            </body>
        </html>
    );
}

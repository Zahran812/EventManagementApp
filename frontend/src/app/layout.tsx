import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Event Management App',
  description: 'Aplikasi manajemen event dengan pemesanan tiket tanpa login',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';

export const metadata: Metadata = {
  title: 'Weather: Weather in any country, city, or region',
  description:
    'Weather in any country, city, or region, with details and forecast',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

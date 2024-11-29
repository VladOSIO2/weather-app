import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';
import WtHeader from '@/components/WtHeader/WtHeader';

export const metadata: Metadata = {
  title: 'Weather App',
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
      <body className="antialiased">
        <StoreProvider>
          <WtHeader />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

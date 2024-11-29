import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';
import WtHeader from '@/components/WtHeader/WtHeader';
import WtFooter from '@/components/WtFooter/WtFooter';

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
      <body className="flex min-h-screen flex-col antialiased">
        <StoreProvider>
          <WtHeader />
          {children}
          <WtFooter />
        </StoreProvider>
      </body>
    </html>
  );
}

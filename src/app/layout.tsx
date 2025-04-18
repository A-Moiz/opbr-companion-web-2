import type { Metadata } from 'next';
import '@/app/globals.css';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'OPBR Companion',
  description: 'Generated by create next app',
  icons: {
    icon: '/icon.png'
    // icon: '/icon.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

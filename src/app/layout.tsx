import type { Metadata } from 'next';
import '@/app/globals.css';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import supabase from '@/database/supabaseClient';
import MaintenancePage from './maintenance/page';

export const metadata: Metadata = {
  title: 'OPBR Companion',
  description: 'Your guide to reaching the top leagues',
  icons: {
    icon: '/icon.png'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data } = await supabase.from('app_settings').select('show_artworks').single();

  const isMaintenanceMode = data?.show_artworks === false;

  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XMWL274FKH"></script>
        <script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XMWL274FKH');
        `}
        </script>
      </head>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{isMaintenanceMode ? <MaintenancePage /> : children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

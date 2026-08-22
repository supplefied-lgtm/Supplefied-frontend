import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/provider';
// import AnnouncementBar from '@/components/layout/AnnouncementBar'; // Hidden per request
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingMascot from '@/components/mascot/FloatingMascot';
import MascotZipperLoader from '@/components/mascot/MascotZipperLoader';
import CartDrawer from '@/components/cart/CartDrawer';
import ToastContainer from '@/components/common/ToastContainer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Supplefied | Bio-Engineered Athletic Supplements & Native Whey',
  description:
    'High-performance sports nutrition engineered with zero compromises. 100% native cold-filtered whey isolate, Creapure® creatine, and clinical high-stim pre-workouts. Directed by Bolt the Cyber-Panther.',
  keywords: 'supplements, whey isolate, pre workout, creapure, bolt cyber panther, performance nutrition, bio hacking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} light`}>
      <body className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-body flex flex-col selection:bg-[#bef264] selection:text-black">
        <ReduxProvider>
          {/* Top announcement strip hidden per request */}
          {/* <AnnouncementBar /> */}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Interactive Global Elements */}
          <MascotZipperLoader />
          <FloatingMascot />
          <CartDrawer />
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}

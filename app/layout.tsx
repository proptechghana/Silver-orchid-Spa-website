import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Silver Orchid | 24/7 Massage & Spa Accra',
  description: 'Premium aesthetic massage and spa in Accra, Ghana. Open 24/7 for your ultimate relaxation.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#F9F9F8] text-[#2C2C2C] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

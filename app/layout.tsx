import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://kylehearn.com'),
  title: 'Kyle Hearn · Hope-Giving Builder',
  description: 'Kyle Hearn is a Tulsa entrepreneur, trusted advisor, and Hope-Giving Builder working at the intersection of people, ideas, and technology.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kyle Hearn · Hope-Giving Builder',
    description: 'A Tulsa entrepreneur and trusted advisor building at the intersection of people, ideas, and technology.',
    url: '/',
    siteName: 'Kyle Hearn',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Kyle Hearn · Hope-Giving Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyle Hearn · Hope-Giving Builder',
    description: 'A Tulsa entrepreneur and trusted advisor building at the intersection of people, ideas, and technology.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}

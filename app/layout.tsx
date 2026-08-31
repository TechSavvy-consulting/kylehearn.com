import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://kylehearn.com'),
  title: 'Kyle Hearn · Hope-Giving Builder',
  description: 'Kyle Hearn is a Tulsa entrepreneur and Hope-Giving Builder serving Jesus, family, community, and people through companies, mentoring, and practical teaching.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kyle Hearn · Hope-Giving Builder',
    description: 'A Tulsa entrepreneur building companies, encouraging people, and serving his community through faith, experience, and practical teaching.',
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
    description: 'A Tulsa entrepreneur building companies, encouraging people, and serving his community through faith, experience, and practical teaching.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kira Media - Professional Video Editor',
  description:
    'Create stunning videos with our professional video editing platform',
  keywords:
    'video editor, video editing, capcut alternative, professional video',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="bg-background min-h-screen">{children}</div>
      </body>
    </html>
  );
}

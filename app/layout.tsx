import { cn } from '@/lib/utils';
import ReduxProvider from '@/providers/redux-provider';
import ScrollProvider from '@/providers/scroll-provider';
import type { Metadata } from 'next';
import { Bai_Jamjuree } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: ['200', '300', '400', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Vista Safari | Home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(baiJamjuree.className, 'bg-white text-black antialiased')}
      >
        <ReduxProvider>
          <ScrollProvider>
            <Toaster position='bottom-left' />
            {children}
          </ScrollProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

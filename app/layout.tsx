import '@/styles/globals.css';

import { Analytics } from '@/components/analytics';
import { Providers } from '@/components/providers';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { RootLayoutProps } from '@/types';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        className={`${fontSans.variable} ${fontDisplay.variable}`}>
        <head />
        <body className="overflow-hidden">
          <Providers>
            {children}
            <Analytics />
          </Providers>
        </body>
      </html>
    </>
  );
}

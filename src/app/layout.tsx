import { NextAppProvider } from '@toolpad/core/nextjs';
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NextAppProvider>{children}</NextAppProvider>
        </SessionProvider>
      </body>
    </html>
  )
}


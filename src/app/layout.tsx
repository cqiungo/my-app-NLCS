'use client';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from '@/context/UserContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import "./globals.css"
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html>
      <body >
              <SessionProvider>
                <UserProvider>
                  <NextAppProvider>{children}</NextAppProvider>
                </UserProvider>
              </SessionProvider>
      </body>
    </html>
)
}


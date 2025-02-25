import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/header'
import AnimatedBackground from '@/components/animated-background'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Safe Hash Preview',
  description: 'Preview Safe transaction hashes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen w-full relative">
              <AnimatedBackground />
              <div className="relative z-10 flex flex-col min-h-screen w-full">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


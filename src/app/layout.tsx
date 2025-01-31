import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legal AI Click',
  description: 'Platform for legal professionals and regular users to access AI-powered tools and resources.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={"ma-0 pa-0 w-100vw h-100vh "} 
    style={{
      // background: "linear-gradient(0deg, #000000, #36373A, #36373A)",
      // backgroundAttachment: "fixed"
      background: "#36373A",
    }}
    >
      <body className={"ma-0 pa-0 tx-altfont-1 flex-col w-100 w-max-100vw noverflow w-100vw h-100vh "}>
        {children}
        </body>
    </html>
  )
}

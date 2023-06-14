import './globals.css'
import { Inter } from 'next/font/google'
import './normal.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OpenAoey',
  description: 'Open ChatGPT cloned by Patcharakit Yangdiaw',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

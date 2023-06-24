import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Footer from '../../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'arts-olympiad',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">

          <ul className="navigation">
            <Link href="/"><li className="logo"></li></Link>
            <button className="secondary-button">Share</button> {/* will be a component*/}
            <Link href="/"><li>Home</li></Link>
            <Link href="/gallery"><li>Gallery</li></Link>
            <Link href="/purpose"><li>Purpose</li></Link>
            <Link href="/about"><li>About</li></Link>
            <Link href="/team"><li>Team</li></Link>
            <button className="main-button">Upload</button>
            <button className="main-button">Vote</button>
            <li className="triple-stack">TODO</li> {/* tripple stack mobile component*/}
          </ul>

        </header>

        {children}

        <footer>
          {/* code here */}
          <Footer/>
        </footer>

      </body>
    </html>
  )
}

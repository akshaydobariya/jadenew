import { Montserrat, Poppins, Ubuntu } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

// export const metadata = {
//   title: 'Jade scroll',
//   description: 'Jadescroll Novels',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} dark:bg-gray-800 dark:text-gray-100`}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}

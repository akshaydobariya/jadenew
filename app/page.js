import Header from '@/pages/Header'
import HomePage from './HomePage'
import Footer from '@/pages/Footer'

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className=''>
        <HomePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

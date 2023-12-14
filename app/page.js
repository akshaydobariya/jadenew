import Header from '@/pages/Header'
import HomePage from './HomePage'
import Footer from '@/pages/Footer'
import BookDetail from './BookDetail'

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className=''>
        {/* <HomePage /> */}
        <BookDetail />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

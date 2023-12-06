import Header from '@/pages/Header'
import HomePage from '../pages/HomePage'

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className=''>
        <HomePage />
      </main>
    </>
  )
}

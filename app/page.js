import HomePage from '@/pages/HomePage'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookDetail from '@/pages/BookDetail'
import NovelList from '@/pages/NovelList'
import Package from '@/pages/Package'

function page() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {/* <NovelList /> */}
        {/* <BookDetail /> */}
        <HomePage />
        {/* <Package /> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default page
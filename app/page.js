import React from 'react'
import Home from './Home/page'

export const metadata = {
  title: 'Jade scroll Novel Managment web',
  openGraph: {
    title: 'Jade scroll Novel Managment web',
    description: 'Jadescroll Novels description',
  }
}

function page() {
  return (
    <>
      <Home />
    </>
  )
}

export default page
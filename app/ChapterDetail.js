import Footer from '@/pages/Footer'
import Header from '@/pages/Header'
import Image from 'next/image'
import React from 'react'
import coverImage from '../public/assets/Images/chapterCoverImage.jpg'

function ChapterDetail() {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>
                <div>
                    <div>
                        <Image src={coverImage} />
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default ChapterDetail
'use client'
import React from 'react'
import detailImage from '../public/assets/Images/book-detail.jpeg'
import Image from 'next/image'

function BookDetail() {
    return (
        <div>
            <div className='flex'>
                <div>
                    <Image src={detailImage} />
                </div>
                <div>
                    <div>Novel</div>
                    <div>Immortal Martial God</div>
                    <div className='flex'>
                        <div>Fantasy</div>
                        <div>Chapter</div>
                        <div>Completed</div>
                        <div>844.1k Views</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail
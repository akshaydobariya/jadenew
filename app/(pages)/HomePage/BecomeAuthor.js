'use client'
import Image from 'next/image'
import React from 'react'
import becomeAuthorImg from '../../../public/assets/Images/BecomeAuthorCoverImg.jpg'

function BecomeAuthor() {
    return (
        <div>
            <section>
                <div className='relative mt-8'>
                    <div className='md:h-44 h-56 authorGradient'>
                        <Image height={500} width={500} className='h-full w-full object-cover opacity-90' src={becomeAuthorImg} alt='become a author' />
                    </div>
                    <div className='text-white absolute top-10'>
                        <div className='flex flex-col items-center font-semibold'>
                            <div className='text-[16px] text-center md:px-20 px-2 hidden md:block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>
                            <div className='text-[16px] text-center md:px-20 px-2 block md:hidden'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                            <div className='flex justify-end'>
                                <button onClick={() => window.open('https://zscroll-admin.servepratham.com/sign-up')} className='border-2 mt-4 px-10 py-2 text-white slideBtn sliderRight'>Become a Author</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BecomeAuthor
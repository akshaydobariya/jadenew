import React from 'react'
import banner from '../../../public/assets/Images/Banner/banner-seven.jpg'
import Image from 'next/image'

function page() {
    return (
        <div>
            <div className='pt-16'>
                <Image src={banner} className='w-full' />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-14 px-2 md:px-8 lg:px-40 pt-12 pb-10 font-semibold bg-gray-100'>
                <div className='border px-5 py-10 rounded-xl text-center bg-sky-500 text-white shadow-[0_0_10px_2px_#7bc1eb]'>A CHANCE FOR CREATER</div>
                <div className='border px-5 py-10 rounded-xl text-center bg-sky-500 text-white shadow-[0_0_10px_2px_#7bc1eb]'>EARNING MONEY OPPORTUNITY</div>
                <div className='border px-5 py-10 rounded-xl text-center bg-sky-500 text-white shadow-[0_0_10px_2px_#7bc1eb]'>PUBLISHING OPPORTUNITIES</div>
                <div className='border px-5 py-10 rounded-xl text-center bg-sky-500 text-white shadow-[0_0_10px_2px_#7bc1eb]'>PUBLIST ON JadeScroll</div>
            </div>

            <div className='bg-[#121212] py-3 md:py-5 lg:py-10 text-white'>
                <div className='text-center text-3xl md:text-4xl pb-7 px-16 md:px-44 lg:px-[510px]'>Become a Author in 6 Easy Step</div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-14'>
                    <div className='flex flex-col justify-between border rounded-md py-3 px-4 bg-[#242424]'>
                        <div className='text-[#CFF56A]'>Step 1</div>
                        <div>
                            <div>Create a WEBTOON account and visit our "Publish" page.</div>
                            <div className='pt-3 pb-2 text-[#CFF56A]'>Login or Signup</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between border py-3 px-4 bg-[#242424]'>
                        <div className='text-[#FFD2D7]'>Step 2</div>
                        <div>
                            <div>Pick up to two genres that match your series well.</div>
                            <div className='pt-3 pb-2 text-[#FFD2D7]'>Select a Genre</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between border py-3 px-4 bg-[#242424]'>
                        <div className='text-[#C4B1D4]'>Step 3</div>
                        <div>
                            <div>Unique and memorable titles work best. Think of something snappy that captures the essence of your story.</div>
                            <div className='pt-3 pb-2 text-[#C4B1D4]'>Name your series</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between border py-3 px-4 bg-[#242424]'>
                        <div className='text-[#CFF56A]'>Step 4</div>
                        <div>
                            <div>Select a thumbnail that shows off your main characters and art style.</div>
                            <div className='pt-3 pb-2 text-[#CFF56A]'>Upload your series thumbnail</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between border py-3 px-4 bg-[#242424]'>
                        <div className='text-[#FFD2D7]'>Step 5</div>
                        <div>
                            <div>Give a brief introduction to your world. Tell us about your main characters. What drives them? What are their characteristics?</div>
                            <div className='pt-3 pb-2 text-[#CFF56A]'>Write a series description</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between border py-3 px-4 bg-[#242424]'>
                        <div className='text-[#C4B1D4]'>Step 6</div>
                        <div>
                            <div>Let the world see what you've created! Establish the main conflict within your first three episodes to keep readers interested. Really hook your readers in!</div>
                            <div className='pt-3 pb-2 text-[#CFF56A]'>Publish your first episode</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

// onClick={() => window.open('https://zscroll-admin.servepratham.com/sign-up')}
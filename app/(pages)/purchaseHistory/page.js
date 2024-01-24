'use client'
import Image from 'next/image'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import { useRouter } from 'next/navigation';

function purchaseHistory() {
    const router = useRouter()

    return (
        <div className='pt-16'>
            <div className='bg-gray-200 dark:bg-gray-500 lg:px-52 px-8 pb-2'>
                <div className='text-center text-gray-800 pt-7 pb-3'>
                    <div className='text-2xl dark:text-gray-200'>Purchase History</div>
                </div>
                {[...Array(7)]?.map((_, i) => {
                    return (
                        <div className='flex border-gray-400 rounded-md text-white shadow-md my-2 border bg-white'
                            onClick={() => router.push('/detail/123')}>
                            <div>
                                <Image src={popularComicTwo} alt='' className='h-16 w-16 object-cover rounded-l-md' />
                            </div>
                            <div className='pl-3 flex items-center justify-between w-full pr-2'>
                                <div>
                                    <div className='text-lg text-gray-900 dark:text-gray-800'>Absolute Resonance</div>
                                    <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-800'>
                                        <div>9 Chapter</div>
                                        <div>50 Advance</div>
                                    </div>
                                </div>
                                {/* <div>
                                    <button className='text-sm py-[6px] border bg-blue-600 px-9 rounded-full'>BUY</button>
                                </div> */}
                            </div>
                        </div>
                    )
                })}
                <div className='flex justify-between textThemeColor'>
                    <button className='flex items-center'>
                        <KeyboardBackspaceIcon fontSize='small' />
                        <div className='pl-1'>Preview</div>
                    </button>
                    <button className='flex items-center'>
                        <div className='font-semibold pr-1'>Next</div>
                        <EastIcon fontSize='small' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default purchaseHistory
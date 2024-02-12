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
            <div className='bg-gray-200 dark:bg-[#131415] lg:px-52 px-2 md:px-8 pb-2'>
                <div className='text-center text-gray-800 pt-7 pb-3'>
                    <div className='text-2xl dark:text-gray-200'>Purchase History</div>
                </div>
                {[...Array(7)]?.map((_, i) => {
                    return (
                        <div className='flex border-gray-400 rounded-md text-white shadow-md my-2 border bg-white dark:bg-gray-950'
                            onClick={() => router.push('/detail/123')}>
                            <div>
                                <Image src={popularComicTwo} alt='' className='h-[9rem] w-40 object-cover rounded-l-md' />
                            </div>
                            <div className='pl-3 flex justify-between w-full pr-2'>
                                <div>
                                    <div className='text-lg text-gray-900 dark:text-gray-200'>Absolute Resonance</div>
                                    <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-200'>
                                        <div>9 Chapter</div>
                                        <div>50 Advance</div>
                                    </div>
                                    <div className='text-gray-600 dark:text-gray-200 text-sm'>
                                        <div className='py-1'>Free Chapter +32 Advance</div>
                                        <div>id : 94983EDB2</div>
                                        <div className='py-1'>ongoing</div>
                                    </div>
                                </div>
                                <div className='text-gray-600 dark:text-gray-200 pt-1 text-sm md:text-base flex flex-col justify-end md:justify-start pb-3'>
                                    <div>premium</div>
                                    <div>$50 month</div>
                                </div>
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
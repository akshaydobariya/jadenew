import Image from 'next/image'
import React from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import CloseIcon from '@mui/icons-material/Close';

function page() {
    return (
        <div className='pt-20 pb-10 px-32'>
            <div className='text-2xl font-semibold text-gray-800 pb-3 text-center'>Bookmark</div>
            <div className='grid grid-cols-2 gap-3'>
                {[...Array(10)].map((_, i) => {
                    return (
                        <div className='border flex bg-gray-100 rounded-md'>
                            <div className='h-20 w-32'>
                                <Image src={popularComicTwo} alt='card' className='h-full w-full object-cover rounded-xl p-1' />
                            </div>
                            <div className='flex justify-between w-full'>
                                <div className='pl-2 pt-1'>
                                    <div>First Immortal of the Sword</div>
                                    <div className='text-sm'>Wuxi&Xiang</div>
                                </div>
                                <div className='pr-2 pt-1 text-gray-700'>
                                    <CloseIcon />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default page
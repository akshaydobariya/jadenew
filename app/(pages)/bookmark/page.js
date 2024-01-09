import Image from 'next/image'
import React from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import CloseIcon from '@mui/icons-material/Close';
import HttpsIcon from '@mui/icons-material/Https';
import NotificationsIcon from '@mui/icons-material/Notifications';

function page() {
    return (
        <div className='pt-20 pb-10 lg:px-32 px-4'>
            <div className='text-2xl font-semibold text-gray-800 pb-3 text-center'>Bookmark</div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {[...Array(10)].map((_, i) => {
                    return (
                        <div key={i} className='border flex bg-gray-100 rounded-md'>
                            <div className='h-16 w-24'>
                                <Image src={popularComicTwo} alt='card' className='h-full w-full object-cover rounded-xl p-1' />
                            </div>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col justify-between pl-2 pt-1'>
                                    <div>
                                        <div>First Immortal of the Sword</div>
                                        <div className='text-sm'>Wuxi&Xiang</div>
                                    </div>
                                    {/* <div className='flex text-xs mb-1'>
                                        <div className='border px-2 py-1 rounded mr-2 flex' style={{boxShadow:"#e9e9e9 0px 1px 1px 1px"}}>
                                            <HttpsIcon className='text-sm' />
                                            <button className='ml-1'>Lock Bookmark</button>
                                        </div>
                                        <div className='border px-2 py-1 rounded flex' style={{boxShadow:"#e9e9e9 0px 1px 1px 1px"}}>
                                            <NotificationsIcon className='text-sm' />
                                            <button className='pl-1'>Turn off</button>
                                        </div>
                                    </div> */}
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
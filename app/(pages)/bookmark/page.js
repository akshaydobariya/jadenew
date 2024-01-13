'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import CloseIcon from '@mui/icons-material/Close';
import HttpsIcon from '@mui/icons-material/Https';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useApiService from '@/services/ApiService';

function page() {
    const { getBookmarkNovel } = useApiService()
    const [bookmarkNovel, setBookmarkNovel] = useState([])

    useEffect(() => {
        getBookmarkNovel().then((res) => {
            console.log(res?.data?.data, "get bookmark");
            setBookmarkNovel(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error Get Bookmark Novel");
        })
    }, [])

    return (
        <div className='pt-20 pb-10 lg:px-32 px-4'>
            <div className='text-2xl font-semibold text-gray-800 pb-4 text-center'>Bookmark</div>
            {bookmarkNovel.length == 0 ?
                <div className='h-80 flex justify-center items-center text-xl'>You have not Bookmark any novel yet !</div> :
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {bookmarkNovel?.map((item, i) => {
                        return (
                            <div key={i} className='border flex bg-gray-100 rounded-md mb-44'>
                                <div className='h-16 w-24'>
                                    <Image src={item?.coverImg} height={100} width={100} alt='card' className='h-full w-full object-cover rounded-xl p-1' />
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div className='flex flex-col justify-between pl-2 pt-1'>
                                        <div>
                                            <div>{item?.title}</div>
                                            <div className='text-sm'>{item?.genre}</div>
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
            }
        </div>
    )
}

export default page
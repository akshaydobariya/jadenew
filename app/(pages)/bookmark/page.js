'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import CloseIcon from '@mui/icons-material/Close';
import HttpsIcon from '@mui/icons-material/Https';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useApiService from '@/services/ApiService';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PaginationControlled from '@/components/pagination';

function page() {
    const { getBookmarkNovel, bookmarkNovel } = useApiService()
    const [bookmarkNovelData, setBookmarkNovelData] = useState([])

    useEffect(() => {
        getBookmarkNovel().then((res) => {
            setBookmarkNovelData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error Get Bookmark Novel");
        })
    }, [])

    const novelBookmark = (id) => {
        if (localStorage.getItem('token')) {
            bookmarkNovel(id).then((res) => {
                toast.success(res?.data?.data)
            }).catch((er) => {
                console.log(er);
            })
        } else {
            router.push('/login')
        }
    }

    return (
        <div className='pt-24 pb-10 lg:px-32 px-4 bg-gray-200'>
            <ToastContainer />
            <div className='text-2xl font-semibold dark:text-gray-100 text-gray-800 pb-8 text-center'>Bookmark</div>
            {bookmarkNovelData.length == 0 ?
                <div className='h-80 flex justify-center items-center text-xl'>You have not Bookmark any novel yet !</div> :
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {bookmarkNovelData?.map((item, i) => {
                        return (
                            <div key={i} className='border-pink-400 border-2 shadow-lg cursor-pointer dark:border-gray-700 flex bg-gray-100 dark:bg-gray-900 rounded-md mb-44'>
                                <div className='h-24 w-32'>
                                    <Image src={item?.coverImg} height={300} width={300} alt='card' className='h-full w-full object-cover rounded-xl p-1' />
                                </div>
                                <div className='flex justify-between w-full'>
                                    <Link href={{ pathname: `/detail/${item?._id}` }} className='flex flex-col justify-between pl-2 pt-1'>
                                        <div>
                                            <div className='font-semibold'>{item?.title}</div>
                                            <div className='text-sm'>{item?.genre}</div>
                                            <div className='text-sm text-gray-500'>{item?.description?.slice(0, 90)}..</div>
                                        </div>
                                        {/* <div className='flex text-xs mb-1'>
                                            <div className='border px-2 py-1 rounded mr-2 flex' style={{ boxShadow: "#e9e9e9 0px 1px 1px 1px" }}>
                                                <HttpsIcon className='text-sm' />
                                                <button className='ml-1'>Lock Bookmark</button>
                                            </div>
                                            <div className='border px-2 py-1 rounded flex' style={{ boxShadow: "#e9e9e9 0px 1px 1px 1px" }}>
                                                <NotificationsIcon className='text-sm' />
                                                <button className='pl-1'>Turn off</button>
                                            </div>
                                        </div> */}
                                    </Link>
                                    <div onClick={() => novelBookmark(item?._id)} className='pr-2 pt-1 text-gray-700'>
                                        <CloseIcon />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            {/* {bookmarkNovelData.length > 0 && (
                <div>
                    <PaginationControlled
                        setPage={setPage}
                        last_page={shortList?.last_page}
                        page={page}
                    />
                </div>
            )} */}
        </div>
    )
}

export default page
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
    const [page, setPage] = useState(1)
    const [shortList, setShortList] = useState()

    const getBookmark = () => {
        getBookmarkNovel().then((res) => {
            setBookmarkNovelData(res?.data?.data)
            setShortList(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error Get Bookmark Novel");
        })
    }

    useEffect(() => {
        getBookmark()
    }, [page])

    const novelBookmark = (id) => {
        if (localStorage.getItem('token')) {
            bookmarkNovel(id).then((res) => {
                toast.success(res?.data?.data)
                setShortList(res?.data?.data)
                getBookmark()
            }).catch((er) => {
                console.log(er);
            })
        } else {
            router.push('/login')
        }
    }

    return (
        <div className='pt-10 pb-10 lg:px-10 px-4 bg-gray-200 dark:bg-gray-900 border rounded-xl dark:shadow-md shadow-[0px_0px_4px_2px_#e5e5e5] mx-2 md:mx-10 mb-3 mt-20 md:mb-10 md:mt-28'>
            <ToastContainer />
            {/* <div className='text-2xl font-semibold dark:text-gray-100 text-gray-800 pb-8 text-center'>Bookmark</div> */}
            {bookmarkNovelData.length == 0 ?
                <div className='h-80 flex justify-center items-center text-xl'>You have not Bookmark any novel yet !</div> :
                <div className='grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-3'>
                    {bookmarkNovelData?.map((item, i) => {
                        return (
                            <div key={i} className='relative flex flex-col border-pink-400 border-2 shadow-lg cursor-pointer dark:border-gray-700 bg-gray-100 dark:bg-gray-900 rounded-md'>
                                <div className='h-44 w-[10rem] md:h-52 md:w-[16.1rem]'>
                                    <Image src={item?.coverImg} height={300} width={300} alt='card' className='h-full w-full object-cover rounded-lg p-1' />
                                </div>
                                <div onClick={() => novelBookmark(item?._id)} className='pr-2 pt-1 text-gray-700'>
                                    <CloseIcon className='absolute top-1 right-2 text-white' />
                                </div>
                                <div className='flex justify-between w-full pb-2'>
                                    <Link href={{ pathname: `/detail/${item?._id}` }} className='flex flex-col justify-between pl-2 pt-1'>
                                        <div>
                                            <div className='font-semibold'>{item?.title?.slice(0, 25)}..</div>
                                            <div className='text-sm pb-2 pt-1'>{item?.genre}</div>
                                            <div className='text-sm text-gray-500 hidden md:block'>{item?.description?.slice(0, 85)}..</div>
                                            <div className='text-sm text-gray-500 block md:hidden'>{item?.description?.slice(0, 30)}..</div>
                                        </div>
                                        <div className='flex text-xs mb-1 justify-end pr-2 pt-1'>
                                            {/* <div className='border px-2 py-1 rounded mr-2 flex' style={{ boxShadow: "#e9e9e9 0px 1px 1px 1px" }}>
                                                <HttpsIcon className='text-sm' />
                                                <button className='ml-1'>Lock Bookmark</button>
                                            </div> */}
                                            <div className='border px-2 py-1 rounded flex' style={{ boxShadow: "#e9e9e9 0px 1px 1px 1px" }}>
                                                <NotificationsIcon className='text-sm' />
                                                <button className='pl-1'>Turn off</button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            {bookmarkNovelData.length > 0 && (
                <div className='flex justify-center pt-20'>
                    <PaginationControlled
                        setPage={setPage}
                        last_page={shortList?.last_page}
                        page={page}
                    />
                </div>
            )}
        </div>
    )
}

export default page
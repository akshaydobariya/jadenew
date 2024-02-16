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
            console.log(res?.data?.data);
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
        <div className='pt-10 pb-10 lg:px-10 px-4 bg-[#F2F2F2] dark:bg-[#131415] border rounded-xl dark:shadow-md shadow-[0px_0px_7px_3px_#cdc7c761] mx-2 md:mx-10 mb-3 mt-20 md:mb-10 md:mt-28'>
            <ToastContainer autoClose={2000} />
            {bookmarkNovelData.length == 0 ?
                <div className='h-80 flex justify-center items-center text-xl'>You have not Bookmark any novel yet !</div> :
                <div>
                    <div className='border-b border-b-gray-400 mb-4'>
                        <div className='text-lg border-b-blue-600 border-b-2 w-max'>Bookmark Novels</div>
                    </div>
                    <div className='flex justify-end pb-2'>
                        <select className='p-2 border border-black dark:bg-gray-800 bg-gray-200 focus:outline-none rounded-md'>
                            <option>Novel Name</option>
                            <option>Latest Release</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-8 gap-2'>
                        {bookmarkNovelData?.map((item, i) => {
                            return (
                                <div key={i} className='relative flex border-[#20A7FE] border-2 shadow-lg cursor-pointer dark:border-gray-700 bg-gray-100 dark:bg-[#202020] rounded-md'>
                                    {/* <div className='h-44 w-[10.8rem] md:h-52 md:w-[12rem] lg:h-44 lg:w-[16.1rem]'> */}
                                    <div className='h-44 w-[10.8rem] md:h-52 md:w-[12rem] lg:h-44 lg:w-[16.1rem]'>
                                        <Image src={item?.novelId?.coverImg} height={300} width={300} alt='card' className='h-full w-full object-cover rounded-lg p-1' />
                                    </div>
                                    <div onClick={() => novelBookmark(item?.novelId?._id)} className='pr-2 pt-1 text-gray-700'>
                                        <CloseIcon className='absolute top-1 right-2 text-black dark:text-white' />
                                    </div>
                                    <div className='flex justify-between w-full pb-2'>
                                        <Link href={{ pathname: `/detail/${item?.novelId?._id}` }} className='flex flex-col justify-between md:pl-2 pt-1'>
                                            <div>
                                                <div className='font-semibold hidden md:block'>{item?.novelId?.title?.slice(0, 25)}..</div>
                                                <div className='font-semibold block md:hidden'>{item?.novelId?.title?.slice(0, 20)}..</div>
                                                <div className='text-sm pb-2 pt-1 hidden md:block'>{item?.novelId?.genre}</div>
                                                <div className='text-sm text-gray-500 dark:text-gray-400'>{item?.novelId?.description?.slice(0, 82)}..</div>
                                            </div>
                                            <div className='flex text-xs mb-1 flex-col justify-between pr-2 pt-1 gap-y-2'>
                                                <div className='text-sm text-blue-500 py-1 px-5 border-2 w-max'>Progress - {item?.novelId?.totalCompletedChapters}/{item?.novelId?.chapter.length}</div>
                                                <div className='border px-2 py-1 rounded flex items-center shadow-lg w-max'>
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
'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import banner1 from '../../../public/assets/Images/Banner/banner-one.jpg'
import banner2 from '../../../public/assets/Images/Banner/banner-two.jpg'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import useApiService from '@/services/ApiService';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function FeaturedBook(props) {
    const popularMobile = [
        {
            image: banner1,
            name: "Dragon Prince Yuan",
            section: "Fantasy"
        },
        {
            image: banner2,
            name: "Immortal Martial God",
            section: "Fantasy"
        },
    ]

    const { bookmarkNovel } = useApiService()
    const router = useRouter()
    const [saveBookmark, setSaveBookmark] = useState('bookmark')
    const [centerNovelData, setCenterNovelData] = useState()

    useEffect(() => {
        setCenterNovelData(props?.popularData?.data[0])
    }, [])

    const novelBookmark = (id) => {
        if (localStorage.getItem('token')) {
            bookmarkNovel(id).then((res) => {
                setSaveBookmark('RemoveBookmark')
                toast.success(res?.data?.data)
            }).catch((er) => {
                console.log(er);
            })
        } else {
            router.push('/login')
        }
    }

    return (
        <div className='md:mt-16 mt-10 dark:bg-gray-900 bg-gray-800 py-10 md:px-8 px-2'>
            <ToastContainer />
            <div className='pb-5 flex items-center justify-between text-white'>
                <div className='text-2xl font-semibold rankingHeading'>Featured Product</div>
                <div className='underline'>See More</div>
            </div>

            <div className='flex  md:flex-row'>
                <div className='hidden md:w-[35%] md:grid md:grid-cols-2 grid-cols-3 gap-4'>
                    {props?.popularData?.data?.slice(0, 4)?.map((item, index) => {
                        return (
                            <div key={index} onClick={() => setCenterNovelData(item)} className='dark:bg-gray-800'>
                                <div key={index} className='cardPopular cursor-pointer border-gray-500 rounded-md pb-2' style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                                    <div className='md:h-36 md:w-32 xl:w-56 h-28 w-32  overflow-hidden'>
                                        <Image height={300} width={300} src={item?.coverImg} alt='' className='h-full w-full object-cover popularImageParent' />
                                    </div>
                                    <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                        <div className='text-sm font-semibold'>{item?.title.length > 25 ? item?.title?.slice(0, 25) : item?.title}</div>
                                        <div className='text-[13px] py-1'>{item?.genre}</div>
                                        <div className='flex items-center justify-between'>
                                            <Rating size='small' name="read-only" value="3.5" readOnly />
                                            {/* {saveBookmark == 'bookmark' ? <BookmarkAddOutlinedIcon onClick={() => novelBookmark(centerNovelData?._id)} titleAccess='save bookmark' className='text-white cursor-pointer text-2xl' /> :
                                                <BookmarkAddedOutlinedIcon onClick={() => setSaveBookmark('bookmark')} titleAccess='Remove bookmark' fontSize='large' className='text-white cursor-pointer text-2xl' />} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='block md:hidden w-[30%] grid md:grid-cols-2 grid-cols-1 gap-2'>
                    {popularMobile?.map((item, index) => {
                        return (
                            <div key={index} className=''>
                                <div className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-32 xl:w-56 h-20 w-32  overflow-hidden'>
                                        <Image src={item.image} alt='' className='h-full w-full object-cover popularImageParent' />
                                    </div>
                                    <div className='text-white text-start pt-1 md:pb-0 px-1'>
                                        <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 10)}</div>
                                        <div className='text-[13px] py-1'>{item?.section}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className=' border-gray-600 dark:bg-gray-800 rounded-md w-[45%] md:w-[30%] flex flex-col justify-between items-center md:px-8 md:mx-6 mx-3 mb-5 md:my-0 pt-3'
                    style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                    <div>
                        <div className='md:w-full md:h-48 w-36 h-32 md:px-3 object-cover md:pr-3 px-3'>
                            <Image src={centerNovelData?.coverImg} height={300} width={300} alt='' className='h-full w-full rounded-l-md md:rounded-none object-contain' />
                        </div>

                        <div className='text-white text-start md:pt-4 pl-2 pb-2'>
                            <div className='md:text-xl text-sm font-semibold'>{centerNovelData?.title}</div>
                            <div className='text-gray-400 md:text-sm text-sm font-normal py-1'>{centerNovelData?.genre}</div>
                            <Rating size='small' name="read-only" value="5" readOnly />
                            <div className='text-gray-400 py-1 hidden md:block text-sm'>{centerNovelData?.description.length > 90 ? centerNovelData?.description?.slice(0, 90) : centerNovelData?.description}</div>
                            <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full px-2 pb-3 mb-2'>
                        <button className='border lg:px-9 px-2 text-white py-1 text-xs' onClick={() => router.push(`/detail/${centerNovelData?._id}`)}>Read Now</button>
                        {saveBookmark == 'bookmark' ? <BookmarkAddOutlinedIcon onClick={() => novelBookmark(centerNovelData?._id)} titleAccess='save bookmark' className='text-white cursor-pointer text-2xl' /> :
                            <BookmarkAddedOutlinedIcon onClick={() => setSaveBookmark('bookmark')} titleAccess='Remove bookmark' fontSize='large' className='text-white cursor-pointer text-2xl' />}
                    </div>
                </div>

                <div className='hidden md:pr-0 md:w-[35%] md:grid md:grid-cols-2 grid-cols-3 gap-4'>
                    {props?.popularData?.data?.slice(5, 9)?.map((item, index) => {
                        return (
                            <div key={index} onClick={() => setCenterNovelData(item)} className='dark:bg-gray-800'>
                                <div className='cardPopular cursor-pointer border-gray-500  rounded-md pb-2' style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                                    <div className='md:h-36 md:w-56 h-28 w-32 overflow-hidden'>
                                        <Image height={300} width={300} src={item?.coverImg} alt='' className='h-full w-full popularImageParent object-cover' />
                                    </div>
                                    <div className='text-white text-start pt-1 px-1'>
                                        <div className='text-sm font-semibold'>{item?.title.length > 25 ? item?.title?.slice(0, 25) : item?.title}</div>
                                        <div className='text-sm py-1'>{item?.genre}</div>
                                        <div className='flex items-center justify-between'>
                                            <Rating size='small' name="read-only" value="2.5" readOnly />
                                            {/* {saveBookmark == 'bookmark' ? <BookmarkAddOutlinedIcon onClick={() => novelBookmark(centerNovelData?._id)} titleAccess='save bookmark' className='text-white cursor-pointer text-2xl' /> :
                                                <BookmarkAddedOutlinedIcon onClick={() => setSaveBookmark('bookmark')} titleAccess='Remove bookmark' fontSize='large' className='text-white cursor-pointer text-2xl' />} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='block md:hidden md:pr-0 w-[30%] grid md:grid-cols-2 grid-cols-1'>
                    {popularMobile?.map((item, index) => {
                        return (
                            <div key={index} className=''>
                                <div className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-56 h-20 w-32 overflow-hidden'>
                                        <Image src={item.image} alt='' className='h-full w-full popularImageParent object-cover' />
                                    </div>
                                    <div className='text-white text-start pt-1 px-1'>
                                        <div className='text-sm font-semibold'>{item?.name.slice(0, 10)}</div>
                                        <div className='text-sm py-1'>{item?.section}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FeaturedBook
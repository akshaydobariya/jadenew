'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link'
import ButtonBook from './ButtonBook'
import PaginationControlled from '@/components/pagination';
import comingSoon from '../../../public/assets/icon/comingSoon.png'

function Home(props) {
    const [page, setPage] = useState(1)
    return (
        <div className='pt-20 m-2 px-3 md:px-5 xl:px-52'>
            <div className='flex justify-center items-center py-48'>
                <Image src={comingSoon} height={200} width={200} />
            </div>
            {/* <div className='text-3xl pb-3 text-center'>Books</div> */}
            {/* <div className='grid md:grid-cols-3 grid-cols-2 md:gap-5 lg:gap-10 gap-2'>
                {props?.resourceData?.data?.map((item, index) => {
                    return (
                        <div key={index} className='bg-gray-100 dark:bg-[#131415] rounded-lg p-2 border-2 border-blue-600 shadow-[0_0_8px_1px_#464646]'>
                            <div className='h-36 md:h-56 w-full object-contain'>
                                <Link href={{ pathname: `detail/${item?._id}` }}>
                                    <Image src={item?.coverImg} alt='' height={300} width={300} className='h-full w-full rounded-t-lg' />
                                </Link>
                            </div>
                            <div className='p-1'>
                                <div className='font-semibold text-gray-800 dark:text-gray-100'>{item?.title}</div>
                                <div className='pt-1 text-gray-800 dark:text-gray-400'><span className='font-semibold'>status:</span> {item?.novelStatus}</div>
                                <div className='flex gap-4 pt-1'>
                                    <div className='flex items-center'>
                                        <span><ThumbUpOffAltIcon /></span>
                                        <span className='pl-[2px]'>{item?.likes?.length}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span><RemoveRedEyeOutlinedIcon /></span>
                                        <span className='pl-[2px]'>{item?.views?.length}</span>
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <ButtonBook item={item} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> */}

            {/* <div className='flex justify-center pt-12'>
                <PaginationControlled
                    setPage={setPage}
                    last_page={1}
                    page={page}
                />
            </div> */}
        </div>
    )
}

export default Home
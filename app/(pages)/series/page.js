import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function Series() {
    const baseUrl = 'https://zscroll.peclick.com/api/'

    const responsePopularNovel = await fetch(`${baseUrl}public/get-most-popular-novels`)

    const novelGenreData = await responsePopularNovel.json()

    return (
        <div className='pt-20 pb-10'>
            {novelGenreData?.data?.length == 0 ?
                <div className='text-center pt-5 dark:text-gray-800'>No data found ?</div> :
                <div className='px-7 lg:px-20'>
                    <div>
                        <div className='text-center text-2xl pb-2'>All Series</div>
                    </div>
                    <div style={{boxShadow:"#dbd5d5 0px 0px 7px 0px"}} className='bg-gray-100 border grid md:grid-cols-4 lg:grid-cols-5 grid-cols-3 gap-4 md:gap-y-7 justify-center items-center p-5 rounded-md'>
                        {novelGenreData?.data?.map((item, index) => {
                            return (
                                <Link href={{ pathname: `/detail/${item?._id}` }} key={index}
                                    className='shadow-xl border-2 border-pink-500 m-auto rounded-lg bg-white p-1'>
                                    <div className='h-24 w-20 md:h-40 md:w-40 lg:h-52 lg:w-48 overflow-hidden'>
                                        <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full rounded-t-md hover:rounded-md object-cover' />
                                    </div>
                                    <div className='pl-1 pt-2 pb-1 text-gray-800'>
                                        <div className='text-sm md:text-lg font-semibold hidden md:block dark:text-gray-800'>{item?.title?.length > 20 ? item.title?.slice(0, 20) : item?.title}</div>
                                        <div className='text-xs md:py-1 text-gray-600'>{item?.type}</div>
                                        <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Series
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function Ranking() {
  const baseUrl = 'https://zscroll.peclick.com/api/'

  const resRankingByView = await fetch(`${baseUrl}public/get-rank-by-view-novels`)

  const rankingByViewData = await resRankingByView.json()

  return (
    <div className='pt-20'>
      {rankingByViewData?.data?.length == 0 ?
        <div className='text-center pt-5 dark:text-gray-800'>No data found ?</div> :
        <>
          <div>
            <div className='text-center text-2xl pb-2'>All Ranking</div>
          </div>
          <div className='grid md:grid-cols-4 lg:grid-cols-5 grid-cols-3 gap-4 md:gap-y-7 justify-center items-center py-3 px-7 lg:px-20'>
            {rankingByViewData?.data?.map((item, index) => {
              return (
                <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className='border-2 border-pink-500 m-auto rounded-lg bg-white p-1 shadow-md'>
                  <div className='h-24 w-20 md:h-40 md:w-40 lg:h-52 lg:w-48 overflow-hidden relative'>
                    <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full rounded-t-md hover:rounded-md object-cover' />
                    <div className={`text-white absolute top-0 left-0 px-3 rounded-tl-md ${index == 0 ? 'bg-green-500' : index == 1 ? 'bg-red-500' : index == 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{index + 1}</div>
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
        </>
      }
    </div>
  )
}

export default Ranking
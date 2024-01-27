'use client'
import useApiService from '@/services/ApiService';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Ranking() {
  const [rankingTab, setRankingTab] = useState('All')
  const [rankingByViewData, setRankingByViewData] = useState([])
  const { getRankingByView } = useApiService()

  // const baseUrl = 'https://zscroll.peclick.com/api/'

  // const resRankingByView = await fetch(`${baseUrl}public/get-rank-by-view-novels`)

  // const rankingByViewData = await resRankingByView.json()

  useEffect(() => {
    getRankingByView().then((res) => {
      console.log(res, 'ren view');
      setRankingByViewData(res?.data)
    }).catch((er) => {
      console.log(er);
    })
  }, [])

  return (
    <div className='pt-20'>
      {rankingByViewData?.data?.length == 0 ?
        <div className='text-center pt-5 dark:text-gray-800'>No data found ?</div> :
        <>
          <div className='w-full flex justify-center'>
            <div className='text-2xl pb-[1px] border-b-4 w-max border-cyan-500'>RANKING</div>
          </div>
          <div className='px-52 pt-8'>
            <div className='flex justify-end gap-x-6'>
              <div onClick={() => setRankingTab('All')} className={`cursor-pointer ${rankingTab == 'All' && 'border-b-2 border-black'}`}>All</div>
              <div onClick={() => setRankingTab('coins')} className={`cursor-pointer ${rankingTab == "coins" && 'border-b-2 border-black'}`}>Ranking By Coins</div>
              <div onClick={() => setRankingTab('views')} className={`cursor-pointer ${rankingTab == "views" && 'border-b-2 border-black'}`}>Ranking By Views</div>
              <div onClick={() => setRankingTab('bookmark')} className={`cursor-pointer ${rankingTab == "bookmark" && 'border-b-2 border-black'}`}>Ranking By Bookmark</div>
            </div>
            <div className='pt-2'>
              {rankingByViewData?.data?.map((item, index) => {
                return (
                  <div className='dark:bg-black flex items-center justify-between my-3 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]'>
                    <div className='flex'>
                      <div className='dark:border-white h-24 w-20 md:h-40 md:w-40 lg:h-24 lg:w-24 overflow-hidden relative border-2 border-black'>
                        <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full object-cover' />
                        <div className={`text-white absolute top-0 left-0 px-2 ${index == 0 ? 'bg-green-500' : index == 1 ? 'bg-red-500' : index == 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{index + 1}</div>
                      </div>
                      <div className='pl-3 pt-2 pb-1 text-gray-800'>
                        <div className='text-sm md:text-lg font-semibold hidden md:block dark:text-gray-200'>{item?.title}</div>
                        <div className='text-xs md:py-1 text-gray-600 dark:text-gray-100'>{item?.type}</div>
                        <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly />
                      </div>
                    </div>
                    <div className='pr-2 text-gray-900'>
                      <div className='flex'>
                        <BookmarkIcon />
                        <div className='pl-2'>Bookmark</div>
                      </div>

                      <div className='flex'>
                        <MenuBookIcon />
                        <Link className='pl-2' href={{ pathname: `/detail/${item?._id}` }}>Read Now</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Ranking
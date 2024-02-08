'use client'
import useApiService from '@/services/ApiService';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { usePathname, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Ranking() {
  const [rankingTab, setRankingTab] = useState('view')
  const [rankingByViewData, setRankingByViewData] = useState([])
  const { getRankingByView, getRankingByCoins, getRankingByBookmark, bookmarkNovel } = useApiService()
  const router = useRouter()
  const pathname = usePathname()
  const [timeFitler, setTimeFitler] = useState('allTime')

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const baseUrl = 'https://zscroll.peclick.com/api/'

  // const resRankingByView = await fetch(`${baseUrl}public/get-rank-by-view-novels`)

  // const rankingByViewData = await resRankingByView.json()

  const rankingByCoins = () => {
    getRankingByCoins().then((res) => {
      setRankingByViewData(res?.data)
    }).catch((er) => {
      console.log(er);
    })
  }

  const rankingByViews = () => {
    getRankingByView().then((res) => {
      setRankingByViewData(res?.data)
    }).catch((er) => {
      console.log(er);
    })
  }

  const rankingByBookmark = () => {
    getRankingByBookmark().then((res) => {
      setRankingByViewData(res?.data)
    }).catch((er) => {
      console.log(er);
    })
  }

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

  useEffect(() => {
    const path = pathname.slice(9)
    if (path == 'coins') {
      rankingByCoins()
      setRankingTab('coins')
    } else if (path == 'views') {
      rankingByViews()
      setRankingTab('views')
    } else {
      rankingByBookmark()
      setRankingTab('bookmark')
    }
  }, [])

  return (
    <div className='pt-20'>
      {rankingByViewData?.data?.length == 0 ?
        <div className='text-center pt-5 dark:text-gray-800'>No data found ?</div> :
        <>
          <div className='w-full flex'>
            <div className='md:hidden'>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => {
                  handleClose()
                  rankingByCoins()
                }}>Ranking By Coins</MenuItem>
                <MenuItem onClick={() => {
                  handleClose()
                  rankingByViews()
                }}>Ranking By Views</MenuItem>
                <MenuItem onClick={() => {
                  handleClose()
                  rankingByBookmark()
                }}>Ranking By Bookmark</MenuItem>
              </Menu>
            </div>
            {/* <div className='flex justify-center w-full'>
              <div className='mr-14 md:mr-0 text-2xl pb-[1px] border-b-4 w-max border-cyan-500'>RANKING</div>
            </div> */}
          </div>
          <div className='pt-2'>
            <div className='border-b justify-center lg:gap-x-6 gap-x-2 hidden md:flex'>
              {/* <div onClick={() => setRankingTab('All')} className={`cursor-pointer ${rankingTab == 'All' && 'border-b-2 border-black'}`}>All</div> */}
              <div onClick={() => {
                setRankingTab('views')
                rankingByViews()
              }} className={`cursor-pointer ${rankingTab == "views" && 'border-b-2 border-black pb-3'}`}>Ranking By Views</div>
              <div onClick={() => {
                setRankingTab('coins')
                rankingByCoins()
              }} className={`cursor-pointer ${rankingTab == "coins" && 'border-b-2 border-black pb-3'}`}>Ranking By Coins</div>
              <div onClick={() => {
                setRankingTab('bookmark')
                rankingByBookmark()
              }} className={`cursor-pointer ${rankingTab == "bookmark" && 'border-b-2 border-black pb-3'}`}>Ranking By Bookmark</div>
            </div>

            <div className='flex gap-x-8 justify-center pt-3'>
              <div onClick={() => setTimeFitler('monthly')} className={`border px-6 py-2 rounded-full bg-gray-100 ${timeFitler == 'monthly' ? 'text-blue-800' : 'text-gray-800'}`}>Monthly</div>
              <div onClick={() => setTimeFitler('weekly')} className={`border px-6 py-2 rounded-full bg-gray-100 ${timeFitler == 'weekly' ? 'text-blue-800' : 'text-gray-800'}`}>Weekly</div>
              <div onClick={() => setTimeFitler('allTime')} className={`border px-6 py-2 rounded-full bg-gray-100 text-gray-800 ${timeFitler == 'allTime' ? 'text-blue-800' : 'text-gray-800'}`}>All Time</div>
            </div>

            <div className='lg:px-52 px-5 pt-2'>
              {rankingByViewData?.data?.map((item, index) => {
                return (
                  <div className='dark:bg-gray-900 flex flex-col md:flex-row items-center justify-between my-3 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]'>
                    <Link href={{ pathname: `/detail/${item?._id}` }} className='flex'>
                      <div className='dark:border-white h-32 w-32 md:min-h-[9rem] md:min-w-[10rem] lg:min-h-[13.5rem] lg:min-w-[11rem] lg:max-h-[9rem] lg:max-w-[10rem] overflow-hidden relative border-2 border-black'>
                        <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full object-cover' />
                        {/* <div className={`text-white absolute top-0 left-0 px-2 ${index == 0 ? 'bg-green-500' : index == 1 ? 'bg-red-500' : index == 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{index + 1}</div> */}
                      </div>
                      <div className='pl-3 pt-2 pb-1 text-gray-800'>
                        <div className='flex gap-x-3 pb-1'>
                          <div className='border px-2 py-[2px] rounded-lg bg-blue-500 text-white md:text-sm text-xs'>#Fantasy</div>
                          <div className='border px-2 py-[2px] rounded-lg bg-blue-500 text-white md:text-sm text-xs'>#Comedy</div>
                          <div className='border px-2 py-[2px] rounded-lg bg-blue-500 text-white md:text-sm text-xs'>#Action</div>
                          <div className='border px-2 py-[2px] rounded-lg bg-blue-500 text-white md:text-sm text-xs hidden md:block'>#Supernatural</div>
                        </div>
                        <div className={`text-white ${index == 0 ? 'text-green-300' : index == 1 ? 'text-red-300' : index == 2 ? 'text-yellow-500' : 'text-blue-300'}`}>#{index + 1}</div>
                        <div className='text-sm md:text-lg font-semibold dark:text-gray-200'>{item?.title}</div>
                        <div className='text-xs md:py-1 text-gray-600 dark:text-gray-100'>{item?.type}</div>
                        <Rating precision={0.5} size='small' name="read-only" value={item?.totalRating} readOnly />
                        <div className='text-sm dark:text-gray-400 hidden md:block'>{item?.synopsis?.length > 100 ? `${item?.synopsis?.slice(0, 100)}...` : item?.synopsis}</div>
                        <div className='text-sm pr-14 dark:text-gray-400 block md:hidden'>{item?.synopsis?.length > 60 ? `${item?.synopsis?.slice(0, 60)}...` : item?.synopsis}</div>
                        <div className='text-sm pt-2'>Author Name</div>
                      </div>
                    </Link>
                    <div className='md:pr-2 text-gray-900 pb-1 w-full'>
                      <div className='flex items-center justify-end pr-4 md:pr-0'>
                        <BookmarksIcon className='text-gray-600 cursor-pointer' onClick={() => novelBookmark(item?._id)} />
                        <div onClick={() => {
                          item?.chapter?.length > 0 ?
                            router.push(`/chapter/${item?.chapter[0]}`) :
                            alert('chapter ongoing')
                        }} className='cursor-pointer ml-1 border px-4 bg-blue-500 hover:bg-blue-900 text-white rounded-full py-[2px] md:py-1'>Read</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      }
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Ranking
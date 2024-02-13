'use client'
import useApiService from '@/services/ApiService';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

function Ranking() {

  const contentTypeData = [
    {
      name: "All",
    },
    {
      name: "Translate",
    },
    {
      name: "Original",
    },
  ]

  const contentFeatureData = [
    {
      name: "All",
    },
    {
      name: "Completed",
    },
    {
      name: "Ongoing",
    },
  ]

  const timeData = [
    {
      name: "Monthly",
      time: "<30 Days",
    },
    {
      name: "Season",
      time: "31-90 Days",
    },
    {
      name: "Bi-annual",
      time: "91-180 Days",
    },
    {
      name: "Annual",
      time: "181-365 Days",
    },
    {
      name: "All Time",
      time: ">365 Days",
    },
  ]

  const genderLeadData = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ]

  const [rankingTab, setRankingTab] = useState('view')
  const [rankingByViewData, setRankingByViewData] = useState([])
  const { getRankingByView, getRankingByCoins, getRankingByBookmark, bookmarkNovel, getNovelByGenre } = useApiService()
  const [expanded, setExpanded] = React.useState('panel1');
  const router = useRouter()
  const pathname = usePathname()
  const [genderLead, setGenderLead] = useState('')
  const [novelGenreData, setNovelGenreData] = useState([])
  const [novelByGenreValue, setNovelByGenreValue] = useState('')
  const [contentTypeValue, setContentTypeValue] = useState('')
  const [contentFeaturedValue, setContentFeaturedValue] = useState('')
  const [timeFilter, setTimeFilter] = useState('')
  const [saveBookmark, setSaveBookmark] = useState('bookmark')
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rankingByCoins = (para1, para2, para3, para4, para5) => {
    let url = ''
    if (para1 == undefined) {
      url = `page=1&limit=10`
    } else {
      url = `page=1&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[releaseRange]=${para4}&filter[lead]=${para5}`
    }
    getRankingByCoins(url).then((res) => {
      setRankingByViewData(res?.data)
    }).catch((er) => {
      console.log(er);
    })
  }

  const rankingByViews = (para1, para2, para3, para4, para5) => {
    let url = ''
    if (para1 == undefined) {
      url = `page=1&limit=10`
    } else {
      url = `page=1&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[releaseRange]=${para4}&filter[lead]=${para5}`
    }
    getRankingByView(url).then((res) => {
      setRankingByViewData(res?.data)
      console.log(res?.data, "data view");
    }).catch((er) => {
      console.log(er);
    })

  }

  const rankingByBookmark = (para1, para2, para3, para4, para5) => {
    let url = ''
    if (para1 == undefined) {
      url = `page=1&limit=10`
    } else {
      url = `page=1&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[releaseRange]=${para4}&filter[lead]=${para5}`
    }
    getRankingByBookmark(url).then((res) => {
      setRankingByViewData(res?.data)
    }).catch((er) => {
      console.log(er);
    })
  }

  const novelBookmark = (id) => {
    if (localStorage.getItem('token')) {
      bookmarkNovel(id).then((res) => {
        if (res?.data?.data == "novel has been saved!") {
          setSaveBookmark('RemoveBookmark')
        } else {
          setSaveBookmark('bookmark')
        }
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

  useEffect(() => {
    getNovelByGenre().then((res) => {
      console.log(res?.data?.data, "res");
      setNovelGenreData(res?.data?.data)
    }).catch((er) => {
      console.log(er);
    })
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='pt-20'>

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

      </div>
      <div className='pt-2'>
        <div className='border-b justify-center lg:gap-x-6 gap-x-2 hidden md:flex'>
          <div onClick={() => {
            setRankingTab('views')
            rankingByViews()
            setTimeFilter('')
            setNovelByGenreValue('')
            setContentTypeValue('')
            setContentFeaturedValue('')
            setGenderLead('')
          }} className={`cursor-pointer hover:text-blue-400 ${rankingTab == "views" && 'border-b-2 border-black pb-3'}`}>Ranking By Views</div>
          <div onClick={() => {
            setRankingTab('coins')
            rankingByCoins()
            setTimeFilter('')
            setNovelByGenreValue('')
            setContentTypeValue('')
            setContentFeaturedValue('')
            setGenderLead('')
          }} className={`cursor-pointer hover:text-blue-400 ${rankingTab == "coins" && 'border-b-2 border-black pb-3'}`}>Ranking By Coins</div>
          <div onClick={() => {
            setRankingTab('bookmark')
            rankingByBookmark()
            setTimeFilter('')
            setNovelByGenreValue('')
            setContentTypeValue('')
            setContentFeaturedValue('')
            setGenderLead('')
          }} className={`cursor-pointer hover:text-blue-400 ${rankingTab == "bookmark" && 'border-b-2 border-black pb-3'}`}>Ranking By Bookmark</div>
        </div>


        <div className='flex gap-x-8 justify-center pt-3 pb-5'>
          {timeData?.map((item, index) => {
            return (
              <div key={index}
                onClick={() => {
                  if (rankingTab == 'views') {
                    rankingByViews(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, genderLead)
                  } else if (rankingTab == 'coins') {
                    rankingByCoins(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, genderLead)
                  } else {
                    rankingByBookmark(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, genderLead)
                  }
                  setTimeFilter(item?.name)
                }} className={`cursor-pointer border px-6 py-2 rounded-full text-sm ${timeFilter == item?.name ? 'bg-blue-800 text-white' : 'text-gray-800 bg-gray-100 dark:bg-[#131415] dark:text-white'}`}>
                <div>{item?.name}</div>
                <div>{item?.time}</div>
              </div>
            )
          })}
        </div>

        <div className='flex gap-x-6 px-5'>
          <div className='w-[25%] bg-[#dbeef1] dark:bg-[#131415] p-2 rounded-md hidden md:block'>
            <div className='text-lg font-semibold text-gray-700 dark:text-gray-100'>Filters</div>
            <div className='mt-2'>
              <div className='flex justify-between text-sm'>
                {genderLeadData?.map((item, index) => {
                  return (
                    <div key={index} onClick={() => {
                      if (rankingTab == 'views') {
                        rankingByViews(novelByGenreValue, contentTypeValue, contentFeaturedValue, timeFilter, item?.name)
                      } else if (rankingTab == 'coins') {
                        rankingByCoins(novelByGenreValue, contentTypeValue, contentFeaturedValue, timeFilter, item?.name)
                      } else {
                        rankingByBookmark(novelByGenreValue, contentTypeValue, contentFeaturedValue, timeFilter, item?.name)
                      }
                      setGenderLead(item?.name)
                    }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "bg-gray-100 dark:bg-gray-900 dark:text-white"}`}>{item?.name}</div>
                  )
                })}
              </div>

              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='dark:bg-[#202020]'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>Novel By Genre</Typography>
                </AccordionSummary>
                <AccordionDetails className='bg-[#dbeef1] dark:bg-[#202020] border-t-white border-t'>
                  <div className='grid grid-cols-3 text-center gap-2 text-[13px]'>
                    {novelGenreData?.map((item, index) => {
                      return (
                        <div key={index} onClick={() => {
                          if (rankingTab == 'views') {
                            rankingByViews(item?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                          } else if (rankingTab == 'coins') {
                            rankingByCoins(item?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                          } else {
                            rankingByBookmark(item?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                          }
                          setNovelByGenreValue(item?.name)
                        }}
                          className={`cursor-pointer h-max rounded-md py-1 ${novelByGenreValue === item?.name ? 'bg-gray-900 text-white hover:border-0' :
                          'bg-gray-100 dark:bg-[#131415] dark:text-white hover:bg-gray-900 hover:text-white hover:border-0 '}`}
                          style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                      )
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='dark:bg-[#202020]'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>
                    Content Type
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className='bg-gray-100 dark:bg-[#202020] border-t-white border-t'>
                  <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                    {contentTypeData?.map((item, index) => {
                      return (
                        <div key={index} onClick={() => {
                          if (rankingTab == 'views') {
                            rankingByViews(novelByGenreValue, item?.name, contentFeaturedValue, timeFilter, genderLead)
                          } else if (rankingTab == 'coins') {
                            rankingByCoins(novelByGenreValue, item?.name, contentFeaturedValue, timeFilter, genderLead)
                          } else {
                            rankingByBookmark(novelByGenreValue, item?.name, contentFeaturedValue, timeFilter, genderLead)
                          }
                          setContentTypeValue(item?.name)
                        }} className={`cursor-pointer rounded-md py-1 ${contentTypeValue === item?.name ? 'bg-gray-900 text-white hover:border-0' :
                        'hover:bg-gray-900 hover:text-white hover:border-0 dark:bg-[#131415] dark:text-white'}`}
                          style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                      )
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='dark:bg-[#202020]'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>
                    Content Status
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className='bg-gray-100 dark:bg-[#202020] border-t-white border-t'>
                  <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                    {contentFeatureData?.map((item, index) => {
                      return (
                        <div key={index} onClick={() => {
                          if (rankingTab == 'views') {
                            rankingByViews(novelByGenreValue, contentTypeValue, item?.name, timeFilter, genderLead)
                          } else if (rankingTab == 'coins') {
                            rankingByCoins(novelByGenreValue, contentTypeValue, item?.name, timeFilter, genderLead)
                          } else {
                            rankingByBookmark(novelByGenreValue, contentTypeValue, item?.name, timeFilter, genderLead)
                          }
                          setContentFeaturedValue(item?.name)
                        }} className={`cursor-pointer rounded-md py-1 ${contentFeaturedValue === item?.name ? 'bg-gray-900 text-white hover:border-0' :
                        'bg-gray-200 hover:bg-gray-800 hover:text-white hover:border-0 dark:bg-[#131415] dark:text-white'}`}
                          style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                      )
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>


          <div className='w-[75%]'>
            {rankingByViewData?.data?.length == 0 ?
              <div className='text-center pt-5 dark:text-gray-950'>No data found ?</div> :
              <>
                <div className=''>
                  {rankingByViewData?.data?.map((item, index) => {
                    return (
                      <div key={index} className='dark:bg-[#131415] flex flex-col md:flex-row items-center justify-between mb-3 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]'>
                        <Link href={{ pathname: `/detail/${item?._id}` }} className='flex'>
                          <div className='dark:border-white h-32 w-32 md:min-h-[9rem] md:min-w-[10rem] lg:min-h-[13.5rem] lg:min-w-[11rem] lg:max-h-[9rem] lg:max-w-[10rem] overflow-hidden relative border-2 border-black'>
                            <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full object-cover' />
                            {/* <div className={`text-white absolute top-0 left-0 px-2 ${index == 0 ? 'bg-green-500' : index == 1 ? 'bg-red-500' : index == 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{index + 1}</div> */}
                          </div>
                          <div className='pl-3 pt-2 pb-1 text-gray-800'>
                            <div className={`text-white ${index == 0 ? 'text-green-300' : index == 1 ? 'text-red-300' : index == 2 ? 'text-yellow-500' : 'text-blue-300'}`}>#{index + 1}</div>
                            <div className='text-sm md:text-lg font-semibold dark:text-gray-200'>{item?.title}</div>
                            <div className='text-xs md:py-1 text-gray-600 dark:text-gray-100'>{item?.type}</div>
                            <Rating precision={0.5} size='small' name="read-only" value={item?.totalRating} readOnly />
                            <div className='text-sm dark:text-gray-400 hidden md:block'>{item?.synopsis?.length > 100 ? `${item?.synopsis?.slice(0, 100)}...` : item?.synopsis}</div>
                            <div className='text-sm pr-14 dark:text-gray-400 block md:hidden'>{item?.synopsis?.length > 60 ? `${item?.synopsis?.slice(0, 60)}...` : item?.synopsis}</div>
                            <div className='text-sm pt-2 dark:text-gray-300'>Author Name</div>
                          </div>
                        </Link>
                        <div className='md:pr-2 text-gray-900 pb-1 w-full'>
                          <div className='flex items-center justify-end pr-4 md:pr-0'>
                            {/* <BookmarksIcon className='text-gray-600 cursor-pointer' onClick={() => novelBookmark(item?._id)} /> */}
                            {saveBookmark == 'bookmark' ? <BookmarkAddOutlinedIcon onClick={() => novelBookmark(item?._id)}
                              titleAccess='save bookmark' className='text-gray-700 dark:text-gray-200 cursor-pointer text-2xl' /> :
                              <BookmarkAddedOutlinedIcon onClick={() => {
                                setSaveBookmark('bookmark')
                                novelBookmark(item?._id)
                              }} titleAccess='Remove bookmark' fontSize='large' className='text-gray-700 cursor-pointer text-2xl' />}
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
              </>
            }
          </div>
        </div>

      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Ranking
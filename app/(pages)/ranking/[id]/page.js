'use client'
import useApiService from '@/services/ApiService';
import { Box, IconButton, Rating, useTheme } from '@mui/material';
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
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { BOOKMARK } from '@/app/Redux/slice/userSlice';

const drawerWidth = 330;

function Ranking(props) {

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
  const dispatch = useDispatch()
  const bookmarkData = useSelector((state) => state?.user?.bookmark)

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
          dispatch(BOOKMARK([...bookmarkData, id]))
        } else {
          setSaveBookmark('bookmark')
          let dataFilter = bookmarkData?.filter((reduxId) => reduxId !== id)
          dispatch(BOOKMARK(dataFilter))
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

  const theme = useTheme();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div className='pt-5 dark:bg-gray-800 h-full dark:text-gray-100'>
      <Box className='flex justify-between items-center'>
        <div className='pl-2'>Filter</div>
        <IconButton onClick={handleDrawerToggle} className='dark:text-white'>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      <div className='grid grid-cols-3 gap-2 px-2 pt-2'>
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
              }} className={`cursor-pointer border px-3 py-1 text-xs ${timeFilter == item?.name ? 'bg-blue-800 text-white' : 'text-gray-800 bg-gray-100 dark:bg-[#131415] dark:text-white'}`}>
              <div>{item?.name}</div>
              <div>{item?.time}</div>
            </div>
          )
        })}
      </div>

      <div className='text-lg font-semibold pl-2 pt-2'>Novel By Genre :</div>
      <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
        {novelGenreData?.map((text, index) => (
          <div key={index} className='text-center'>
            <div onClick={() => {
              if (rankingTab == 'views') {
                rankingByViews(text?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
              } else if (rankingTab == 'coins') {
                rankingByCoins(text?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
              } else {
                rankingByBookmark(text?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
              }
              setNovelByGenreValue(text?.name)
            }} className={novelByGenreValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
              'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text?.name}</div>
          </div>
        ))}
      </div>
      <Divider />

      <div className='text-lg font-semibold pl-2 pt-2'>Content Type :</div>
      <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
        {contentTypeData?.map((text, index) => (
          <div key={index} className='text-center'>
            <div onClick={() => {
              if (rankingTab == 'views') {
                rankingByViews(novelByGenreValue, text?.name, contentFeaturedValue, timeFilter, genderLead)
              } else if (rankingTab == 'coins') {
                rankingByCoins(novelByGenreValue, text?.name, contentFeaturedValue, timeFilter, genderLead)
              } else {
                rankingByBookmark(novelByGenreValue, text?.name, contentFeaturedValue, timeFilter, genderLead)
              }
              setContentTypeValue(text?.name)
            }} className={contentTypeValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
              'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
          </div>
        ))}
      </div>
      <Divider />

      <div className='text-lg font-semibold pl-2 pt-2'>Content Status :</div>
      <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
        {contentFeatureData?.map((text, index) => (
          <div key={index} className='text-center'>
            <div onClick={() => {
              if (rankingTab == 'views') {
                rankingByViews(novelByGenreValue, contentTypeValue, text?.name, timeFilter, genderLead)
              } else if (rankingTab == 'coins') {
                rankingByCoins(novelByGenreValue, contentTypeValue, text?.name, timeFilter, genderLead)
              } else {
                rankingByBookmark(novelByGenreValue, contentTypeValue, text?.name, timeFilter, genderLead)
              }
              setContentFeaturedValue(text?.name)
            }} className={contentFeaturedValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
              'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
          </div>
        ))}
      </div>
      <Divider />
    </div>
  )


  return (
    <div className='pt-20'>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <div className='w-full flex justify-between'>

        <div onClick={handleDrawerToggle} className='cursor-pointera md:hidden flex items-center pl-5'>
          <MenuIcon />
          <div className='pl-2 text-lg font-semibold text-gray-900'>Filter</div>
        </div>

      </div>

      <div className='pt-2'>
        <div className='border-b border-b-gray-500 justify-center lg:gap-x-6 gap-x-4 flex text-xs md:text-sm px-2 md:px-0 mb-2 pt-2'>
          <div onClick={() => {
            setRankingTab('views')
            rankingByViews()
            setTimeFilter('')
            setNovelByGenreValue('')
            setContentTypeValue('')
            setContentFeaturedValue('')
            setGenderLead('')
          }} className={`cursor-pointer dark:hover:border-b-white hover:border-b-black hover:border-b-2 ${rankingTab == "views" && 'border-b-2 dark:border-b-3 border-black dark:border-white pb-3'}`}>Ranking By Views</div>
          <div onClick={() => {
            setRankingTab('coins')
            rankingByCoins()
            setTimeFilter('')
            setNovelByGenreValue('')
            setContentTypeValue('')
            setContentFeaturedValue('')
            setGenderLead('')
          }} className={`cursor-pointer dark:hover:border-b-white hover:border-b-black hover:border-b-2 ${rankingTab == "coins" && 'border-b-2 dark:border-b-3 border-black dark:border-white pb-3'}`}>Ranking By Coins</div>
          <div onClick={() => {
            setRankingTab('bookmark')
            rankingByBookmark()
            setTimeFilter('')
            setNovelByGenreValue('')
            setContentTypeValue('')
            setContentFeaturedValue('')
            setGenderLead('')
          }} className={`cursor-pointer dark:hover:border-b-white hover:border-b-black hover:border-b-2 ${rankingTab == "bookmark" && 'border-b-2 dark:border-b-3 border-black dark:border-white pb-3'}`}>Ranking By Bookmark</div>
        </div>

        <div className='hidden md:flex gap-x-8 justify-center pt-3 pb-5'>
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
          <div className='w-[25%] bg-[#F6F6F6] dark:bg-[#131415] p-2 rounded-md hidden md:block'>
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

              <div className='flex flex-col gap-y-2 pt-2 pb-2'>
                {novelByGenreValue &&
                  <div className='flex'>
                    <div>Novel By Genre</div>
                    <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                      <div className='pr-1'>{novelByGenreValue}</div>
                      <CloseIcon onClick={() => setNovelByGenreValue('')} className='text-sm cursor-pointer' />
                    </div>
                  </div>
                }

                {contentTypeValue &&
                  <div className='flex'>
                    <div>Content Type</div>
                    <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                      <div className='pr-1'>{contentTypeValue}</div>
                      <CloseIcon onClick={() => setContentTypeValue('')} className='text-sm cursor-pointer' />
                    </div>
                  </div>}

                {contentFeaturedValue &&
                  <div className='flex'>
                    <div>Content Status</div>
                    <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                      <div className='pr-1'>{contentFeaturedValue}</div>
                      <CloseIcon onClick={() => setContentFeaturedValue('')} className='text-sm cursor-pointer' />
                    </div>
                  </div>
                }
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


          <div className='lg:w-[75%] w-full'>
            {rankingByViewData?.data?.length == 0 ?
              <div className='text-center pt-5 dark:text-gray-100'>No data found ?</div> :
              <>
                <div className=''>
                  {rankingByViewData?.data?.map((item, index) => {
                    return (
                      <div key={index} className='dark:bg-[#131415] flex flex-col md:flex-row items-center justify-between mb-3 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]'>
                        <Link href={{ pathname: `/detail/${item?._id}` }} className='flex'>
                          <div className='dark:border-white h-[9.4rem] w-32 md:min-h-[9rem] md:min-w-[10rem] lg:min-h-[13.5rem] lg:min-w-[11rem] lg:max-h-[9rem] lg:max-w-[10rem] overflow-hidden relative border-2 border-black'>
                            <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full object-cover' />
                            {/* <div className={`text-white absolute top-0 left-0 px-2 ${index == 0 ? 'bg-green-500' : index == 1 ? 'bg-red-500' : index == 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{index + 1}</div> */}
                          </div>
                          <div className='pl-3  pb-1 text-gray-800'>
                            {item?.subGenre.length > 0 &&
                              item?.subGenre?.map((genreData, index) => {
                                return (
                                  <div key={index} className='flex flex-wrap gap-2'>
                                    <div className='text-sm px-2 mt-[2px] bg-blue-400 text-white rounded-md'>{genreData}</div>
                                  </div>
                                )
                              })}
                            <div className='text-yellow-400 pt-1'>#{index + 1}</div>
                            {/* <div className={`text-white ${index == 0 ? 'text-green-300' : index == 1 ? 'text-red-300' : index == 2 ? 'text-yellow-500' : 'text-blue-500'}`}>#{index + 1}</div> */}
                            <div className='text-sm md:text-lg font-semibold dark:text-gray-200'>{item?.title}</div>
                            <div className='text-xs pt-1 md:py-1 text-gray-600 dark:text-gray-100'>{item?.genre}</div>
                            <div className='hidden md:block'>
                              <Rating
                                icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                value={item?.totalRating}
                                readOnly
                                className=''
                              />
                            </div>
                            <div className='text-sm dark:text-gray-400 hidden md:block'>{item?.synopsis?.length > 100 ? `${item?.synopsis?.slice(0, 100)}...` : item?.synopsis}</div>
                            <div className='text-sm pr-14 dark:text-gray-400 block md:hidden'>{item?.synopsis?.length > 30 ? `${item?.synopsis?.slice(0, 30)}...` : item?.synopsis}</div>
                            <div className='flex justify-between items-center'>
                              <div className='text-sm pt-2 dark:text-gray-300'>{item?.authorId?.name}</div>
                              <div className='md:pr-2 text-gray-900 pb-1 block md:hidden'>
                                <div className='flex items-center justify-end pr-4 md:pr-0'>
                                  {/* <BookmarksIcon className='text-gray-600 cursor-pointer' onClick={() => novelBookmark(item?._id)} /> */}
                                  {bookmarkData.filter((data) => data == item?._id).length > 0 ?
                                    <BookmarkAddedOutlinedIcon onClick={() => {
                                      setSaveBookmark('bookmark')
                                      novelBookmark(item?._id)
                                    }} titleAccess='Remove bookmark' fontSize='large' className='text-gray-700 cursor-pointer text-2xl' /> :
                                    <BookmarkAddOutlinedIcon onClick={() => novelBookmark(item?._id)}
                                      titleAccess='save bookmark' className='text-gray-700 dark:text-gray-200 cursor-pointer text-2xl' />}

                                  <div onClick={() => {
                                    item?.chapter?.length > 0 ?
                                      router.push(`/chapter/${item?.chapter[0]}`) :
                                      alert('chapter ongoing')
                                  }} className='cursor-pointer ml-1 border px-4 bg-blue-500 hover:bg-blue-900 text-white rounded-full py-[2px] md:py-1'>Read</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className='md:pr-2 text-gray-900 pb-1 w-full hidden md:block'>
                          <div className='flex items-center justify-end pr-4 md:pr-0'>
                            {/* <BookmarksIcon className='text-gray-600 cursor-pointer' onClick={() => novelBookmark(item?._id)} /> */}
                            {bookmarkData.filter((data) => data == item?._id).length > 0 ?
                              <BookmarkAddedOutlinedIcon onClick={() => {
                                setSaveBookmark('bookmark')
                                novelBookmark(item?._id)
                              }} titleAccess='Remove bookmark' fontSize='large' className='text-gray-700 cursor-pointer text-2xl' /> :
                              <BookmarkAddOutlinedIcon onClick={() => novelBookmark(item?._id)}
                                titleAccess='save bookmark' className='text-gray-700 dark:text-gray-200 cursor-pointer text-2xl' />
                            }

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

          {/* <div className='px-1'>
            <div className='block md:hidden grid grid-cols-3 gap-4 px-1'>
              {props?.featuredProductData?.data?.slice(0, 3)?.map((item, index) => {
                return (
                  <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className=''>
                    <div className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                      <div className='md:h-36 md:w-32 xl:w-56 h-32 w-44 overflow-hidden'>
                        <Image src={item?.coverImg} height={200} width={200} alt='' className='h-full w-full object-cover popularImageParent' />
                      </div>
                      <div className='text-white text-start pt-1 md:pb-0 px-1'>
                        <div className='block md:hidden text-sm font-semibold'>{item?.title?.slice(0, 8)}</div>
                        <div className='text-[11px] pt-1'>{item?.genre}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className='block md:hidden dark:bg-gray-950 rounded-md flex flex-col my-5 px-3 py-4'
              style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
              <div className='flex'>
                <div className='text-white text-start pl-2'>
                  <div className='flex justify-between'>
                    <div className='md:text-xl text-sm font-semibold'>{centerNovelData?.title}</div>
                    {saveBookmark == 'bookmark' ? <BookmarkAddOutlinedIcon onClick={() => novelBookmark(centerNovelData?._id)} titleAccess='save bookmark' className='text-white cursor-pointer text-2xl' /> :
                      <BookmarkAddedOutlinedIcon onClick={() => setSaveBookmark('bookmark')} titleAccess='Remove bookmark' fontSize='large' className='text-white cursor-pointer text-2xl' />}
                  </div>
                  <Rating size='small' name="read-only" value="5" readOnly />
                  <div className='text-gray-400 py-1 hidden md:block text-sm'>{centerNovelData?.description.length > 90 ? centerNovelData?.description?.slice(0, 90) : centerNovelData?.description}</div>
                  <div className='text-gray-400 block md:hidden text-sm'>{centerNovelData?.description.length > 90 ? centerNovelData?.description?.slice(0, 90) : centerNovelData?.description}...</div>
                </div>
              </div>
            </div>

            <div className='block md:hidden grid grid-cols-3 gap-4 px-1'>
              {props?.featuredProductData?.data?.slice(0, 3)?.map((item, index) => {
                return (
                  <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className=''>
                    <div className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                      <div className='md:h-36 md:w-32 xl:w-56 h-32 w-44  overflow-hidden'>
                        <Image src={item?.coverImg} height={200} width={200} alt='' className='h-full w-full object-cover popularImageParent' />
                      </div>
                      <div className='text-white text-start pt-1 md:pb-0 px-1'>
                        <div className='block md:hidden text-sm font-semibold'>{item?.title?.slice(0, 8)}</div>
                        <div className='text-[11px] pt-1'>{item?.genre}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div> */}
        </div>

      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Ranking
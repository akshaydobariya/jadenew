'use client'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoneIcon from '@mui/icons-material/Done';
import useApiService from '@/services/ApiService'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import PaginationControlled from '@/components/pagination';
import Head from 'next/head';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 330;

function Home(props) {
    const sortBy = [
        {
            name: "Popular",
            value: "popular",
        },
        {
            name: "Rating",
            value: "rating",
        },
        {
            name: "Latest",
            value: "latest",
        },
    ]

    const contentTypeData = [
        {
            name: "All",
        },
        {
            name: "Translated",
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

    const genderLeadData = [
        {
            name: "Male",
        },
        {
            name: "Female",
        },
    ]
    const router = useRouter();
    const [genderTab, setGenderTab] = React.useState('Male');
    const [expanded, setExpanded] = React.useState('panel1');
    const [latestUpdateData, setLatestUpdateData] = useState([])
    const [sotingName, setSotingName] = useState()
    const [filterNovelByGenre, setFilterNovelByGenre] = useState('All')
    const [filterContentType, setFilterContentType] = useState('All')
    const [filterContentStatus, setFilterContentStatus] = useState('All')
    const { globalSearchFilter, getNovelByGenre } = useApiService()
    const [page, setPage] = useState(1)
    const [shortList, setShortList] = useState()
    const [genderLead, setGenderLead] = useState('')
    const pathname = usePathname()
    const [novelByGenreValue, setNovelByGenreValue] = useState('')
    const [contentTypeValue, setContentTypeValue] = useState('')
    const [contentFeaturedValue, setContentFeaturedValue] = useState('')
    const [novelGenreData, setNovelGenreData] = useState([])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const theme = useTheme();

    const filterApi = (para1, para2, para3, para4, para5, page6) => {
        const path = pathname.slice(12)
        let url = `page=${page6}&limit=12&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[lead]=${para4}&filter[${para5}]=true`

        globalSearchFilter(url).then((res) => {
            setLatestUpdateData(res?.data?.data?.novels);
            setShortList(res?.data?.data?.novels);
        }).catch((er) => {
            console.log("Error novel-list", er);
        })
    }

    useEffect(() => {
        const path = pathname.slice(12)
        if (path.includes('Genre')) {
            setNovelByGenreValue(path.split('-')[0])
            filterApi(path.split('-')[0], contentTypeValue, contentFeaturedValue, genderLead, '', page)
        } else if (path.includes('More')) {
            setSotingName(path.split('-')[0])
            filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, path.split('-')[0], page)
        }
        else {
            filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, path.split('-')[0], page)
        }
    }, [])

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    var container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div className='pt-3 dark:bg-gray-800 h-full dark:text-gray-100 xl:hidden block'>
            <Box className='flex justify-between items-center'>
                <div className='pl-2'>Filter</div>
                <IconButton onClick={handleDrawerToggle} className='dark:text-white'>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
            <Divider />
            <div className='flex justify-between text-sm px-3 mt-2'>
                {genderLeadData?.map((item, index) => {
                    return (
                        <div onClick={() => {
                            filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, sotingName, '1')
                            setGenderLead(item?.name)
                        }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "dark:text-white  bg-gray-100 dark:bg-[#131415]"}`}>{item?.name}</div>
                    )
                })}
            </div>

            <div className='flex flex-col gap-y-2 pt-2 pb-2 pl-2'>
                {novelByGenreValue &&
                    <div className='flex'>
                        <div>Novel By Genre</div>
                        <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                            <div className='pr-1'>{novelByGenreValue}</div>
                            <CloseIcon onClick={() => {
                                setNovelByGenreValue('')
                                filterApi('', contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                                setPage(1)
                            }} className='text-sm cursor-pointer' />
                        </div>
                    </div>
                }

                {contentTypeValue &&
                    <div className='flex'>
                        <div>Content Type</div>
                        <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                            <div className='pr-1'>{contentTypeValue}</div>
                            <CloseIcon onClick={() => {
                                setContentTypeValue('')
                                filterApi(novelByGenreValue, '', contentFeaturedValue, genderLead, sotingName, '1')
                                setPage(1)
                            }} className='text-sm cursor-pointer' />
                        </div>
                    </div>}

                {contentFeaturedValue &&
                    <div className='flex'>
                        <div>Content Status</div>
                        <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                            <div className='pr-1'>{contentFeaturedValue}</div>
                            <CloseIcon onClick={() => {
                                setContentFeaturedValue('')
                                filterApi(novelByGenreValue, contentTypeValue, '', genderLead, sotingName, '1')
                                setPage(1)
                            }} className='text-sm cursor-pointer' />
                        </div>
                    </div>
                }
            </div>

            <div className='text-lg font-semibold pl-2 pt-2'>Novel By Genre :</div>
            <div className='flex flex-wrap gap-2 mt-2 px-4 pb-3'>
                {novelGenreData?.map((text, index) => (
                    <div className='text-center'>
                        <div onClick={() => {
                            setNovelByGenreValue(text?.name)
                            filterApi(text?.name, contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                            setPage(1)
                        }} className={novelByGenreValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
                            'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text?.name}</div>
                    </div>
                ))}
            </div>
            <Divider />

            <div className='text-lg font-semibold pl-2 pt-2'>Content Type :</div>
            <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                {contentTypeData?.map((text, index) => (
                    <div className='text-center'>
                        <div onClick={() => {
                            setContentTypeValue(text?.name)
                            filterApi(novelByGenreValue, text?.name, contentFeaturedValue, genderLead, sotingName, '1')
                            setPage(1)
                        }} className={contentTypeValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
                            'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                    </div>
                ))}
            </div>
            <Divider />

            <div className='text-lg font-semibold pl-2 pt-2'>Content Featured :</div>
            <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                {contentFeatureData?.map((text, index) => (
                    <div className='text-center'>
                        <div onClick={() => {
                            setContentFeaturedValue(text?.name)
                            filterApi(novelByGenreValue, contentTypeValue, text?.name, genderLead, sotingName, '1')
                            setPage(1)
                        }} className={contentFeaturedValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
                            'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                    </div>
                ))}
            </div>
            <Divider />
        </div>
    )

    useEffect(() => {
        getNovelByGenre().then((res) => {
            setNovelGenreData(res?.data?.data)
        }).catch((er) => {
            console.log(er);
        })
    }, [])

    return (
        <>
            <div>
                <Head>
                    <meta property="og:title" content="Jade scroll" />
                    <meta name="og:description" content="Jade scroll novels home page" />
                </Head>
                {/* Mobile drawer */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        // display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                <div className='md:pt-20 lg:pt-24 pt-20 px-4 md:px-8'>
                    <div className='flex gap-x-6'>
                        <div className='w-[25%] bg-[#F6F6F6] dark:bg-[#131415] p-2 rounded-md hidden xl:block shadow-[0_1px_7px_3px_#b7a7a740]'>
                            <div className='text-lg font-semibold text-gray-700 dark:text-gray-200'>Filters</div>
                            <div className='mt-2'>
                                <div className='flex justify-between text-sm'>
                                    {genderLeadData?.map((item, index) => {
                                        return (
                                            <div onClick={() => {
                                                filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, sotingName, '1')
                                                setGenderLead(item?.name)
                                                setPage(1)
                                            }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "dark:text-white  bg-gray-100 dark:bg-[#131415]"}`}>{item?.name}</div>
                                        )
                                    })}
                                </div>

                                <div className='flex flex-col gap-y-2 pt-2 pb-2'>
                                    {novelByGenreValue &&
                                        <div className='flex'>
                                            <div>Novel By Genre</div>
                                            <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                                                <div className='pr-1'>{novelByGenreValue}</div>
                                                <CloseIcon onClick={() => {
                                                    setNovelByGenreValue('')
                                                    filterApi('', contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                                                    setPage(1)
                                                }} className='text-sm cursor-pointer' />
                                            </div>
                                        </div>
                                    }

                                    {contentTypeValue &&
                                        <div className='flex'>
                                            <div>Content Type</div>
                                            <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                                                <div className='pr-1'>{contentTypeValue}</div>
                                                <CloseIcon onClick={() => {
                                                    setContentTypeValue('')
                                                    filterApi(novelByGenreValue, '', contentFeaturedValue, genderLead, sotingName, '1')
                                                    setPage(1)
                                                }} className='text-sm cursor-pointer' />
                                            </div>
                                        </div>}

                                    {contentFeaturedValue &&
                                        <div className='flex'>
                                            <div>Content Status</div>
                                            <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                                                <div className='pr-1'>{contentFeaturedValue}</div>
                                                <CloseIcon onClick={() => {
                                                    setContentFeaturedValue('')
                                                    filterApi(novelByGenreValue, contentTypeValue, '', genderLead, sotingName, '1')
                                                    setPage(1)
                                                }} className='text-sm cursor-pointer' />
                                            </div>
                                        </div>
                                    }
                                </div>

                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='dark:bg-[#202020] dark:text-white '>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }} className='dark:text-gray-100 text-gray-800 font-semibold'>Novel By Genre</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#F2F2F2] dark:bg-[#202020] border-t'>
                                        <div className='flex flex-wrap text-center gap-1 text-[13px]'>
                                            {novelGenreData?.map((item, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        filterApi(item?.name, contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                                                        setNovelByGenreValue(item?.name)
                                                        // setPage(1)
                                                    }}
                                                        className={`px-3 break-words h-max cursor-pointer hover:bg-gray-950 rounded-md py-1 hover:border-0
                                                         ${novelByGenreValue === item?.name ? 'bg-gray-900 text-white dark:bg-gray-700' : 'bg-white dark:bg-[#131415] hover:text-white'}`}
                                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                                )
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='dark:bg-[#202020] dark:text-white'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>
                                            Content Type
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] dark:border-t'>
                                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                                            {contentTypeData?.map((item, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        setContentTypeValue(item?.name)
                                                        filterApi(novelByGenreValue, item?.name, contentFeaturedValue, genderLead, sotingName, '1')
                                                        setPage(1)
                                                    }} className={`cursor-pointer hover:bg-gray-950 h-max rounded-md py-1 hover:border-0
                                                     ${contentTypeValue === item?.name ? 'bg-gray-900 text-white dark:bg-gray-700' : 'bg-white dark:bg-[#131415] hover:text-white'}`}
                                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                                )
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='dark:bg-[#202020] dark:text-white'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-200 font-semibold'>
                                            Content Status
                                        </Typography>

                                    </AccordionSummary>
                                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] dark:border-t'>
                                        {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                                            {contentFeatureData?.map((item, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        setContentFeaturedValue(item?.name)
                                                        filterApi(novelByGenreValue, contentTypeValue, item?.name, genderLead, sotingName, '1')
                                                        setPage(1)
                                                    }} className={`cursor-pointer hover:bg-gray-950 h-max rounded-md py-1 hover:border-0
                                                     ${contentFeaturedValue === item?.name ? 'bg-gray-900 dark:bg-gray-700 text-white hover:border-0' :
                                                            ' hover:bg-gray-900 hover:text-white hover:border-0 dark:bg-[#131415]'}`}
                                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                                )
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                        <div className={`${latestUpdateData?.data?.length > 0 ? '' : 'pb-40 lg:pb-10'} w-full xl:w-[75%] bg-[#FFFFFF] dark:bg-[#131415] md:p-4 rounded-md shadow-[0_1px_7px_3px_#b7a7a740]`}>
                            <div className='xl:flex items-center pb-4 hidden'>
                                <div className='text-lg pr-10 text-gray-700 dark:text-gray-200'>Sort By :</div>
                                <div className='flex flex-wrap gap-3'>
                                    {sortBy.map((item, index) => {
                                        return (
                                            <div onClick={() => {
                                                filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, item?.value, '1')
                                                setSotingName(item?.value)
                                                setPage(1)
                                            }} key={index}
                                                className={`capitalize cursor-pointer rounded-md px-2 text-sm py-1 shadow-[0_1px_2px_2px_#efe2e294] ${sotingName === item?.value ? 'bg-gray-900 text-white' :
                                                    'bg-gray-100 text-black dark:bg-[#131415] hover:bg-black hover:text-white dark:text-gray-200'}`}
                                            >{item.name}</div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='flex justify-between items-center pb-2 xl:hidden p-2'>
                                <div className='flex items-center'>
                                    <MenuIcon className='cursor-pointer' onClick={handleDrawerToggle} />
                                    <div className='pl-2 text-lg font-semibold dark:text-white text-gray-900'>Filter</div>
                                </div>
                                <div>
                                    {/* {console.log(sotingName,"sotingName")} */}
                                    <select
                                        // defaultValue={sotingName !== undefined && sotingName === 'latest' ? 'latest' : sotingName === 'rating' ? 'rating' : 'popular'}
                                        onChange={(e) => {
                                            filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, e.target.value, '1')
                                            setSotingName(e.target.value)
                                            setPage(1)
                                        }}
                                        className='px-2 py-[2px] focus:outline-none border border-gray-500 dark:bg-gray-900 rounded-md'>
                                        {sortBy?.map((item, index) => {
                                            return (
                                                <option value={item?.value}>{item?.name}</option>
                                            )
                                        })}
                                        {/* <option>Featured</option>
                                    <option>Games</option> */}
                                    </select>
                                </div>
                            </div>

                            {latestUpdateData?.data?.length == 0 ?
                                <div className='text-center pt-5 dark:text-white'>No data found</div> :
                                <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 md:gap-y-8 lg:gap-5 justify-center items-center py-3 px-2 md:px-3'>
                                    {latestUpdateData?.data?.map((item, index) => {
                                        return (
                                            <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className='dark:border-white m-auto rounded-lg bg-white dark:bg-gray-950 p-1 dark:shadow-[0_0_5px_2px_#ebebeb] shadow-[0_0_4px_5px_#ebebeb]'>
                                                <div className='h-40 w-36 md:h-40 md:w-40 lg:h-52 lg:w-48 overflow-hidden'>
                                                    <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full rounded-t-md hover:rounded-md object-cover' />
                                                </div>
                                                <div className='pl-1 pt-2'>
                                                    <div className='text-sm md:text-lg font-semibold  dark:text-gray-200 hidden lg:block'>{item?.title?.length > 18 ? `${item.title?.slice(0, 18)}..` : item?.title}</div>
                                                    <div className='text-sm md:text-lg font-semibold  dark:text-gray-200 block lg:hidden'>{item?.title?.length > 12 ? `${item.title?.slice(0, 12)}..` : item?.title}</div>
                                                    <div className='text-xs md:py-1 text-gray-600 dark:text-gray-400 hidden md:block'>{item?.genre}</div>
                                                    <div className='text-xs md:py-1 text-gray-600 dark:text-gray-400 block md:hidden'>{item?.genre?.length > 10 ? item?.genre.slice(0, 10) : item?.genre}</div>
                                                    {/* <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly /> */}
                                                    <div className='flex items-center'>
                                                        <Rating
                                                            icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                                            emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                                            value={item?.totalRating}
                                                            className='pt-1'
                                                            readOnly
                                                        />
                                                        {item?.totalRating > 0 && (
                                                            <div className='text-xs pl-1 pt-1'>{`(${item?.totalRating})`}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            }
                            {latestUpdateData?.data?.length > 0 && (
                                <div className='flex justify-center'>
                                    <PaginationControlled
                                        setPage={(page) => {
                                            setPage(page);
                                            filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, sotingName, page);
                                            if (typeof window !== 'undefined') {
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }}
                                        last_page={shortList?.totalPage}
                                        page={page}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
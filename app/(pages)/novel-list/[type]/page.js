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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 330;

function NovelList(props) {
    const sortBy = [
        {
            name: "popular",
        },
        {
            name: "Recommended",
        },
        {
            name: "rating",
        },
        {
            name: "Most Popular",
        },
        {
            name: "latest",
        },

    ]

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

    const genderLeadData = [
        {
            name: "Male",
        },
        {
            name: "Female",
        },
    ]

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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const theme = useTheme();

    const sortingApi = (path) => {
        setSotingName(path)
        let url = ''
        if (path == 'latest') {
            if (genderLead) {
                url = `page=${page}&limit=10&filter[latest]=true&filter[lead]=${genderLead}`
            } else {
                url = `page=${page}&limit=10&filter[latest]=true`
            }
        }
        if (path == 'popular') {
            if (genderLead) {
                url = `page=${page}&limit=10&filter[popular]=true&filter[lead]=${genderLead}`
            } else {
                url = `page=${page}&limit=10&filter[popular]=true`
            }
        }
        if (path == 'rating') {
            if (genderLead) {
                url = `page=${page}&limit=10&filter[rating]=true&filter[lead]=${genderLead}`
            } else {
                url = `page=${page}&limit=10&filter[rating]=true`
            }
        }
        // const url = `page=1&limit=10&filter[search]=solo&filter[genre]=Action&filter[type]=Original&filter[novelStatus]=OnGoing`
        globalSearchFilter(url).then((res) => {
            setLatestUpdateData(res?.data?.data?.novels);
            setShortList(res?.data?.data?.novels)
        }).catch((er) => {
            console.log("Error novel-list", er);
        })
    }

    useEffect(() => {
        const path = pathname.slice(12)
        // sortingApi(path)
        setSotingName(path)
        filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, path)
    }, [])

    const [novelByGenreValue, setNovelByGenreValue] = useState('')
    const [contentTypeValue, setContentTypeValue] = useState('')
    const [contentFeaturedValue, setContentFeaturedValue] = useState('')
    const [novelGenreData, setNovelGenreData] = useState([])

    // let url = '';
    //     if (type == 'genre') {
    //         if (genderLead) {
    //             url = `page=${page}&limit=10&filter[genre]=${data}&filter[${sotingName}]=true&filter[lead]=${genderLead}`
    //         } else {
    //             url = `page=${page}&limit=10&filter[genre]=${data}&filter[${sotingName}]=true`
    //         }
    //         setFilterNovelByGenre(data)
    //     }
    //     if (type == 'contentType') {
    //         if (genderLead) {
    //             url = `page=${page}&limit=10&filter[type]=${data}&filter[${sotingName}]=true&filter[lead]=${genderLead}`
    //         } else {
    //             url = `page=${page}&limit=10&filter[type]=${data}&filter[${sotingName}]=true`
    //         }
    //         setFilterContentType(data)
    //     }
    //     if (type == 'contentStatus') {
    //         if (genderLead) {
    //             url = `page=${page}&limit=10&filter[novelStatus]=${data}&filter[${sotingName}]=true&filter[lead]=${genderLead}`
    //         } else {
    //             url = `page=${page}&limit=10&filter[novelStatus]=${data}&filter[${sotingName}]=true`
    //         }
    //         setFilterContentStatus(data)
    //     }

    const filterApi = (para1, para2, para3, para4, para5) => {
        const path = pathname.slice(12)
        let url = `page=${page}&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[lead]=${para4}&filter[${para5}]=true`

        globalSearchFilter(url).then((res) => {
            setLatestUpdateData(res?.data?.data?.novels);
            setShortList(res?.data?.data?.novels)
        }).catch((er) => {
            console.log("Error novel-list", er);
        })
    }

    const filterLead = (leadName) => {
        let url = '';
        url = `page=${page}&limit=10&filter[lead]=${leadName}`
        globalSearchFilter(url).then((res) => {
            setLatestUpdateData(res?.data?.data?.novels);
            setShortList(res?.data?.data?.novels)
        }).catch((er) => {
            console.log("Error novel-list", er);
        })
    }

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    var container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div className='pt-20 dark:bg-gray-800 h-full dark:text-gray-100'>
            <Box className='flex justify-between items-center'>
                <div className='pl-2'>Filter</div>
                <IconButton onClick={handleDrawerToggle} className='dark:text-white'>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
            <Divider />
            <div className='text-lg font-semibold pl-2 pt-2'>Novel By Genre :</div>
            <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                {novelGenreData?.map((text, index) => (
                    <div className='text-center'>
                        <div onClick={() => {
                            setNovelByGenreValue(text?.name)
                            filterApi(text?.name, contentTypeValue, contentFeaturedValue, genderLead, sotingName)
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
                            filterApi(novelByGenreValue, text?.name, contentFeaturedValue, genderLead, sotingName)
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
                            filterApi(novelByGenreValue, contentTypeValue, text?.name, genderLead, sotingName)
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
            console.log(res?.data?.data, "res");
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                <div className='md:pt-3 lg:pt-20 pt-20 px-4 md:px-8'>
                    <div className='flex gap-x-6'>
                        <div className='w-[25%] bg-[#dbeef1] dark:bg-gray-900 p-2 rounded-md hidden md:block'>
                            <div className='text-lg font-semibold text-gray-700 dark:text-gray-200'>Filters</div>
                            <div className='mt-2'>
                                <div className='flex justify-between text-sm'>
                                    {genderLeadData?.map((item, index) => {
                                        return (
                                            <div onClick={() => {
                                                filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, sotingName)
                                                setGenderLead(item?.name)
                                            }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "dark:text-white  bg-gray-100 dark:bg-gray-800"}`}>{item?.name}</div>
                                        )
                                    })}
                                </div>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='dark:bg-gray-900 dark:text-white'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }} className='dark:text-gray-200 text-gray-800 font-semibold'>Novel By Genre</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-[#dbeef1] dark:bg-gray-950'>
                                        {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                        <div className='grid grid-cols-3 text-center gap-2 text-[13px]'>
                                            {novelGenreData?.map((item, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        filterApi(item?.name, contentTypeValue, contentFeaturedValue, genderLead, sotingName)
                                                        setNovelByGenreValue(item?.name)
                                                    }}
                                                        className={`cursor-pointer hover:bg-gray-950 max-h-max rounded-md py-1 hover:border-0
                                                         ${novelByGenreValue === item?.name ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:text-white'}`}
                                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                                )
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='dark:bg-gray-900 dark:text-white'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-200 font-semibold'>
                                            Content Type
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-gray-100 dark:bg-gray-950'>
                                        {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                                            {contentTypeData?.map((item, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        setContentTypeValue(item?.name)
                                                        filterApi(novelByGenreValue, item?.name, contentFeaturedValue, genderLead, sotingName)
                                                    }} className={contentTypeValue === item?.name ? 'rounded-md py-1 bg-gray-900 text-white hover:border-0 cursor-pointer' :
                                                        'rounded-md py-1 hover:bg-gray-900 hover:text-white hover:border-0 cursor-pointer'}
                                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                                )
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='dark:bg-gray-900 dark:text-white'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-200 font-semibold'>
                                            Content Status
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='bg-gray-100 dark:bg-gray-950'>
                                        {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                                            {contentFeatureData?.map((item, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        setContentFeaturedValue(item?.name)
                                                        filterApi(novelByGenreValue, contentTypeValue, item?.name, genderLead, sotingName)
                                                    }} className={contentFeaturedValue === item?.name ? 'rounded-md py-1 bg-gray-900 text-white hover:border-0 cursor-pointer' :
                                                        'rounded-md py-1 hover:bg-gray-900 hover:text-white hover:border-0 cursor-pointer'}
                                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                                )
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                        <div className='w-full md:w-[75%] bg-[#dbeef1] dark:bg-gray-900 md:p-4 rounded-md'>
                            <div className='md:flex items-center pb-4 hidden'>
                                <div className='text-lg pr-10 text-gray-700 dark:text-gray-200'>Sort By :</div>
                                <div className='flex flex-wrap gap-3'>
                                    {sortBy.map((item, index) => {
                                        return (
                                            <div onClick={() => {
                                                filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, item?.name)
                                                setSotingName(item?.name)
                                            }} key={index}
                                                className={sotingName === item?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-800 text-white' :
                                                    'bg-gray-950 text-white cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0 dark:text-gray-200 hover:dark:text-white'}
                                                style={{ boxShadow: "rgb(185 182 182) 0px 0px 3px 0px" }}>{item.name}</div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='flex justify-between items-center pb-2 md:hidden'>
                                <div className='flex items-center'>
                                    <MenuIcon className='cursor-pointer' onClick={handleDrawerToggle} />
                                    <div className='pl-2 text-lg font-semibold text-gray-900'>Filter</div>
                                </div>
                                <div>
                                    <select onChange={(e) => {
                                        filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, genderLead, e.target.value)
                                        setSotingName(e.target.value)
                                    }} className='px-2 py-[2px] focus:outline-none border border-gray-500 dark:bg-gray-900 rounded-md'>
                                        {sortBy?.map((item, index) => {
                                            return (
                                                <option value={item?.name}>{item?.name}</option>
                                            )
                                        })}
                                        {/* <option>Featured</option>
                                    <option>Games</option> */}
                                    </select>
                                </div>
                            </div>

                            {latestUpdateData?.data?.length == 0 ?
                                <div className='text-center pt-5 dark:text-white'>No data found ?</div> :
                                <div className='grid md:grid-cols-4 grid-cols-3 gap-4 md:gap-4 justify-center items-center py-3 px-5'>
                                    {latestUpdateData?.data?.map((item, index) => {
                                        return (
                                            <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className='border border-blue-600 m-auto rounded-lg bg-white dark:bg-gray-950 p-1 shadow-md'>
                                                <div className='h-24 w-20 md:h-40 md:w-40 lg:h-52 lg:w-48 overflow-hidden'>
                                                    <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full rounded-t-md hover:rounded-md object-cover' />
                                                </div>
                                                <div className='pl-1 pt-2 pb-1'>
                                                    <div className='text-sm md:text-lg font-semibold hidden md:block dark:text-gray-200'>{item?.title?.length > 20 ? item.title?.slice(0, 20) : item?.title}</div>
                                                    <div className='text-xs md:py-1 text-gray-600 dark:text-gray-400'>{item?.genre}</div>
                                                    <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly />
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            }
                            {latestUpdateData?.data?.length > 0 && (
                                <div className='flex justify-center'>
                                    <PaginationControlled
                                        setPage={setPage}
                                        last_page={shortList?.last_page}
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

export default NovelList
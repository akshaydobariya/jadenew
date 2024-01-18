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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NovelList() {
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

    const novelGenre = [
        {
            name: "All",
        },
        {
            name: "Horror",
        },
        {
            name: "Historical",
        },
        {
            name: "Games",
        },
        {
            name: "Urban",
        },
        {
            name: "Sci-fi",
        },
        {
            name: "Sports",
        },
        {
            name: "Action",
        },
        {
            name: "Eastern",
        },
        {
            name: "War",
        },
        {
            name: "Fantasy",
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

    const [genderTab, setGenderTab] = React.useState('Male');
    const [expanded, setExpanded] = React.useState('panel1');
    const [latestUpdateData, setLatestUpdateData] = useState([])
    const [sotingName, setSotingName] = useState()
    const [filterNovelByGenre, setFilterNovelByGenre] = useState('All')
    const [filterContentType, setFilterContentType] = useState('All')
    const [filterContentStatus, setFilterContentStatus] = useState('All')
    const { globalSearchFilter } = useApiService()
    const pathname = usePathname()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const sortingApi = (path) => {
        setSotingName(path)
        let url = ''
        if (path == 'latest') {
            url = `page=1&limit=10&filter[latest]=true`
        }
        if (path == 'popular') {
            url = `page=1&limit=10&filter[popular]=true`
        }
        if (path == 'rating') {
            url = `page=1&limit=10&filter[rating]=true`
        }
        // const url = `page=1&limit=10&filter[search]=solo&filter[genre]=Action&filter[type]=Original&filter[novelStatus]=OnGoing`
        globalSearchFilter(url).then((res) => {
            setLatestUpdateData(res?.data?.data?.novels);
        }).catch((er) => {
            console.log("Error novel-list", er);
        })
    }

    useEffect(() => {
        const path = pathname.slice(12)
        sortingApi(path)
    }, [])

    const filterApi = (data, type) => {
        let url = '';
        if (type == 'genre') {
            url = `page=1&limit=10&filter[genre]=${data}&filter[${sotingName}]=true`
            setFilterNovelByGenre(data)
        }
        if (type == 'contentType') {
            url = `page=1&limit=10&filter[type]=${data}&filter[${sotingName}]=true`
            setFilterContentType(data)
        }
        if (type == 'contentStatus') {
            url = `page=1&limit=10&filter[novelStatus]=${data}&filter[${sotingName}]=true`
            setFilterContentStatus(data)
        }

        globalSearchFilter(url).then((res) => {
            setLatestUpdateData(res?.data?.data?.novels);
        }).catch((er) => {
            console.log("Error novel-list", er);
        })
    }

    return (
        <div>
            {/* Mobile drawer */}
            <Drawer
                sx={{
                    width: 290,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 290,
                        boxSizing: 'border-box',
                        paddingTop: 9
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box className='flex justify-between items-center' >
                    <div className='pl-2'>Filter</div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>
                <Divider />
                <div className='text-lg font-semibold pl-2 pt-2'>Novel By Genre :</div>
                <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                    {novelGenre?.map((text, index) => (
                        <div className='text-center'>
                            <div onClick={() => filterApi(text?.name, 'genre')} className={filterNovelByGenre === text?.name ? 'rounded-md px-2 text-sm py-1 bg-gray-800 text-white' :
                                'rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                        </div>
                    ))}
                </div>
                <Divider />

                <div className='text-lg font-semibold pl-2 pt-2'>Content Type :</div>
                <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                    {contentTypeData?.map((text, index) => (
                        <div className='text-center'>
                            <div onClick={() => filterApi(text?.name, 'contentType')} className={filterNovelByGenre === text?.name ? 'rounded-md px-2 text-sm py-1 bg-gray-800 text-white' :
                                'rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                        </div>
                    ))}
                </div>
                <Divider />

                <div className='text-lg font-semibold pl-2 pt-2'>Content Featured :</div>
                <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                    {contentFeatureData?.map((text, index) => (
                        <div className='text-center'>
                            <div onClick={() => filterApi(text?.name, 'contentStatus')} className={filterNovelByGenre === text?.name ? 'rounded-md px-2 text-sm py-1 bg-gray-800 text-white' :
                                'rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                        </div>
                    ))}
                </div>
                <Divider />
            </Drawer>

            <div className='md:pt-3 lg:pt-20 pt-20 px-4 md:px-8'>
                <div className='text-start md:pb-5 pb-1 items-center'>
                    <div className='text-2xl md:text-2xl font-semibold text-center'>All Novels</div>
                </div>
                <div className='flex gap-x-6'>
                    <div className='w-[25%] bg-[#dbeef1] p-2 rounded-md hidden md:block'>
                        <div className='text-lg font-semibold text-gray-700'>Filters</div>
                        {/* <div className='flex justify-between gap-2 mb-2 mt-2 cursor-pointer text-sm'>
                            <div onClick={() => setGenderTab("Male")} className={genderTab == 'Male' ? 'flex justify-around items-center py-1 border border-black text-center w-full rounded-md bg-gray-900 text-white' :
                                'border border-black text-center w-full rounded-md py-1'}>
                                <span>Male</span>
                                {genderTab == 'Male' && <span className='text-end ml-4'><DoneIcon fontSize='small' /></span>}
                            </div>

                            <div onClick={() => setGenderTab("FeMale")} className={genderTab == 'FeMale' ? 'py-1 border border-black text-center w-full rounded-md bg-gray-900 text-white' :
                                'border border-black text-center w-full rounded-md py-1'}>
                                <span>FeMale</span>
                                {genderTab == 'FeMale' && <span className='text-end ml-4'><DoneIcon fontSize='small' /></span>}
                            </div>
                        </div> */}
                        <div className='mt-2'>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className=''>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 font-semibold'>Novel By Genre</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='bg-[#dbeef1]'>
                                    {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                    <div className='grid grid-cols-3 text-center gap-3 text-sm'>
                                        {novelGenre?.map((item, index) => {
                                            return (
                                                <div onClick={() => {
                                                    filterApi(item?.name, 'genre')
                                                }} className={filterNovelByGenre === item?.name ? 'rounded-md py-1 bg-gray-900 text-white hover:border-0 cursor-pointer' :
                                                    'rounded-md py-1 hover:bg-gray-900 hover:text-white hover:border-0 cursor-pointer'}
                                                    style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                            )
                                        })}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 font-semibold'>
                                        Content Type
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails className='bg-gray-100'>
                                    {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                    <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                                        {contentTypeData?.map((item, index) => {
                                            return (
                                                <div onClick={() => filterApi(item?.name, 'contentType')} className={filterContentType === item?.name ? 'rounded-md py-1 bg-gray-900 text-white hover:border-0 cursor-pointer' :
                                                    'rounded-md py-1 hover:bg-gray-900 hover:text-white hover:border-0 cursor-pointer'}
                                                    style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                            )
                                        })}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 font-semibold'>
                                        Content Status
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails className='bg-gray-100'>
                                    {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                                    <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                                        {contentFeatureData?.map((item, index) => {
                                            return (
                                                <div onClick={() => filterApi(item?.name, 'contentStatus')} className={filterContentStatus === item?.name ? 'rounded-md py-1 bg-gray-900 text-white hover:border-0 cursor-pointer' :
                                                    'rounded-md py-1 hover:bg-gray-900 hover:text-white hover:border-0 cursor-pointer'}
                                                    style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                            )
                                        })}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className='w-full md:w-[75%] md:bg-[#dbeef1] md:p-4 rounded-md'>
                        <div className='md:flex items-center pb-4 hidden'>
                            <div className='text-lg pr-10 text-gray-700'>Sort By :</div>
                            <div className='flex flex-wrap gap-3'>
                                {sortBy.map((item, index) => {
                                    return (
                                        <div onClick={() => sortingApi(item?.name)} key={index}
                                            className={sotingName === item?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-800 text-white' :
                                                'cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0 dark:text-gray-800 hover:dark:text-white'}
                                            style={{ boxShadow: "rgb(185 182 182) 0px 0px 3px 0px" }}>{item.name}</div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='flex justify-between items-center pb-2 md:hidden'>
                            <div className='flex items-center'>
                                <MenuIcon className='cursor-pointer' onClick={() => setOpen(true)} />
                                <div className='pl-2 text-lg font-semibold text-gray-900'>Filter</div>
                            </div>
                            <div>
                                <select onChange={(e) => sortingApi(e.target.value)} className='px-2 py-[2px] focus:outline-none border border-gray-500 rounded-md'>
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
                            <div className='text-center pt-5 dark:text-gray-800'>No data found ?</div> :
                            <div className='grid grid-cols-4 gap-4 md:gap-4 justify-center items-center py-3'>
                                {latestUpdateData?.data?.map((item, index) => {
                                    return (
                                        <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className='border-2 border-pink-500 m-auto rounded-lg bg-white p-1 shadow-md'>
                                            <div className='h-24 w-20 md:h-40 md:w-40 lg:h-52 lg:w-48 overflow-hidden'>
                                                <Image src={item.coverImg} height={300} width={300} alt='' className='ImageZoom h-full w-full rounded-t-md hover:rounded-md object-cover' />
                                            </div>
                                            <div className='pl-1 pt-2 pb-1'>
                                                <div className='text-sm md:text-lg font-semibold hidden md:block dark:text-gray-800'>{item?.title?.length > 20 ? item.title?.slice(0, 20) : item?.title}</div>
                                                <div className='text-xs md:py-1 text-gray-600'>{item?.type}</div>
                                                <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly />
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovelList
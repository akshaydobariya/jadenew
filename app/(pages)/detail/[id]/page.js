'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Rating from '@mui/material/Rating';
import NewRelaseOne from '../../../../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import NewRelaseTwo from '../../../../public/assets/Images/NewRelease/newReleaseTwo.jpeg'
import NewRelaseThree from '../../../../public/assets/Images/NewRelease/newReleaseThree.jpeg'
import NewRelaseFour from '../../../../public/assets/Images/NewRelease/newReleaseFour.jpeg'
import NewRelaseFive from '../../../../public/assets/Images/NewRelease/newReleaseFive.jpeg'
import NewRelaseSix from '../../../../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import LikeButton from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import coverImage from '../../../../public/assets/Images/chapterCoverImageFour.jpg'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LockIcon from '@mui/icons-material/Lock';
import { usePathname, useRouter } from 'next/navigation';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import useApiService from '@/services/ApiService';
import Link from 'next/link';
import moment from 'moment';
import Head from 'next/head';
import RestoreIcon from '@mui/icons-material/Restore';

function BookDetail() {
    const { getNovelDetailById, getNovelByid } = useApiService()
    const router = useRouter()
    const pathname = usePathname()
    const [detailData, setDetailData] = useState()
    const [localStorageToken, setLocalStorageToken] = useState()
    const [relatedNovel, setRelatedNovel] = useState([])

    const featuredBookData = [
        {
            image: NewRelaseOne,
            name: "Ordinary Days",
            category: "Wuxi&Xiang",
            rating: "3",
        },
        {
            image: NewRelaseTwo,
            name: "The Master of Names",
            category: "Wuxi&Xiang",
            rating: "3.5",
        },
        {
            image: NewRelaseThree,
            name: "Rise of A Supervillian",
            category: "Urban",
            rating: "5",
        },
        {
            image: NewRelaseFour,
            name: "Angelita",
            category: "Games",
            rating: "4",
        },
        {
            image: NewRelaseFive,
            name: "Lose Heart",
            category: "Games",
            rating: "4",
        },
        {
            image: NewRelaseSix,
            name: "God of War",
            category: "Urban",
            rating: "5",
        },
    ]

    const tag = [
        {
            name: "Chinense"
        },
        {
            name: "Fantasy"
        },
        {
            name: "Comedy"
        },
        {
            name: "Mystery"
        },
        {
            name: "Action"
        },
        {
            name: "Crafting"
        },
    ]

    useEffect(() => {
        const novelId = pathname.slice(8)
        getNovelDetailById(novelId).then((res) => {
            setDetailData(res?.data?.data)
            relatedNovelApi(res?.data?.data?.genre)
        }).catch((er) => {
            console.log(er, "Novel Detail Error");
        })
    }, [])

    const [tab, setTab] = useState('About')

    useEffect(() => {
        AOS.init();
        setLocalStorageToken(localStorage.getItem('token'))
    }, [])

    const relatedNovelApi = (Genrename) => {
        getNovelByid(Genrename).then((res) => {
            if (res.status == 200) {
                setRelatedNovel(res?.data?.data?.data)
            }
        }).catch((er) => {
            console.log(er, "er");
        })
    }

    return (
        <>
            <Head>
                <meta property="og:title" content={detailData?.title || null} />
                <meta name="og:description" content={detailData?.description || null} />
            </Head>
            {/* <link rel='icon' href='/logo.png' /> */}

            <div className='bg-gray-200'>
                <div className='pb-28 pt-16 text-gray-100'>
                    <div className='coverImageContainer'>
                        <Image alt='' src={coverImage} className='coverImageGradient object-cover' />
                    </div>
                    <div data-aos="fade-right" data-aos-duration="2000" className='flex md:flex-row flex-col absolute top-24 lg:top-44'>
                        <div className='lg:h-full h-40 w-48 lg:w-1/2 lg:pl-[5.25rem] pl-6'>
                            <Image src={detailData?.coverImg} height={100} width={100} alt='novel image' className='h-full w-full rounded-md' />
                        </div>

                        <div className='lg:pl-[5rem] pl-6 flex flex-col justify-between pb-1'>
                            <div>
                                <div>Novel</div>
                                <div className='py-3 text-4xl font-semibold'>{detailData?.title}</div>
                                <div className='flex gap-4'>
                                    <div className='flex'>
                                        <FilterVintageIcon />
                                        <div className='pl-1'>{detailData?.genre}</div>
                                    </div>
                                    <div className='flex'>
                                        <FormatListBulletedIcon />
                                        <span>{detailData?.chapter?.length > 0 && detailData?.chapter?.length}</span>
                                        <div className='pl-1'>Chapter</div>
                                    </div>
                                    <div className='flex'>
                                        {detailData?.novelStatus == "OnGoing" ?
                                            <PublishedWithChangesIcon /> :
                                            <RestoreIcon />}
                                        <div className='pl-1'>{detailData?.novelStatus}</div>
                                    </div>
                                </div>
                                <div className='flex gap-4 py-3'>
                                    <div className='flex items-center'><RemoveRedEyeOutlinedIcon /><span className='pl-1'>{detailData?.views?.length}</span></div>
                                    <div className='flex items-center'><ThumbUpOffAltIcon /><span className='pl-1'>{detailData?.likes?.length}</span></div>
                                </div>
                                <div className='flex'>
                                    <div>Author :</div>
                                    <div>danniel</div>
                                </div>
                                <div className='py-3 flex items-center'>
                                    <Rating size='small' name="read-only" value={detailData?.totalRating} readOnly />
                                    <span className='pl-2'>{detailData?.totalRating}</span>
                                </div>
                            </div>
                            <div>
                                <button className='border px-14 py-2 slideBtn sliderRight'>START READING</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white lg:mx-20 md:mx-10 mx-6 relative md:-top-44 -top-36 p-4 dark:bg-gray-800'>
                    <div className='flex text-2xl gap-x-12 md:gap-x-20 border-gray-300 border-b'>
                        <div id='About' onClick={() => setTab('About')} className={tab === 'About' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >About</div>
                        <div id='Chapter' onClick={() => setTab('Chapter')} className={tab === 'Chapter' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >Chapter</div>
                        <div id='Tier' onClick={() => setTab('Tier')} className={tab === 'Tier' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >Tiers</div>
                    </div>

                    {tab == 'About' ?
                        <>
                            <div className='flex pt-4 pb-8'>
                                <div>
                                    <div className='flex items-center'>
                                        <FormatListBulletedIcon fontSize='small' />
                                        <div className='text-gray-500 pl-1'>Chapters</div>
                                    </div>
                                    <div className='pt-[2px]'>{detailData?.chapter?.length > 0 ? detailData?.chapter?.length : "0"} Chapters</div>
                                </div>
                                <div className='lg:pl-32 pl-10'>
                                    <div className='flex'>
                                        <VerifiedUserOutlinedIcon />
                                        <div className='text-gray-500 pl-1'>Licensed From</div>
                                    </div>
                                    <div className='pl-1 pt-[2px]'>Zongheng</div>
                                </div>
                            </div>

                            <div className='pt-4 shadow-xl pb-4 bg-gray-200'>
                                <div className='text-2xl text-center lg:rankingParentHeading dark:text-gray-800'>Details</div>
                                <div className='leading-7 px-8 text-center'>
                                    <div className='text-gray-500'>{detailData?.synopsis}</div>
                                </div>
                            </div>

                            {/* <div className='pt-10 border-t pl-2'>
                                <div className='text-2xl font-medium CategoryHeading'>Category</div>
                                <div className='grid lg:grid-cols-11 md:grid-cols-7 grid-cols-3 gap-3 pt-3 border-gray-300 pb-4 cursor-pointer'>
                                    {
                                        tag?.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center justify-center hover:bg-pink-200 text-pink-800 text-sm border border-pink-500 px-2 py-1 rounded-md'>
                                                    <div className='pr-[2px]'>{item.name}</div>
                                                    <FavoriteBorderOutlinedIcon fontSize='small' />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> */}

                            <div className='pt-8 pl-2 pb-2'>
                                <div className='text-2xl pb-1'>Reviews</div>
                                <div>
                                    <div className='flex gap-4 py-3'>
                                        <div className='flex items-center'><ThumbUpOffAltIcon /><span className='pl-1'>75%</span></div>
                                        <div className='flex items-center'><RemoveRedEyeOutlinedIcon /><span className='pl-1'>50.1k</span></div>
                                    </div>
                                    <div className=''>
                                        {[...Array(3)].map((_, i) => {
                                            return (
                                                <div className='my-3 flex rounded-md p-3 bg-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                                    <div>
                                                        <Image alt='' src={NewRelaseFive} className='md:h-16 md:w-16 w-24 h-16 object-cover rounded-md' />
                                                    </div>
                                                    <div className='md:pl-4 pl-2'>
                                                        <div className='text-lg font-semibold'>Mister fuzz</div>
                                                        <div className='text-sm'>1 year ago</div>
                                                        <div className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                                                        {/* <div className='flex gap-4 pt-3 text-sm'>
                                                        <div className='flex items-center'><LikeButton fontSize='small' />98</div>
                                                        <div><ThumbDownOffAltIcon fontSize='small' />10</div>
                                                        <div><ChatOutlinedIcon fontSize='small' />22</div>
                                                    </div> */}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='text-end underline pt-4'>See More</div>
                            </div>

                            {relatedNovel.length > 0 &&
                                <div className='pt-4 pb-3 border-t border-gray-300'>
                                    <div className='text-2xl pb-3'>Related Novels</div>
                                    <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3'>
                                        {relatedNovel?.slice(0, 6)?.map((item, index) => {
                                            return (
                                                <div key={index} className=''>
                                                    <div className='h-24 w-20 md:h-40 md:w-40 lg:h-48 lg:w-44'>
                                                        <Image height={300} width={300} src={item?.coverImg} alt='' className='h-full w-full rounded-md object-cover' />
                                                    </div>
                                                    <div className='pl-1'>
                                                        <div className='text-sm md:text-base font-semibold hidden md:block'>{item.title}</div>
                                                        {/* <div className='text-sm md:text-base font-semibold block md:hidden'>{item.name.slice(0, 9)}..</div> */}
                                                        <div className='text-xs py-1 md:py-2 text-gray-600'>{item.genre}</div>
                                                        <Rating size='small' name="read-only" value={item?.totalRating} readOnly />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </>
                        : tab == 'Chapter' ?
                            detailData?.chapter?.length == 0 ?
                                <div className='text-center pt-7 pb-3'>Chapter Ongoing !</div> :
                                <>
                                    <div className='pt-2 pb-1'>
                                        <div className='text-gray-500'>Latest Chapter</div>
                                        <div className='flex items-center'>
                                            <div className='text-gray-800 font-semibold'>Chapter 1950</div>
                                            <div className='text-gray-500 pl-2 text-sm'>2 days ago</div>
                                        </div>
                                    </div>

                                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 pt-2'>
                                        {detailData?.chapter?.map((item, index) => {
                                            return (
                                                <Link href={localStorageToken == null ? '/login' : `/chapter/${item?._id}`} key={index} className='shadow-lg cursor-pointer bg-gray-200 p-2 rounded-lg flex items-center' >
                                                    <div className='bg-gray-400 px-3 py-1 rounded-md mr-3 h-max'>{index + 1}</div>
                                                    <div className='flex justify-between w-full'>
                                                        <div>
                                                            <div className='text-gray-800'>{item?.title}</div>
                                                            <div className='text-xs pt-1 text-gray-800'>{moment(item?.releaseDate).format('MM-DD-YYYY')}</div>
                                                        </div>
                                                        {index > 3 && <div><LockIcon sx={{ opacity: ".7" }} /></div>}
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </>
                            :
                            tab == 'Tier' &&
                            <div>
                                <div className='pb-10 pt-8 mt-2'>
                                    <div className='px-8 gap-7 md:grid md:grid-cols-3 grid-cols-1 rounded-md justify-between items-center'>
                                        {detailData?.subscription?.map((item, index) => {
                                            return (
                                                <div className={index % 2 === 0 ? 'shadow-xl my-4 md:my-0 gradientBlueOdd py-1 rounded-md text-white' : 'shadow-xl my-4 md:my-0 gradientBlueEven py-1 text-white rounded-md'}
                                                >
                                                    <div className='py-1 px-2 text-center font-semibold'>{item?.tierName}</div>
                                                    <div className='flex py-1 border-t-2 px-2 justify-between items-center'>
                                                        <div className='py-2'>
                                                            <div>Free Chapter</div>
                                                            <div>+ {item?.toChapter > 0 ? item?.toChapter - item?.fromChapter : '0'} Advance</div>
                                                            {/* <div>${item?.price} / month</div> */}
                                                        </div>
                                                        {/* <div>
                                                        <button className='px-3 bg-gray-400 text-white rounded-full py-1 text-sm'>SUBSCRIBE</button>
                                                    </div> */}
                                                        <div className='flex text-white'>
                                                            <div className='mb-3'>coins</div>
                                                            <div className='text-3xl'>{item?.coins}</div>
                                                            <div className='pt-3 text-sm'>/month</div>
                                                        </div>
                                                    </div>
                                                    <div className='border-t-2 text-center text-sm py-1'>SUBSCRIBE</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default BookDetail
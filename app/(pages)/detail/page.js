'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Rating from '@mui/material/Rating';
import NewRelaseOne from '../../../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseTwo.jpeg'
import NewRelaseThree from '../../../public/assets/Images/NewRelease/newReleaseThree.jpeg'
import NewRelaseFour from '../../../public/assets/Images/NewRelease/newReleaseFour.jpeg'
import NewRelaseFive from '../../../public/assets/Images/NewRelease/newReleaseFive.jpeg'
import NewRelaseSix from '../../../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import LikeButton from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import coverImage from '../../../public/assets/Images/chapterCoverImageFour.jpg'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/navigation';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function BookDetail() {
    const router = useRouter()
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

    const chapter = [
        {
            chapter: "1",
            name: "Chapter 1 - Go to the light",
            date: "11 Apr 2023"
        },
        {
            chapter: "2",
            name: "Chapter 2 - Yu's Restaurant",
            date: "12 Apr 2023"
        },
        {
            chapter: "3",
            name: "Chapter 3 - Peerles Genius",
            date: "13 Apr 2023"
        },
        {
            chapter: "4",
            name: "Chapter 4 - The Sky Academy",
            date: "14 Apr 2023"
        },
        {
            chapter: "5",
            name: "Chapter 5 - Strength Testing",
            date: "15 Apr 2023"
        },
        {
            chapter: "6",
            name: "Chapter 6 - The Silver Spear Sky",
            date: "16 Apr 2023"
        },
        {
            chapter: "7",
            name: "Chapter 7 - The Spear Danceed Like a Dragon",
            date: "17 Apr 2023"
        },
        {
            chapter: "8",
            name: "Chapter 8 - Codename Reaper",
            date: "18 Apr 2023"
        },
        {
            chapter: "9",
            name: "Chapter 9 - Wait & See",
            date: "19 Apr 2023"
        },
        {
            chapter: "10",
            name: "Chapter 10 - The Attepmt",
            date: "20 Apr 2023"
        },
        {
            chapter: "11",
            name: "Chapter 11 - Damn You",
            date: "21 Apr 2023"
        },
        {
            chapter: "12",
            name: "Chapter 12 - Hello, Headmaster",
            date: "22 Apr 2023"
        },
        {
            chapter: "13",
            name: "Chapter 13 - Greate Changes Are Coming",
            date: "23 Apr 2023"
        },
        {
            chapter: "14",
            name: "Chapter 14 - Top 10 Young Master List",
            date: "24 Apr 2023"
        },
        {
            chapter: "15",
            name: "Chapter 15 - Get Down on Your Knees",
            date: "25 Apr 2023"
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

    const [tab, setTab] = useState('About')

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className='bg-gray-200'>
            <div className='pb-28 pt-16 text-gray-100'>
                <div className='coverImageContainer'>
                    <Image alt='' src={coverImage} className='coverImageGradient object-cover' />
                </div>
                <div data-aos="fade-right" data-aos-duration="2000" className='flex absolute top-44'>
                    <div className='h-full w-1/2 pl-[5.25rem]'>
                        <Image src={NewRelaseSix} alt='novel image' className='h-full w-full rounded-md' />
                    </div>

                    <div className='pl-[5rem] flex flex-col justify-between pb-1'>
                        <div>
                            <div>Novel</div>
                            <div className='py-3 text-4xl font-semibold'>Immortal Martial God</div>
                            <div className='flex gap-4'>
                                <div className='flex'>
                                    <FilterVintageIcon />
                                    <div className='pl-1'>Fantasy</div>
                                </div>
                                <div className='flex'>
                                    <FormatListBulletedIcon />
                                    <div className='pl-1'>Chapter</div>
                                </div>
                                <div className='flex'>
                                    <PublishedWithChangesIcon />
                                    <div className='pl-1'>Completed</div>
                                </div>
                            </div>
                            <div className='flex gap-4 py-3'>
                                <div className='flex items-center'><RemoveRedEyeOutlinedIcon /><span className='pl-1'>844.1k</span></div>
                                <div className='flex items-center'><ThumbUpOffAltIcon /><span className='pl-1'>53%</span></div>
                            </div>
                            <div className='flex'>
                                <div>Author :</div>
                                <div>danniel</div>
                            </div>
                            <div className='py-3 flex items-center'>
                                <Rating size='small' name="read-only" value="4" readOnly />
                                <span className='pl-2'>4</span>
                            </div>
                        </div>
                        <div>
                            <button className='border px-14 py-2 slideBtn sliderRight'>START READING</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white lg:mx-20 md:mx-10 mx-6 relative -top-52 p-4'>
                <div className='flex text-2xl gap-x-20 border-gray-300 border-b '>
                    <div onClick={() => setTab('About')} className={tab === 'About' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >About</div>
                    <div onClick={() => setTab('Chapter')} className={tab === 'Chapter' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >Chapter</div>
                </div>

                {tab === 'About' &&
                    <>
                        <div className='flex pt-4 pb-8'>
                            <div>
                                <div className='flex items-center'>
                                    <FormatListBulletedIcon fontSize='small' />
                                    <div className='text-gray-500 pl-1'>Chapters</div>
                                </div>
                                <div className='pt-[2px]'>1024 Chapters</div>
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
                            <div className='text-2xl text-center rankingParentHeading'>Details</div>
                            <div className='leading-7 px-8 text-center'>
                                <div className='pb-2 text-gray-500'>Schedule: 14 chapters a week </div>
                                <div className='text-gray-500 hidden md:block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker Ipsum.</div>
                                <div className='text-gray-500 block md:hidden'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                                <div className='text-gray-500 pt-2'>Schedule: 14 chapters a week </div>
                            </div>
                        </div>

                        <div className='pt-10 border-t pl-2'>
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
                        </div>

                        <div className='pt-8 pl-2'>
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

                        <div className='pt-4 pb-3 border-t border-gray-300'>
                            <div className='text-2xl pb-3'>Related Novels</div>
                            <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3'>
                                {featuredBookData?.map((item, index) => {
                                    return (
                                        <div key={index} className=''>
                                            <div className='h-24 w-20 md:h-40 md:w-40 lg:h-48 lg:w-44'>
                                                <Image src={item.image} alt='' className='h-full w-full rounded-md object-cover' />
                                            </div>
                                            <div className='pl-1'>
                                                <div className='text-sm md:text-base font-semibold hidden md:block'>{item.name}</div>
                                                <div className='text-sm md:text-base font-semibold block md:hidden'>{item.name.slice(0, 9)}..</div>
                                                <div className='text-xs py-1 md:py-2 text-gray-600'>{item.category}</div>
                                                <Rating size='small' name="read-only" value={item.rating} readOnly />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                }

                {tab === 'Chapter' &&
                    <>
                        <div className='pt-2 pb-1'>
                            <div className='text-gray-500'>Latest Chapter</div>
                            <div className='flex items-center'>
                                <div className='text-gray-800 font-semibold'>Chapter 1950</div>
                                <div className='text-gray-500 pl-2 text-sm'>2 days ago</div>
                            </div>
                        </div>

                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 pt-2'>
                            {chapter.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => router.push('/chapter')} className='cursor-pointer bg-gray-200 p-2 rounded-lg flex items-center' style={{ boxShadow: "0px 0px 5px 0px #e5d5d5" }}>
                                        <div className='bg-gray-400 px-3 py-1 rounded-md mr-3 h-max'>{item.chapter}</div>
                                        <div className='flex justify-between w-full'>
                                            <div>
                                                <div className='text-gray-800'>{item.name}</div>
                                                <div className='text-xs pt-1 text-gray-800'>{item.date}</div>
                                            </div>
                                            {index > 5 && <div><LockIcon sx={{ opacity: ".7" }} /></div>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default BookDetail
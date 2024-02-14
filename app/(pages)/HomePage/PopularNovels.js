'use client'
import Image from 'next/image'
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import flagIcon from '../../../public/assets/Images/favorite.png'
import Link from 'next/link';
import { useState } from 'react';
import tagImage from '../../../public/assets/Images/favorite.png'

function PopularNovels(props) {
    const router = useRouter()
    const [title, setTitleIndex] = useState(null)

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
        ],
    };

    return (
        // <div className='md:pt-10 pt-10 px-4 md:px-8'>
        //     <div className='flex justify-between items-center'>
        //         <div className='text-start pb-5'>
        //             <div className='text-2xl md:text-2xl font-semibold heading'>Most Popular Novels</div>
        //             {/* <div className='text-base'>Let's read top stories genre!</div> */}
        //         </div>
        //         <div className='underline'>See More</div>
        //     </div>
        //     <div className='grid md:grid-cols-6 grid-cols-3 md:gap-x-4'>
        //         {/* <Slider {...settings} className='w-full'> */}
        //         {props?.NewReleaseData?.map((item, index) => {
        //             return (
        //                 <div key={index} className='relative '>
        //                     <div className='cursor-pointer backgroundFrameRotate'>
        //                         <Image src={frame} alt='' className='h-32 md:h-36 lg:h-44 w-72' />
        //                     </div>
        //                     <div key={index} className='absolute top-0 inset-0 m-auto p-2 md:p-3 h-24 w-28 md:h-32 md:w-20 lg:h-32 lg:w-[12rem] rounded-2xl z-50'>
        //                         <Image src={item.image} alt='' className='h-full rounded-xl object-contain' />
        //                     </div>
        //                 </div>
        //             )
        //         })}
        //         {/* </Slider> */}
        //     </div>
        // </div>
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold heading'>Most Popular Novels</div>
                <Link href={{ pathname: `/novel-list/popular` }} className='underline cursor-pointer'>See More</Link>
            </div>
            <div className='md:gap-x-4 flex md:hidden'>
                <Slider {...settings} className='w-full'>
                    {props?.popularNovelsData?.data?.map((item, index) => {
                        return (
                            <div onClick={() => {
                                title !== null && router.push(`/detail/${item?._id}`)
                            }} key={index} className="NewReleaseCard cursor-pointer rounded-2xl">
                                <Image src={item?.coverImg} height={300} width={300} alt='' className='releaseImage' />
                                <div className={index === title ? "info" : ""}>
                                    <h1 className='font-semibold'>{item?.title !== null && item?.title?.length > 10 ? item?.title.slice(0, 10) : item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 10 ? item?.description.slice(0, 10) : item?.description}</p>
                                </div>
                                <div onClick={() => setTitleIndex(index)} className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title}</div>
                                <div onClick={() => setTitleIndex(index)} className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title?.length > 10 ? item?.title?.slice(0, 10) : item?.title}</div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
            <div className='md:gap-x-4 md:flex hidden'>
                <Slider {...settings} className='w-full'>
                    {props?.popularNovelsData?.data?.map((item, index) => {
                        return (
                            <div onClick={() => title !== null && router.push(`/detail/${item?._id}`)} key={index} className="NewReleaseCard cursor-pointer rounded-2xl">
                                <Image src={item?.coverImg} height={300} width={300} alt='' className='releaseImage' />
                                <div className="">
                                    <Image src={tagImage} alt="tag" className="h-[4.5rem] w-8 -rotate-90 left-[1.1rem] absolute -top-[.8rem]" />
                                    <div className="text-white left-1 absolute top-4 text-[9px] font-semibold">{item?.genre.length > 10 ? item?.genre.slice(0, 10) : item?.genre}</div>
                                </div>
                                <div className={index === title ? "info" : ""}>
                                    <h1 className='font-semibold'>{item?.title !== null && item?.title?.length > 10 ? item?.title.slice(0, 10) : item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 10 ? item?.description.slice(0, 10) : item?.description}</p>
                                </div>
                                <div onClick={() => setTitleIndex(index)} className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title}</div>
                                <div onClick={() => setTitleIndex(index)} className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title?.length > 10 ? item?.title?.slice(0, 10) : item?.title}</div>
                            </div>
                        )
                    })}
                </Slider>
                {/* <Slider {...settings} className='w-full'>
                    {props?.popularNovelsData?.data?.map((item, index) => {
                        return (
                            <div onClick={() => router.push(`/detail/${item?._id}`)} key={index} className="NewReleaseCard cursor-pointer rounded-2xl">
                                <Image src={item?.coverImg} height={300} width={300} alt='' className='releaseImage' />
                                <div className="info">
                                    <h1 className='font-semibold'>{item?.title !== null && item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 20 ? item?.description.slice(0, 20) : item?.description}</p>
                                </div>
                                <div className="">
                                    <Image src={tagImage} alt="tag" className="h-[4.5rem] w-8 -rotate-90 left-[1.1rem] absolute -top-[.8rem]" />
                                    <div className="text-white left-1 absolute top-4 text-[9px] font-semibold">{item?.genre.length > 10 ? item?.genre.slice(0, 10) : item?.genre}</div>
                                </div>
                                <div className="relative top-[10.1rem] rounded-b-xl text-sm py-1 text-center text-white font-semibold"
                                    style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.583))' }} >
                                    {item?.title !== null && item?.title?.length > 20 ? item?.title?.slice(0, 20) : item?.title}
                                </div>
                            </div>
                        )
                    })}
                </Slider> */}
            </div>
        </div>
    )
}

export default PopularNovels
'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import tagImage from '../../../public/assets/Images/favorite.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules'
import { Mousewheel, Pagination } from 'swiper/modules';

function NewRelease(props) {
    const [title, setTitleIndex] = useState(null)
    const router = useRouter()
    const [doubleClick, setDoubleClick] = useState({ id: '', count: 0 })

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        autoplay: false,
        swipeToSlide: true,
        swipe: true,
        speed: 100,
        pauseOnDotsHover: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 6,
                    infinite: false,
                    dots: false,
                    swipeToSlide: true,
                    swipe: true,
                    speed: 100,
                    pauseOnDotsHover: false,

                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 3,
                    swipeToSlide: true,
                    swipe: true,
                    speed: 100,
                    pauseOnDotsHover: false,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold'>New Releases</div>
                {props?.NewReleasedata?.data.length > 6 && <Link href={{ pathname: `novel-list/latest-More` }} className='underline cursor-pointer'>See More</Link>}
            </div>
            <div className='md:hidden block'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    freeMode={true}
                    pagination={{
                        clickable: false,
                    }}
                    modules={[FreeMode]}
                    allowTouchMove={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {props?.NewReleasedata?.data?.map((item, index) => {
                        return (
                            <SwiperSlide>
                                <div key={index} className={`${index == title ? '' : 'before:z-0'} NewReleaseCard cursor-pointer rounded-2xl overflow-hidden`} >
                                    <div onClick={() => {
                                        router.push(`/detail/${item?._id}`);
                                    }}>
                                        <Image src={item?.coverImg} height={300} width={300} alt='' className='releaseImage' />
                                    </div>
                                    <div className={index === title ? "info" : ""}>
                                        <h1 className='font-semibold'>{item?.title !== null && item?.title}</h1>
                                        <p>{item?.description !== null && item?.description.length > 145 ? item?.description.slice(0, 145) : item?.description}</p>
                                    </div>
                                    <div onClick={() => setTitleIndex(index)} className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title}</div>
                                    <div onClick={() => {
                                        title !== index ? setTitleIndex(index) : title == null ? setTitleIndex(index) : setTitleIndex(null)
                                    }
                                    } className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title?.length > 15 ? `${item?.title?.slice(0, 15)}..` : item?.title}</div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className='md:gap-x-4 md:flex hidden'>
                <Swiper
                    direction={'horizontal'}
                    slidesPerView={4}
                    spaceBetween={10}
                    mousewheel={true}
                    freeMode={true}
                    modules={[Mousewheel, FreeMode]}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {props?.NewReleasedata?.data?.map((item, index) => {
                        return (
                            <SwiperSlide key={index} onClick={() => router.push(`/detail/${item?._id}`)} className="containerImage cursor-pointer">
                                <Image src={item?.coverImg} height={300} width={300} alt='' className='rounded-md min-h-[245px] object-cover' />
                                <div className="textImage px-2">
                                    <h1 className='font-semibold pb-1 pt-1'>{item?.title !== null && item?.title.length > 30 ? item?.title?.slice(0, 30) : item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 110 ? `${item?.description.slice(0, 110)}..` : item?.description}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default NewRelease
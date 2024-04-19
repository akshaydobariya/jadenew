'use client'
import Image from 'next/image'
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import flagIcon from '../../../public/assets/Images/favorite.png'
import Link from 'next/link';
import { useState } from 'react';
import tagImage from '../../../public/assets/Images/favorite.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode'
import { FreeMode, Mousewheel } from 'swiper/modules'

function PopularNovels(props) {
    const router = useRouter()
    const [title, setTitleIndex] = useState(null)

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-bold'>Most Popular Novels</div>
                <Link href={{ pathname: `/novel-list/popular-More` }} className='underline cursor-pointer'>See More</Link>
            </div>
            <div className='md:gap-x-4 flex md:hidden'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    freeMode={true}
                    pagination={{
                        clickable: false,
                    }}
                    modules={[FreeMode]}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}>
                    {props?.popularNovelsData?.data?.data?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={`${index === title ? "" : "before:z-0"} NewReleaseCard cursor-pointer rounded-2xl overflow-hidden`}>
                                    <div onClick={() => router.push(`/detail/view/${item?._id}`)}>
                                        <Image src={item?.coverImg} height={300} width={300} alt='cover' className='releaseImage' />
                                    </div>
                                    <div className={index === title ? "info" : ""}>
                                        <h1 className='font-semibold'>{item?.title !== null && item?.title}</h1>
                                        <p>{item?.description !== null && item?.description.length > 200 ? item?.description.slice(0, 200) : item?.description}</p>
                                    </div>
                                    <div onClick={() => setTitleIndex(index)} className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title}</div>
                                    <div onClick={() => title !== index ? setTitleIndex(index) : title == null ? setTitleIndex(index) : setTitleIndex(null)} className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title?.length > 15 ? `${item?.title?.slice(0, 15)}..` : item?.title}</div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            <div className='md:gap-x-4 md:flex hidden'>
                <Swiper
                    slidesPerView={5}
                    loop
                    spaceBetween={8}
                    freeMode={true}
                    mousewheel={true}
                    pagination={{
                        clickable: false,
                    }}
                    modules={[Mousewheel, FreeMode]}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {props?.popularNovelsData?.data?.data?.map((item, index) => {
                        return (
                            <SwiperSlide key={index} onClick={() => router.push(`/detail/view/${item?._id}`)} className="containerImage cursor-pointer">
                                <Image src={item?.coverImg} height={300} width={300} alt='cover' className='rounded-md min-h-[245px] object-cover' />
                                <div className="textImage">
                                    <h1 className='font-semibold'>{item?.title !== null && item?.title?.length > 30 ? item?.title?.slice(0, 30) : item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 70 ? `${item?.description.slice(0, 70)}.` : item?.description}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default PopularNovels
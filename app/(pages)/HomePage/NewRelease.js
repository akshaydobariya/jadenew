'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import tagImage from '../../../public/assets/Images/favorite.png'

function NewRelease(props) {
    const [title, setTitleIndex] = useState(null)
    const router = useRouter()

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
                <div className='text-2xl md:text-2xl font-semibold heading'>New Release</div>
                {props?.NewReleasedata?.data.length > 6 && <Link href={{ pathname: `novel-list/latest` }} className='underline cursor-pointer'>See More</Link>}
            </div>
            <div className='md:gap-x-4 md:hidden flex'>
                <Slider {...settings} className='w-full'>
                    {props?.NewReleasedata?.data?.map((item, index) => {
                        return (
                            <div onClick={() => {
                                title !== null && router.push(`/detail/${item?._id}`)
                            }} key={index} className="relative NewReleaseCard cursor-pointer rounded-2xl">
                                <Image src={item?.coverImg} height={300} width={300} alt='' className='releaseImage' />
                                <div className={index === title ? "info" : ""}>
                                    <h1 className='font-semibold'>{item?.title !== null && item?.title?.length > 20 ? item?.title?.slice(0, 20) : item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 20 ? item?.description.slice(0, 20) : item?.description}</p>
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
                    {props?.NewReleasedata?.data?.map((item, index) => {
                        return (
                            <div key={index} onClick={() => router.push(`/detail/${item?._id}`)} className="containerImage cursor-pointer">
                                <Image src={item?.coverImg} height={300} width={300} alt='' className='rounded-md min-h-[245px] object-cover' />
                                <div className="textImage px-2">
                                    <h1 className='font-semibold pb-1 pt-1'>{item?.title !== null && item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 150 ? item?.description.slice(0, 150) : item?.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default NewRelease
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import NewRelaseOne from '../../../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseTwo.jpeg'
import NewRelaseThree from '../../../public/assets/Images/NewRelease/newReleaseThree.jpeg'
import useApiService from '@/services/ApiService';

function Popular(props) {

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: false,
                },
            },
        ],
    };


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
    ]

    const { getPopularThisWeek } = useApiService()
    const [popularWeekData, setPopularWeekData] = useState([])

    useEffect(() => {
        getPopularThisWeek().then((res) => {
            console.log(res, "res popular this week");
            setPopularWeekData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error Popular week");
        })
    }, [])

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8 pb-7'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold'>Popular this week</div>
                <div className='underline'>See More</div>
            </div>

            <div className=''>
                <Slider {...settings} className='w-full'>
                    {featuredBookData?.map((data, index) => {
                        return (
                            <div className='poularWeekCard flex items-center group py-2'>
                                <div className='md:h-56 md:w-44 h-28 w-20 group-hover:shadow-[4px_5px_6px_5px_#f3c9d9] group-hover:z-10'>
                                    <Image src={data?.image} alt='popular image' className='h-full w-full rounded-md' />
                                </div>
                                <div className='text-xs md:text-sm group-hover:border-2 group-hover:border-[#CD3D73] overflow-hidden pl-1 md:pl-5 border rounded-r-md bg-gray-300 h-[4.5rem] md:h-36 w-1/2 flex flex-col justify-center'>
                                    <div className='underline'>{data?.category}</div>
                                    <div className='py-1 font-semibold md:text-base'>{data?.name}</div>
                                    <div className='hidden md:block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Popular
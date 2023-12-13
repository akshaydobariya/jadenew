import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick';
import frame from '../public/assets/Images/Banner/zscrollCardImagefour.jpg'

function PopularComics(props) {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 5,
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
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center'>
                <div className='text-start pb-5'>
                    <div className='text-2xl md:text-2xl font-semibold heading'>Most Popular Novels</div>
                    {/* <div className='text-base'>Let's read top stories genre!</div> */}
                </div>
                <div className='underline'>See More</div>
            </div>
            <div className='grid md:grid-cols-6 grid-cols-3 md:gap-x-4'>
                {/* <Slider {...settings} className='w-full'> */}
                {props?.NewReleaseData?.map((item, index) => {
                    return (
                        <div key={index} className='relative backgroundFrameRotate'>
                            <div className='cursor-pointer'>
                                <Image src={frame} alt='' className='h-32 md:h-36 lg:h-44 w-72' />
                            </div>
                            <div key={index} className='absolute top-0 inset-0 m-auto p-2 md:p-1 h-24 w-28 md:h-32 md:w-20 lg:h-32 lg:w-[12rem] rounded-2xl z-50'>
                                <Image src={item.image} alt='' className='h-full rounded-xl object-contain' />
                            </div>
                        </div>
                    )
                })}
                {/* </Slider> */}
            </div>
        </div>
    )
}

export default PopularComics
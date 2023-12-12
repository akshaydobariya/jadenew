import Image from 'next/image';
import React from 'react'
import Slider from 'react-slick'

function Popular(props) {

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
                    slidesToShow: 5,
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
                    slidesToShow: 2,
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
                    <div className='text-2xl md:text-2xl font-semibold heading'>Popular this week</div>
                </div>
                <div className='underline'>See More</div>
            </div>
            <div className='flex md:gap-x-4'>
                <Slider {...settings} className='w-full'>
                    {props?.NewReleaseData?.map((item, index) => {
                        return (
                            <div className='releaseCard'>
                                <div key={index} className='h-40 md:h-52 md:w-[12rem] w-44'>
                                    <Image src={item.image} alt='' className='h-full rounded-md' />
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
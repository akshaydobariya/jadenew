import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick';

function NewRelease(props) {
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
                    <div className='text-2xl md:text-2xl font-semibold heading'>New Release</div>
                </div>
                <div className='underline'>See More</div>
            </div>
            <div className='flex md:gap-x-4'>
                <Slider {...settings} className='w-full'>
                    {props?.NewReleaseData?.map((item, index) => {
                        return (
                            <div className='releaseCard'>
                                <div key={index} className='h-40 md:h-52 md:w-[12rem] w-44 releaseImageParent rounded-md'
                                    style={{ boxShadow: "-2px 4px 6px 0px #c9c1c1" }}>
                                    <Image src={item.image} alt='' className='h-full rounded-md releaseImage' />
                                </div>
                                <div className="details">
                                    <div className="center">
                                        <div className='releaseName text-sm'>{item.name}</div>
                                        <p className='text-[13px]'>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
                                    </div>
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
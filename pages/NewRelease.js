import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import Slider from 'react-slick';

function NewRelease(props) {
    const router = useRouter()

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
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold heading'>New Release</div>
                <div className='underline'>See More</div>
            </div>
            <div className='flex md:gap-x-4'>
                <Slider {...settings} className='w-full'>
                    {props?.NewReleaseData?.map((item, index) => {
                        return (
                            <div key={index} className='releaseCard' onClick={() => router.push('/BookDetail')}>
                                <div key={index} className='h-24 w-20 md:h-44 md:w-44 lg:h-52 lg:w-[12rem] releaseImageParent rounded-md'
                                    style={{ boxShadow: "-2px 4px 6px 0px #c9c1c1" }}>
                                    <Image src={item.image} alt='release' className='h-full rounded-md releaseImage' />
                                </div>
                                <div className="details">
                                    <div className="center">
                                        <div className='releaseName text-[13px]'>{item.name}</div>
                                        <p className='text-[11px] md:text-[13px] text-gray-800 font-semibold'>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
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
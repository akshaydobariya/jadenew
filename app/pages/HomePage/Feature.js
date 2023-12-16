import React from 'react'
import Slider from 'react-slick'
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Feature(props) {
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
        <div className='container'>
            <div className='md:pt-16 pt-10 px-4 md:px-8'>
                <div className='text-start md:pb-5 pb-4'>
                    <div className='text-2xl md:text-2xl font-semibold'>Featured Book</div>
                    <div className='text-sm md:text-base'>Let's read top stories genre!</div>
                </div>
                <div className='flex'>
                    <Slider {...settings} className='w-full'>
                        {props?.CartImage?.map((item, index) => {
                            return (
                                <div key={index} className=''>
                                    <div className='h-24 w-20 md:h-40 md:w-40 lg:h-52 lg:w-48'>
                                        <Image src={item.image} alt='' className='h-full w-full rounded-md object-cover' />
                                    </div>
                                    <div className='pl-1'>
                                        <div className='text-sm md:text-lg font-semibold hidden md:block'>{item.name}</div>
                                        <div className='text-sm md:text-lg font-semibold block md:hidden'>{item.name.slice(0, 9)}..</div>
                                        <div className='text-xs py-1 md:py-2 text-gray-600'>{item.category}</div>
                                        <Rating size='small' name="read-only" value={item.rating} readOnly />
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Feature
import React from 'react'
import Slider from 'react-slick'
import Rating from '@mui/material/Rating';
import Image from 'next/image';

function FeatureBook(props) {
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
                    slidesToShow: 4,
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
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <div className='container'>
            <div className='md:pt-16 pt-10 px-4 md:px-8'>
                <div className='text-start md:pb-5 pb-4'>
                    <div className='text-2xl md:text-3xl font-semibold'>Featured Book</div>
                    <div className='text-sm md:text-xl'>Let's read top stories genre!</div>
                </div>
                <div className='flex'>
                    <Slider {...settings} className='w-full'>
                        {props.CartImage.map((item, index) => {
                            return (
                                <div key={index} className=''>
                                    <div className='h-40 w-44 md:h-56 md:w-56'>
                                        <Image src={item.image} alt='' className='h-full w-full rounded-xl' />
                                    </div>
                                    <div className='pl-1'>
                                        <div className='text-lg font-semibold'>{item.name}</div>
                                        <div className='py-2 text-gray-600'>{item.category}</div>
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

export default FeatureBook
'use client'
import React from 'react'
import Slider from 'react-slick'
import banner7 from '../../../public/assets/Images/Banner/banner-seven.jpg'
import BannerImageTwo from '../../../public/assets/Images/detailPage.jpg'
import Image from 'next/image';

function Banner() {

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    return (
        <div>
            <Slider {...settings}>
                <div className='w-full md:h-96 h-52'>
                    <Image height={1000} width={1000} src={banner7} alt='' className='w-full h-full' />
                </div>
                <div className='w-full md:h-96 h-52'>
                    <Image height={1000} width={1000} src={BannerImageTwo} alt='' className='w-full h-full object-cover' />
                </div>
            </Slider>
        </div>
    )
}

export default Banner
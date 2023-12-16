import Image from 'next/image';
import React from 'react'
import Slider from 'react-slick'

function Originals(props) {
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
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <div className='mx-0'>
            <div className='md:py-10 md:mt-10 py-8 px-4 md:px-16 lg:px-28 bg-gray-800'>
                <div className='text-start pb-5'>
                    <div className='text-2xl md:text-3xl font-semibold text-gray-100'>Originals Work</div>
                </div>
                <div className='flex block lg:hidden'>
                    <Slider {...settings} className='w-full'>
                        {props?.OriginalsImage?.map((item, index) => {
                            return (
                                <div className='' key={index}>
                                    <div className="card cursor-pointer">
                                        <div className="img-container">
                                            <Image src={item.image} alt='' />
                                        </div>
                                        <div className="card-details">
                                            <div className='text-lg py-3 text-black'>{item.name}</div>
                                            <div className='text-sm md:text-base hidden md:block'>Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics.</div>
                                            <div className='text-sm md:text-base block md:hidden'>Iron Man is a fictional superhero appearing in American novel book.</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <div className='hidden lg:block'>
                    <div className='flex'>
                        {props?.OriginalsImage?.map((item, index) => {
                            return (
                                <div className="card cursor-pointer" key={index}>
                                    <div className="img-container">
                                        <Image src={item.image} alt='' />
                                    </div>
                                    <div className="card-details">
                                        <div className='text-lg py-3 text-black font-semibold'>{item.name}</div>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Originals
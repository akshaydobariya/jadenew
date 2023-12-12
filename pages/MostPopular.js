import Image from 'next/image'
import React from 'react'
import Rating from '@mui/material/Rating';
import heroinImg from '../public/assets/Images/Banner/heroin.jpeg'
import Slider from 'react-slick';

function MostPopular(props) {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
        <div className='md:mt-16 mt-10 bg-gray-800 py-10 md:px-8 px-2'>
            <div className='pb-5 flex items-center justify-between text-white'>
                <div className='text-2xl font-semibold'>Most Popular</div>
                <div className='underline'>See More</div>
            </div>

            <div className='flex flex-col md:flex-row'>
                <div className='md:w-[35%]'>
                    <Slider {...settings} className='w-full'>
                        {props?.popular?.map((item, index) => {
                            return (
                                <div className='px-[6px]'>
                                    <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                        <div className='md:h-44 md:w-52 xl:w-56 h-28 w-32  overflow-hidden'>
                                            <Image src={item.image} alt='' className='h-full w-full object-cover popularImageParent' />
                                        </div>
                                        <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                            <div className='hidden md:block text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='text-sm py-1'>{item?.section}</div>
                                            <div className='flex items-center'>
                                                <Rating size='small' name="read-only" value="3.5" readOnly />
                                                <span className='hidden md:block text-xs pl-2'>4.5</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>

                    <Slider {...settings} className='w-full hidden md:block'>
                        {props?.popular?.map((item, index) => {
                            return (
                                <div className='px-[6px]'>
                                    <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                        <div className='md:h-44 md:w-52 h-28 w-32  overflow-hidden'>
                                            <Image src={item.image} alt='' className='h-full w-full object-cover popularImageParent' />
                                        </div>
                                        <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                            <div className='hidden md:block text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='text-sm py-1'>{item?.section}</div>
                                            <div className='flex items-center'>
                                                <Rating size='small' name="read-only" value="3.5" readOnly />
                                                <span className='hidden md:block text-xs pl-2'>4.5</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <div className='border border-gray-600 rounded-md md:w-[30%] w-[100%] flex md:flex-col justify-center items-center md:p-5 md:mx-6 mt-4 mb-5 md:my-0'>
                    <div className='md:w-full md:h-52 w-60 h-32 md:px-9 object-cover pr-3'>
                        <Image src={heroinImg} alt='' className='h-full w-full rounded-l-md md:rounded-none' />
                    </div>

                    <div className='text-white text-start md:pt-4'>
                        <div className='md:text-2xl text-lg font-semibold'>The Heroin Queen</div>
                        <div className='text-gray-400 md:text-base text-sm font-normal py-1'>Eastern</div>
                        <Rating size='small' name="read-only" value="5" readOnly />
                        <div className='text-gray-400 py-1 hidden md:block'>She was a beauty with pretty appearance beyond comparison. Time-traveling to the Alien world thousands of years ago for a few times, she fought against monsters and evils and saved her country ...</div>
                        <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                    </div>
                </div>

                <div className='md:pr-0 md:w-[35%]'>
                    <Slider {...settings} className='w-full'>
                        {props?.popular?.map((item, index) => {
                            return (
                                <div className='px-2'>
                                    <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                        <div className='md:h-44 md:w-52 h-28 w-32 overflow-hidden'>
                                            <Image src={item.image} alt='' className='h-full w-full popularImageParent object-cover' />
                                        </div>
                                        <div className='text-white text-start pt-1 px-1'>
                                            <div className='text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='text-sm py-1'>{item?.section}</div>
                                            <div className='flex items-center'>
                                                <Rating size='small' name="read-only" value="2.5" sx={{}} readOnly />
                                                <span className='hidden md:block text-xs pl-2'>2.5</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>

                    <Slider {...settings} className='w-full hidden md:block'>
                        {props?.popular?.map((item, index) => {
                            return (
                                <div className='px-2'>
                                    <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                        <div className='md:h-44 md:w-52 h-28 w-32  overflow-hidden'>
                                            <Image src={item.image} alt='' className='h-full w-full object-cover popularImageParent' />
                                        </div>
                                        <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                            <div className='hidden md:block text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                            <div className='text-sm py-1'>{item?.section}</div>
                                            <div className='flex items-center'>
                                                <Rating size='small' name="read-only" value="3.5" readOnly />
                                                <span className='hidden md:block text-xs pl-2'>4.5</span>
                                            </div>
                                        </div>
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

export default MostPopular
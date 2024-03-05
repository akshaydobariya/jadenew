'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick'
import React, { useState, useEffect } from 'react'

function Originals(props) {
    const settings = {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    const [doubleClick, setDoubleClick] = useState({ id: '', count: 0 })

    const router = useRouter()

    useEffect(() => {
        doubleClick?.count == 1 && router.push(`/detail/${doubleClick?.id}`)
    }, [doubleClick])

    return (
        <div className='mx-0'>
            <div className='md:py-10 md:mt-10 py-8 px-4 md:px-16 lg:px-28 bg-gray-800 dark:bg-[#131415]'>
                <div className='text-start pb-5 dark:pb-1'>
                    <div className='text-2xl md:text-3xl font-semibold text-gray-100'>Jadescrolls Originals</div>
                </div>
                <div className='flex lg:hidden'>
                    <Slider {...settings} className='w-full'>
                        {props?.origianlWorkData?.data?.map((item, index) => {
                            return (
                                // <Link href={{pathname:`/detail/${item?._id}`}} className='' key={index}>
                                // <div className='' key={index} onClick={() => router.push(`/detail/${item?._id}`)}>
                                <div className='' key={index} onClick={() => {
                                    setDoubleClick({
                                        id: item?._id,
                                        count: doubleClick?.id == item?._id ? doubleClick?.count + 1 : 0,
                                    })
                                }
                                }>
                                    <div className="card cursor-pointer">
                                        <div className="img-container">
                                            <Image src={item.coverImg} alt='' height={300} width={300} />
                                        </div>
                                        <div className="card-details">
                                            <div className='text-lg md:py-3 pb-1 text-black'>{item.title}</div>
                                            <div className='text-sm md:text-base hidden md:block'>Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics.</div>
                                            <div className='text-sm md:text-base block md:hidden'>Iron Man is a fictional superhero appearing American.</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <div className='hidden lg:block'>
                    <div className='flex'>
                        {props?.origianlWorkData?.data?.slice(0, 4)?.map((item, index) => {
                            return (
                                <div className="card cursor-pointer" key={index} onClick={() => router.push(`/detail/${item?._id}`)}>
                                    <div className="img-container">
                                        <Image src={item.coverImg} alt='' height={600} width={600} />1
                                    </div>
                                    <div className="card-details">
                                        <div className='text-lg py-3 text-black font-semibold'>{item.title}</div>
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
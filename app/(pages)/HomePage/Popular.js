import Image from 'next/image';
import React from 'react'
import Slider from 'react-slick'
import NewRelaseOne from '../../../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseTwo.jpeg'
import NewRelaseThree from '../../../public/assets/Images/NewRelease/newReleaseThree.jpeg'

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
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
        ],
    };


    const featuredBookData = [
        {
            image: NewRelaseOne,
            name: "Ordinary Days",
            category: "Wuxi&Xiang",
            rating: "3",
        },
        {
            image: NewRelaseTwo,
            name: "The Master of Names",
            category: "Wuxi&Xiang",
            rating: "3.5",
        },
        {
            image: NewRelaseThree,
            name: "Rise of A Supervillian",
            category: "Urban",
            rating: "5",
        },
    ]

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold heading'>Popular this week</div>
                <div className='underline'>See More</div>
            </div>
            {/* <div className='flex md:gap-x-4'>
                <Slider {...settings} className='w-full'>
                    {props?.NewReleaseData?.map((item, index) => {
                        return (
                            <div key={index} className={(index % 2 == 0) ? 'releaseCard backgroundFrame': 'releaseCard backgroundFrameOdd' }>
                                <div key={index} className='h-28 md:h-40 md:w-36 w-24 p-4 md:p-3'>
                                    <Image src={item.image} alt='' className='h-full rounded-sm' />
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div> */}
            <div className='grid grid-cols-3'>
                {featuredBookData?.map((data, index) => {
                    return (
                        <div className='flex items-center group'>
                            <div className='h-56 w-44 group-hover:shadow-[4px_5px_6px_5px_#f3c9d9] group-hover:z-10'>
                                <Image src={data?.image} alt='popular image' className='h-full w-full rounded-md' />
                            </div>
                            <div className='group-hover:border-2 group-hover:border-[#CD3D73] overflow-hidden pl-5 border rounded-r-md bg-gray-300 h-36 w-1/2 flex flex-col justify-center'>
                                <div className='underline text-sm'>{data?.category}</div>
                                <div className='py-1 font-semibold'>{data?.name}</div>
                                <div className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Popular
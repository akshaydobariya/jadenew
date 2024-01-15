'use client'
import Image from 'next/image';
import Slider from 'react-slick'

function Popular(props) {

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
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
                    autoplay: false,
                },
            },
        ],
    };

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8 pb-7'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold'>Popular this week</div>
                <div className='underline'>See More</div>
            </div>

            <div className=''>
                <Slider {...settings} className='w-full'>
                    {props?.popularData?.data?.map((data, index) => {
                        return (
                            <div className='poularWeekCard flex items-center group py-2'>
                                <div className='border-2 rounded-md md:h-56 md:w-44 h-28 w-20 group-hover:shadow-[4px_5px_4px_2px_#f9e2eb] group-hover:z-10'>
                                    <Image src={data?.coverImg} height={100} width={100} alt='popular image' className='object-scale-down h-full w-full rounded-md' />
                                </div>
                                <div className='text-xs md:text-sm group-hover:border-2 group-hover:border-[#CD3D73] overflow-hidden pl-1 md:pl-5 border rounded-r-md dark:bg-gray-900 bg-gray-300 h-[4.5rem] md:h-36 w-1/2 flex flex-col justify-center'>
                                    <div className='underline'>{data?.genre}</div>
                                    <div className='py-1 font-semibold md:text-base'>{data?.title}</div>
                                    <div className='hidden md:block'>{data?.description?.length > 40 ? data?.description?.slice(0, 40) : data?.description}</div>
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
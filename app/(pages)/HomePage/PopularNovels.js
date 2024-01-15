'use client'
import Image from 'next/image'
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import flagIcon from '../../../public/assets/Images/favorite.png'
import Link from 'next/link';

function PopularNovels(props) {
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
        // <div className='md:pt-10 pt-10 px-4 md:px-8'>
        //     <div className='flex justify-between items-center'>
        //         <div className='text-start pb-5'>
        //             <div className='text-2xl md:text-2xl font-semibold heading'>Most Popular Novels</div>
        //             {/* <div className='text-base'>Let's read top stories genre!</div> */}
        //         </div>
        //         <div className='underline'>See More</div>
        //     </div>
        //     <div className='grid md:grid-cols-6 grid-cols-3 md:gap-x-4'>
        //         {/* <Slider {...settings} className='w-full'> */}
        //         {props?.NewReleaseData?.map((item, index) => {
        //             return (
        //                 <div key={index} className='relative '>
        //                     <div className='cursor-pointer backgroundFrameRotate'>
        //                         <Image src={frame} alt='' className='h-32 md:h-36 lg:h-44 w-72' />
        //                     </div>
        //                     <div key={index} className='absolute top-0 inset-0 m-auto p-2 md:p-3 h-24 w-28 md:h-32 md:w-20 lg:h-32 lg:w-[12rem] rounded-2xl z-50'>
        //                         <Image src={item.image} alt='' className='h-full rounded-xl object-contain' />
        //                     </div>
        //                 </div>
        //             )
        //         })}
        //         {/* </Slider> */}
        //     </div>
        // </div>
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold heading'>Most Popular Novels</div>
                <div onClick={() => router.push('/novel-list')} className='underline cursor-pointer'>See More</div>
            </div>
            <div className='flex md:gap-x-4'>
                <Slider {...settings} className='w-full'>
                    {props?.popularNovelsData?.data?.map((item, index) => {
                        return (
                            <Link href={`/detail/${item?._id}`} key={index} className='relative hover:transition hover:scale-110 hover:duration-300 hover:ease-in-out cursor-pointer'>
                                <div className='h-24 w-20 md:h-44 md:w-44 lg:h-52 lg:w-[12rem] releaseImageParent rounded-md'
                                    style={{ boxShadow: "-2px 4px 6px 0px #545050" }}>
                                    <Image height={300} width={300} src={item?.coverImg} alt='release' className='h-full w-full rounded-md releaseImage' />
                                </div>
                                <div className=''>
                                    <Image src={flagIcon} className='-rotate-90 w-9 h-[4rem] absolute -top-1 left-3' />
                                    <div className='absolute top-5 left-1 text-white text-[10px] font-semibold'>{item?.novelStatus}</div>
                                </div>
                            </Link>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default PopularNovels
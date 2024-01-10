import useApiService from '@/services/ApiService';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import NewRelaseOne from '../../../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import Link from 'next/link';

function NewRelease(props) {
    const router = useRouter()
    const { getNovels } = useApiService()
    const [newRelaseData, setNewRelaseData] = useState([])

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
                    autoplay: false,
                },
            },
        ],
    };

    useEffect(() => {
        getNovels().then((res) => {
            setNewRelaseData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "er");
        })
    }, [])

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-semibold heading'>New Release</div>
                {newRelaseData.length > 6 && <div onClick={() => router.push('/novel-list')} className='underline cursor-pointer'>See More</div>}
            </div>
            <div className='md:gap-x-4 md:flex'>
                {/* <Slider {...settings} className='w-full'>
                    {props?.NewReleaseData?.map((item, index) => {
                        return (
                            <div onClick={() => router.push('/detail')} key={index} className='releaseCard cursor-pointer'>
                                <div key={index} className='h-24 w-20 md:h-44 md:w-44 lg:h-52 lg:w-[12rem] releaseImageParent rounded-md'
                                    style={{ boxShadow: "-2px 4px 6px 0px #c9c1c1" }}>
                                    <Image src={item.image} alt='release' className='h-full rounded-md releaseImage' />
                                </div>
                                <div className="details">
                                    <div className="center">
                                        <div className='releaseName text-[13px]'>{item.name}</div>
                                        <p className='hidden md:block text-[11px] md:text-[13px] text-gray-800 font-semibold'>Lorem ipsum is simple dummy text on the printing and typesetting industry.</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider> */}

                <Slider {...settings} className='w-full'>
                    {newRelaseData?.map((item, index) => {
                        return (
                            <Link key={index} className="NewReleaseCard cursor-pointer" href={`/detail/${item?._id}`}>
                                <Image src={item?.coverImg} height={100} width={100} alt='' className='releaseImage' />
                                <div className="info">
                                    <h1 className='font-semibold'>{item?.title !== null && item?.title}</h1>
                                    <p>{item?.description !== null && item?.description.length > 20 ? item?.description.slice(0, 20) : item?.description}</p>
                                    <div className='text-sm'>Mountain</div>
                                </div>
                            </Link>
                        )
                    })}
                </Slider>
            </div>

            {/* <div className='flex gap-2 md:hidden block'>
                <div class="NewReleaseCard">
                    <Image src={props?.NewReleaseData[0]?.image} alt='' className='releaseImage' />
                    <div class="info">
                        <h1 className='font-semibold'>{props?.NewReleaseData[0]?.name}</h1>
                        <p>Lorem Ipsum is simply dummy</p>
                    </div>
                    <div>Mountain</div>
                </div>

                <div class="NewReleaseCard">
                    <Image src={props?.NewReleaseData[1]?.image} alt='' className='releaseImage' />
                    <div class="info">
                        <h1 className='font-semibold'>{props?.NewReleaseData[0]?.name}</h1>
                        <p>Lorem Ipsum is simply dummy</p>
                    </div>
                    <div className=''>Mountain</div>
                </div>

                <div class="NewReleaseCard">
                    <Image src={props?.NewReleaseData[2]?.image} alt='' className='releaseImage' />
                    <div class="info">
                        <h1 className='font-semibold'>{props?.NewReleaseData[0]?.name}</h1>
                        <p>Lorem Ipsum is simply dummy</p>
                    </div>
                    <div>Mountain</div>
                </div>
            </div> */}
        </div>
    )
}

export default NewRelease
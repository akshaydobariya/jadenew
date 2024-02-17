'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import Horror from '../../../public/assets/Images/Horro&Thriller.jpeg'
import { useRouter } from 'next/navigation';
import useApiService from '@/services/ApiService';
import Slider from 'react-slick';
import Link from 'next/link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #FFFF',
    boxShadow: 24,
};

function NovelByGenre(props) {
    const router = useRouter()
    const [showCard, setShowCard] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectId, setSelectId] = useState(0);
    const [novelByGenreData, setNovelByGenreData] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { getNovelByGenre, getNovelByid } = useApiService()
    const [novelById, setNovelById] = useState([])

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 5,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: false,
                },
            },
        ],
    };

    useEffect(() => {
        getNovelByGenre().then((res) => {
            if (res.status == 200) {
                setNovelByGenreData(res?.data?.data)
                novelDetail(res?.data?.data[0]?.name)
                console.log(res?.data?.data[0]?.name, "res?.data?.data[0]?.name")
            }
        }).catch((er) => {
            console.log(er, "error novel by genre");
        })
    }, [])

    const novelDetail = (id) => {
        getNovelByid(id).then((res) => {
            if (res.status == 200) {
                setNovelById(res?.data?.data?.data)
            }
        }).catch((er) => {
            console.log(er, "er");
        })
    }

    return (
        <div className='md:pt-10 pt-10 md:px-8 px-4 w-[100%]'>
            <div className='text-2xl md:text-2xl font-semibold pb-4 md:pb-6'>Novels By Genre</div>

            <div className='p-2'>
                <Slider {...settings} className='w-[66%]'>
                    {props?.novelByGenreData?.data?.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    novelDetail(item?.name)
                                    setSelectId(index)
                                }}
                                className={selectId == index ? 'border-2 border-[#20A7FE] rounded-md bg-gray-200 mt-2 relative h-20 md:h-20 lg:h-28 cursor-pointer widthNovelGenreCard' :
                                    'relative h-20 md:h-20 lg:h-28 rounded cursor-pointer widthNovelGenreCard'}
                                style={{ boxShadow: "1px 6px 11px 0px #c9c1c1" }}>
                                <Image src={Horror} alt='' className='h-full w-full object-cover rounded' width={200} />
                                <div className='gradientClass absolute bottom-0 w-full text-white font-semibold flex justify-center rounded-[3px]'>{item.name}</div>
                            </div>
                        )
                    })}
                </Slider>
            </div>

            <div className='mt-3 md:p-5 p-2 bg-gray-800 dark:bg-[#131415] text-white  rounded-xl w-[66%]'>
                <div className='flex justify-between'>
                    <div className='font-semibold'>{novelById[0]?.genre}</div>
                    {novelById?.length > 7 && <div className='cursor-pointer text-sm underline'>See More</div>}
                </div>

                {novelById.length == 0 ? <div className='text-center w-full text-gray-200 py-2'>No data found</div> :
                    <div className='grid md:grid-cols-5 grid-cols-3 gap-1'>
                        {novelById?.map((item, index) => {
                            return (
                                <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className='mt-4'>
                                    <div className='h-24 w-24 md:h-28 md:w-32'>
                                        <Image src={item.coverImg} alt='' className='h-full w-full rounded-md object-cover' height={100} width={200} />
                                    </div>
                                    <div className='pl-1 pt-1'>
                                        <div className='text-sm font-semibold'>{item?.title}</div>
                                        <div className='py-[1px] text-sm text-gray-600'>{item?.genre}</div>
                                        <Rating size='small' name="read-only" value="4" readOnly />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default NovelByGenre
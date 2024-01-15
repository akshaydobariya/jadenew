'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import fantasy from '../../../public/assets/Images/fantasy.jpeg'
import Historical from '../../../public/assets/Images/Historical.jpeg'
import Horror from '../../../public/assets/Images/Horro&Thriller.jpeg'
import Romance from '../../../public/assets/Images/Romance.jpeg'
import NovelGenreWuxi from '../../../public/assets/Images/Wuxi&Xiang.jpeg'
import NovelGenre from '../../../public/assets/Images/fantasy.jpeg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';
import useApiService from '@/services/ApiService';
import Slider from 'react-slick';

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
    const [open, setOpen] = React.useState(false);
    const [selectId, setSelectId] = React.useState(0);
    const [novelByGenreData, setNovelByGenreData] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { getNovelByGenre, getNovelByid } = useApiService()
    const [novelById, setNovelById] = useState([])

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
                novelDetail(res?.data?.data[2]?.name)
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
        <div className='md:pt-10 pt-10 md:px-8 px-4 w-[80%]'>
            <div className='text-2xl md:text-2xl font-semibold pb-4 md:pb-6'>Novels By Genre</div>

            <div className=''>
                <Slider {...settings} className='w-full'>
                    {props?.novelByGenreData?.data?.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    novelDetail(item?.name)
                                    setSelectId(index)
                                }}
                                className={selectId == index ? 'border-2 border-[#DC2A74] rounded-md bg-gray-200 mt-2 relative h-20 w-44 md:h-20 md:w-32 lg:h-28 lg:w-[13rem] cursor-pointer' :
                                    'relative h-20 w-44 md:h-20 md:w-32 lg:h-28 lg:w-[13rem] rounded cursor-pointer'}
                                style={{ boxShadow: "1px 6px 11px 0px #c9c1c1" }}>
                                <Image src={Horror} alt='' className='h-full w-full object-cover rounded' width={200} />
                                <div className='gradientClass absolute bottom-0 w-full text-white font-semibold flex justify-center'>{item.name}</div>
                            </div>
                        )
                    })}
                </Slider>
            </div>

            <div className='mt-3 md:p-5 p-2 bg-gray-800 dark:bg-gray-900 text-white  rounded-xl'>
                <div className='flex justify-between'>
                    <div className='font-semibold'>Fantasy</div>
                    <div className='cursor-pointer text-sm underline'>See More</div>
                </div>

                {novelById.length == 0 ? <div className='text-center w-full text-gray-200 py-2'>No data found</div> :
                    <div className='grid md:grid-cols-7 grid-cols-3 gap-1'>
                        {novelById?.map((item, index) => {
                            return (
                                <div key={index} className='mt-4'>
                                    <div className='h-24 w-24 md:h-28 md:w-32'>
                                        <Image src={item.coverImg} alt='' className='h-full w-full rounded-md object-cover' height={100} width={200} />
                                    </div>
                                    <div className='pl-1 pt-1'>
                                        <div className='text-sm font-semibold'>{item?.title}</div>
                                        <div className='py-[1px] text-sm text-gray-600'>{item?.genre}</div>
                                        <Rating size='small' name="read-only" value="4" readOnly />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default NovelByGenre
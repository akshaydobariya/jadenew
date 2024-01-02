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

    const OriginalsImage = [
        {
            image: NovelGenreWuxi,
            name: "Cold-blooded Undercover Master",
            category: "Games",
            rating: "4",
        },
        {
            image: Historical,
            name: "Cold-blooded Master",
            category: "Historical",
            rating: "4",
        },
        {
            image: Romance,
            name: "Return of Ultra",
            category: "Romance",
            rating: "5",
        },
        {
            image: Horror,
            name: "Reborn:Femme Fatels First",
            category: "Horro&Thriller",
            rating: "3.5",
        },
        {
            image: fantasy,
            name: "Down of the Gods",
            category: "Fantasy",
            rating: "3",
        },
    ]
    const OriginalsImageTwo = [
        {
            image: NovelGenreWuxi,
            name: "Cold-blooded Undercover Master",
            category: "Games",
            rating: "4",
        },
        {
            image: Historical,
            name: "Cold-blooded Master",
            category: "Historical",
            rating: "4",
        },
        {
            image: Romance,
            name: "Return of Ultra",
            category: "Romance",
            rating: "5",
        },
        {
            image: Horror,
            name: "Reborn:Femme Fatels First",
            category: "Horro&Thriller",
            rating: "3.5",
        },
        {
            image: fantasy,
            name: "Down of the Gods",
            category: "Fantasy",
            rating: "3",
        },
    ]

    useEffect(() => {
        getNovelByGenre().then((res) => {
            if (res.status == 200) {
                console.log(res, "res novel by genre");
                setNovelByGenreData(res?.data?.data)
            }
        }).catch((er) => {
            console.log(er, "error novel by genre");
        })
    }, [])

    const novelDetail = (id) => {
        getNovelByid(id).then((res) => {
            console.log(res, "res");
        }).catch((er) => {
            console.log(er, "er");
        })
    }

    return (
        <div className='md:pt-10 pt-10 md:px-8 px-4'>
            <div className='text-2xl md:text-2xl font-semibold pb-4 md:pb-6'>Novels By Genre</div>

            <div className='grid grid-cols-2 md:grid-cols-6 md:gap-24 lg:gap-12 gap-2'>
                {novelByGenreData?.splice(0, 5)?.map((item, index) => {
                    return (
                        <div key={index}
                            onClick={() => {
                                setShowCard(true)
                                novelDetail(item?.name)
                                setSelectId(index)
                            }}
                            className={selectId == index ? 'border-2 border-[#DC2A74] rounded-md bg-gray-200 mt-2 relative h-20 w-44 md:h-20 md:w-32 lg:h-28 lg:w-[13rem] cursor-pointer' :
                                'relative h-20 w-44 md:h-20 md:w-32 lg:h-28 lg:w-[13rem] rounded cursor-pointer'} style={{ boxShadow: "1px 6px 11px 0px #c9c1c1" }}>
                            <Image src={Horror} alt='' className='h-full w-full object-cover rounded' width={200} />
                            <div className='gradientClass absolute bottom-0 w-full text-white font-semibold flex justify-center'>{item.name}</div>
                        </div>
                    )
                })}
            </div>

            {/* {showCard && */}
            <div className='mt-3 md:p-5 p-2 bg-gray-800 text-white w-[86%] rounded-xl'>
                <div className='flex justify-between'>
                    <div className='font-semibold'>Fantasy</div>
                    <div className='cursor-pointer text-sm underline'>See More</div>
                </div>
                <div className='grid md:grid-cols-7 grid-cols-3 gap-1'>
                    {OriginalsImage?.map((item, index) => {
                        return (
                            <div key={index} className='mt-4'>
                                <div className='h-24 w-24 md:h-28 md:w-32'>
                                    <Image src={item.image} alt='' className='h-full w-full rounded-md object-cover' width={200} />
                                </div>
                                <div className='pl-1 pt-1'>
                                    <div className='text-sm font-semibold'>{item.name.slice(0, 13)}</div>
                                    <div className='py-[1px] text-sm text-gray-600'>{item.category}</div>
                                    <Rating size='small' name="read-only" value={item.rating} readOnly />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* } */}
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="md:w-[800px] w-[350px] md:p-4 p-2 border-none">
                    <div className='rounded-xl border-none'>
                        <div className='text-end'><CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} /></div>
                        <div className='grid md:grid-cols-5 grid-cols-3 gap-3'>
                            {OriginalsImage?.map((item, index) => {
                                return (
                                    <div key={index} className='mt-4'>
                                        <div className='h-24 w-20 md:h-28 md:w-32'>
                                            <Image src={item.image} alt='' className='h-full w-full rounded-md object-cover' />
                                        </div>
                                        <div className='pl-1'>
                                            <div className='text-sm font-semibold'>{item.name.slice(0, 13)}</div>
                                            <div className='py-[2px] text-sm text-gray-600'>{item.category}</div>
                                            <Rating size='small' name="read-only" value={item.rating} readOnly />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='text-end text-sm underline pt-2 cursor-pointer' onClick={() => router.push('/novel-list')}>See More</div>
                    </div>
                </Box>
            </Modal> */}
        </div>
    )
}

export default NovelByGenre
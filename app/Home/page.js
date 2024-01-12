'use client'
import banner7 from '../../public/assets/Images/Banner/banner-seven.jpg'
import BannerImageTwo from '../../public/assets/Images/detailPage.jpg'
import Image from 'next/image'
import NewRelease from '../(pages)/HomePage/NewRelease'
import { useState } from 'react'
import Slider from 'react-slick'
import { Box, Modal } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import becomeAuthorImg from '../../public/assets/Images/BecomeAuthorCoverImg.jpg'
import PopularNovels from '../(pages)/HomePage/PopularNovels'
import NovelByGenre from '../(pages)/HomePage/NovelByGenre'
import FeaturedBook from '../(pages)/HomePage/FeaturedBook'
import Popular from '../(pages)/HomePage/Popular'
import Originals from '../(pages)/HomePage/Originals'
import LatestUpdate from '../(pages)/latest-update/page'
import Ranking from '../(pages)/HomePage/Ranking'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function HomePage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [announcmentTab, setAnnouncmentTab] = useState('All')

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <div className='bg-white pb-10 pt-[66px]'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px]' >
                    <div className='flex justify-between text-center cursor-pointer'>
                        <div onClick={() => setAnnouncmentTab("All")} className={announcmentTab === "All" ? 'border w-full p-2 bg-black text-white' :
                            'border w-full p-2 border-black'}>All</div>
                        <div onClick={() => setAnnouncmentTab("offer")} className={announcmentTab === "All" ? 'border w-full p-2 border-black' :
                            'border w-full p-2 bg-black text-white'}>Offer</div>
                    </div>
                    <ul className='list-disc px-2 pt-2'>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                    </ul>
                </Box>
            </Modal>
            <div>
                <NotificationsIcon onClick={() => setOpen(true)} className='h-12 w-12 fixed bottom-12 right-7 z-10 cursor-pointer border rounded-full bg-gray-200' />
            </div>

            <Slider {...settings}>
                <div className='w-full md:h-96 h-52'>
                    <Image height={100} width={100} src={banner7} alt='' className='w-full h-full' />
                </div>
                <div className='w-full md:h-96 h-52'>
                    <Image height={100} width={100} src={BannerImageTwo} alt='' className='w-full h-full object-cover' />
                </div>
            </Slider>

            <section>
                <NewRelease />
            </section>

            <section>
                <div className='relative mt-8'>
                    <div className='md:h-44 h-56 authorGradient'>
                        <Image height={100} width={100} className='h-full w-full object-cover opacity-90' src={becomeAuthorImg} alt='become a author' />
                    </div>
                    <div className='text-white absolute top-10'>
                        <div className='flex flex-col items-center font-semibold'>
                            <div className='text-[16px] text-center md:px-20 px-2 hidden md:block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>
                            <div className='text-[16px] text-center md:px-20 px-2 block md:hidden'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                            <div className='flex justify-end'>
                                <button className='border-2 mt-4 px-10 py-2 text-white slideBtn sliderRight'>Become a Author</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <PopularNovels />
            </section>

            <section className='hidden md:block'>
                <NovelByGenre />
            </section>

            <section>
                <FeaturedBook />
            </section>

            <section>
                <Popular />
            </section>

            <section>
                <Originals />
            </section>

            <section>
                <LatestUpdate />
            </section>

            <section>
                <Ranking />
            </section>
        </div>
    )
}

export default HomePage
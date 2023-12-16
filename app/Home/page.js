'use client'
import banner1 from '../public/assets/Images/Banner/banner-one.jpg'
import banner2 from '../public/assets/Images/Banner/banner-two.jpg'
import banner3 from '../public/assets/Images/Banner/banner-three.jpg'
import banner4 from '../public/assets/Images/Banner/banner-four.jpg'
import banner5 from '../public/assets/Images/Banner/banner-five.jpg'
import Image from 'next/image'
import ImageOne from '../public/assets/Images/latesUpdate/ImageOne.jpeg'
import ImageTwo from '../public/assets/Images/latesUpdate/ImageTwo.jpeg'
import ImageThree from '../public/assets/Images/latesUpdate/ImageThree.jpeg'
import ImageFour from '../public/assets/Images/latesUpdate/ImageFour.jpeg'
import ImageFive from '../public/assets/Images/latesUpdate/ImageFive.jpeg'
import ImageSix from '../public/assets/Images/latesUpdate/ImageSix.jpeg'

import originalsOne from '../public/assets/Images/originals/ImageOne.jpg'
import originalsTwo from '../public/assets/Images/originals/ImageTwo.jpg'
import originalsThree from '../public/assets/Images/originals/ImageThree.jpg'
import originalsFour from '../public/assets/Images/originals/ImageFour.jpg'
import originalsFive from '../public/assets/Images/originals/ImageFive.jpg'
import Slider from 'react-slick'
import Originals from '../app/pages/HomePage/Originals'
import FeatureBook from './FeatureBook'
import OriginByGenre from '../app/pages/HomePage/OriginByGenre'
import LatestUpdate from './LatestUpdate'
import MostPopular from '../app/pages/HomePage/MostPopular'
import NewRelease from '../app/pages/HomePage/NewRelease'
import Popular from '@/pages/Popular'

import NewRelaseOne from '../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import NewRelaseTwo from '../public/assets/Images/NewRelease/newReleaseTwo.jpeg'
import NewRelaseThree from '../public/assets/Images/NewRelease/newReleaseThree.jpeg'
import NewRelaseFour from '../public/assets/Images/NewRelease/newReleaseFour.jpeg'
import NewRelaseFive from '../public/assets/Images/NewRelease/newReleaseFive.jpeg'
import NewRelaseSix from '../public/assets/Images/NewRelease/newReleaseSix.jpeg'

import popularComicOne from '../public/assets/Images/PopularComics/comicsOne.jpg'
import popularComicTwo from '../public/assets/Images/PopularComics/comicsTwo.jpg'
import popularComicThree from '../public/assets/Images/PopularComics/comicsThree.png'
import popularComicFour from '../public/assets/Images/PopularComics/comicsFour.png'
import popularComicFive from '../public/assets/Images/PopularComics/comicsFive.jpg'
import popularComicSix from '../public/assets/Images/PopularComics/comicsSix.png'
import PopularComics from '@/pages/PopularComics'

import fantasy from '../public/assets/Images/fantasy.jpeg'
import Historical from '../public/assets/Images/Historical.jpeg'
import Horror from '../public/assets/Images/Horro&Thriller.jpeg'
import Romance from '../public/assets/Images/Romance.jpeg'
import NovelGenreWuxi from '../public/assets/Images/Wuxi&Xiang.jpeg'
import NovelGenre from '../public/assets/Images/fantasy.jpeg'

import zscrollBanner from '../public/assets/Images/Banner/zscrollOne.png'
import zscrollBannerOne from '../public/assets/Images/Banner/zscrollFive.png'
import zscrollBannerTwo from '../public/assets/Images/Banner/zscrollthree.jpg'
import zscrollBannerThree from '../public/assets/Images/Banner/zscrollfour.jpg'
import BellIcon from '../public/assets/icon/notification.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

const BannerImage = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    // { image: banner4 },
    // { image: banner5 },
]

const NewReleaseData = [
    {
        image: banner1,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: banner4,
        name: "Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: banner3,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: banner4,
        name: "Cold-blooded Master",
        category: "Games",
        rating: "4",
    },
    {
        image: banner5,
        name: "Cold-blooded Master",
        category: "Games",
        rating: "4",
    },
    {
        image: banner1,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },

]

const PopularComic = [
    {
        image: popularComicOne,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: popularComicTwo,
        name: "Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: popularComicThree,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: popularComicFour,
        name: "Cold-blooded Master",
        category: "Games",
        rating: "4",
    },
    {
        image: popularComicFive,
        name: "Cold-blooded Master",
        category: "Games",
        rating: "4",
    },
    {
        image: popularComicSix,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },

]

const CartImage = [
    {
        image: banner1,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: banner2,
        name: "Reborn:Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: banner3,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: banner4,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    {
        image: banner5,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    {
        image: banner3,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
]

const popular = [
    {
        image: banner1,
        name: "Dragon Prince Yuan",
        section: "Fantasy"
    },
    {
        image: banner2,
        name: "Immortal Martial God",
        section: "Fantasy"
    },
    {
        image: banner3,
        name: "Medical Princess",
        section: "Eastern"
    },
    {
        image: banner4,
        name: "Immortal and Martial Supreme Master",
        section: "Fantasy"
    },
    // {
    //     image: banner5,
    //     name: "Reborn to Be A Noble Wife",
    //     section: "Romance"
    // },
    // {
    //     image: banner3,
    //     name: "Talisman Emperor",
    //     section: "Fantasy"
    // },
    // {
    //     image: banner4,
    //     name: "I Have X-ray Vision: Nude Beauties Love Me",
    //     section: "Urban"
    // },
    // {
    //     image: banner5,
    //     name: "Supreme Martial Artist",
    //     section: "Fantasy"
    // },
]

const latestUpdate = [
    {
        image: ImageOne,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: ImageTwo,
        name: "Reborn:Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: ImageThree,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: ImageFour,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    {
        image: ImageFive,
        name: "Reborn: Revenge of the Councubine's",
        category: "Romance",
        rating: "4",
    },
    {
        image: ImageSix,
        name: "The Doctor",
        category: "Urban",
        rating: "4.5",
    },
]

const OriginalWork = [
    {
        image: originalsOne,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: originalsTwo,
        name: "Reborn:Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: originalsThree,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: originalsFour,
        name: "Cold-blooded Master",
        category: "Games",
        rating: "4",
    },
    // {
    //     image: originalsFive,
    //     name: "Cold-blooded Undercover Master",
    //     category: "Games",
    //     rating: "4",
    // },
    // {
    //     image: originalsTwo,
    //     name: "Reborn:Femme Fatels First",
    //     category: "Wuxi&Xiang",
    //     rating: "3.5",
    // },
    // {
    //     image: originalsThree,
    //     name: "Return of Ultra",
    //     category: "Urban",
    //     rating: "5",
    // },
]

const OriginalsImage = [
    {
        image: fantasy,
        name: "Down of the Gods",
        category: "Fantasy",
        rating: "3",
    },
    {
        image: Horror,
        name: "Reborn:Femme Fatels First",
        category: "Horro&Thriller",
        rating: "3.5",
    },
    {
        image: Romance,
        name: "Return of Ultra",
        category: "Romance",
        rating: "5",
    },
    {
        image: Historical,
        name: "Cold-blooded Master",
        category: "Historical",
        rating: "4",
    },
    {
        image: NovelGenreWuxi,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    // {
    //     image: NovelGenre,
    //     name: "Reborn:Femme Fatels First",
    //     category: "Wuxi&Xiang",
    //     rating: "3.5",
    // },

    // {
    //     image: originalsThree,
    //     name: "Return of Ultra",
    //     category: "Urban",
    //     rating: "5",
    // },
    // {
    //     image: originalsFour,
    //     name: "Cold-blooded Master",
    //     category: "Games",
    //     rating: "4",
    // },
    // {
    //     image: originalsFive,
    //     name: "Cold-blooded Undercover Master",
    //     category: "Games",
    //     rating: "4",
    // },
]

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
    {
        image: NewRelaseFour,
        name: "Angelita",
        category: "Games",
        rating: "4",
    },
    {
        image: NewRelaseFive,
        name: "Lose Heart",
        category: "Games",
        rating: "4",
    },
    {
        image: NewRelaseSix,
        name: "God of War",
        category: "Urban",
        rating: "5",
    },
]

function HomePage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [announcmentTab, setAnnouncmentTab] = useState('All')

    return (
        <div className='bg-white pt-[65px] pb-10'>
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
                <Image onClick={handleOpen} src={BellIcon} className='h-12 w-12 fixed bottom-12 right-7 z-10 cursor-pointer' />
            </div>
            <div className='relative overflow-hidden'>
                <div className='w-full md:h-[530px] h-[330px]'>
                    <Image src={zscrollBanner} alt='' className='w-full h-full' />
                </div>
                <div className='absolute md:top-20 top-14 inset-x-0 m-auto w-[60%]'>
                    <div className='grid grid-cols-2 gap-3'>
                        <Image src={banner4} alt='' className='rounded-xl md:h-48 md:w-full object-cover' />
                        <Image src={banner4} alt='' className='rounded-xl md:h-48 md:w-full object-cover' />
                        <Image src={banner4} alt='' className='rounded-xl md:h-48 md:w-full object-cover' />
                        <Image src={banner4} alt='' className='rounded-xl md:h-48 md:w-full object-cover' />
                    </div>
                </div>
            </div>

            <section>
                <NewRelease NewReleaseData={PopularComic} />
            </section>

            <section>
                <div className='my-3 text-white bg-gray-800 py-10 mt-10'>
                    <div className='flex flex-col items-center'>
                        <div className='text-[14px] text-center md:px-20 px-2 hidden md:block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>
                        <div className='text-[14px] text-center md:px-20 px-2 block md:hidden'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                        <div className='flex justify-end'>
                            <button className='border mt-4 px-10 py-2 text-white slideBtn sliderRight'>Become a Author</button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <PopularComics NewReleaseData={NewReleaseData} />
            </section>

            <section>
                <OriginByGenre OriginalsImage={OriginalsImage} />
            </section>

            <section>
                <MostPopular popular={popular} />
            </section>

            <section>
                <FeatureBook CartImage={featuredBookData} />
            </section>

            <section>
                <Originals OriginalsImage={OriginalWork} />
            </section>

            <section>
                <Popular NewReleaseData={NewReleaseData} />
            </section>

            <section>
                <LatestUpdate latestUpdate={latestUpdate} />
            </section>

        </div>
    )
}

export default HomePage
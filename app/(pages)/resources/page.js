import React from 'react'
import popularComicOne from '../../../public/assets/Images/PopularComics/comicsOne.jpg'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import popularComicThree from '../../../public/assets/Images/PopularComics/comicsThree.png'
import popularComicFour from '../../../public/assets/Images/PopularComics/comicsFour.png'
import popularComicFive from '../../../public/assets/Images/PopularComics/comicsFive.jpg'
import popularComicSix from '../../../public/assets/Images/PopularComics/comicsSix.png'
import Image from 'next/image'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function page() {

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
            name: "Cold-blooded",
            category: "Games",
            rating: "4",
        },
        {
            image: popularComicFive,
            name: "Cold-blooded",
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

    return (
        <div className='pt-20 m-2 md:px-52 px-2'>
            <div className='text-3xl pb-3 text-center'>Books</div>
            <div className='grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-2'>
                {PopularComic?.map((item, index) => {
                    return (
                        <div key={index} className='bg-gray-100 dark:bg-gray-900 rounded-lg p-2 border-2 border-pink-600' style={{ boxShadow: "#464646 0px 0px 6px 3px" }}>
                            <div className='h-36 md:h-56 w-full object-contain'>
                                <Image src={item?.image} alt='' className='h-full w-full rounded-t-lg' />
                            </div>
                            <div className='p-1'>
                                <div className='font-semibold text-gray-800 dark:text-gray-100'>{item?.name}</div>
                                <div className='pt-1 text-gray-800 dark:text-gray-400'><span className='font-semibold'>Author:</span> Lee Hyeondo</div>
                                <div className='flex gap-4 pt-1'>
                                    <div className='flex items-center'>
                                        <span><ThumbUpOffAltIcon /></span>
                                        <span className='pl-[2px]'>100%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span><RemoveRedEyeOutlinedIcon /></span>
                                        <span className='pl-[2px]'>10</span>
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <button className='border w-full rounded-full py-1 bg-blue-500 text-white'>Buy Now $20.00</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default page
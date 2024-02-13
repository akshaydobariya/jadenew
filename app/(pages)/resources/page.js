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
import Link from 'next/link'

async function page() {

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

    const baseUrl = 'https://zscroll.peclick.com/api/'
    const resResource = await fetch(`${baseUrl}public/get-resources-novels`)
    const resourceData = await resResource.json()

    return (
        <div className='pt-20 m-2 px-3 md:px-5 lg:px-52'>
            <div className='text-3xl pb-3 text-center'>Books</div>
            <div className='grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-2'>
                {resourceData?.data?.map((item, index) => {
                    return (
                        <Link href={{ pathname: `detail/${item?._id}` }} key={index} className='bg-gray-100 dark:bg-[#131415] rounded-lg p-2 border-2 border-blue-600 shadow-[0_0_8px_1px_#464646]'>
                            <div className='h-36 md:h-56 w-full object-contain'>
                                <Image src={item?.coverImg} alt='' height={300} width={300} className='h-full w-full rounded-t-lg' />
                            </div>
                            <div className='p-1'>
                                <div className='font-semibold text-gray-800 dark:text-gray-100'>{item?.title}</div>
                                <div className='pt-1 text-gray-800 dark:text-gray-400'><span className='font-semibold'>status:</span> {item?.novelStatus}</div>
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
                                    <div className='text-center border w-full rounded-full py-1 bg-blue-500 text-white'>Buy Now $20.00</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default page
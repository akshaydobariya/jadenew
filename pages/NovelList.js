import React from 'react'
import NewRelaseOne from '../public/assets/Images/NewRelease/newReleaseOne.jpeg'
import NewRelaseTwo from '../public/assets/Images/NewRelease/newReleaseTwo.jpeg'
import NewRelaseThree from '../public/assets/Images/NewRelease/newReleaseThree.jpeg'
import NewRelaseFour from '../public/assets/Images/NewRelease/newReleaseFour.jpeg'
import NewRelaseFive from '../public/assets/Images/NewRelease/newReleaseFive.jpeg'
import NewRelaseSix from '../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import Rating from '@mui/material/Rating';
import Image from 'next/image'

function NovelList() {
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

    return (
        <div>
            <div className='md:pt-20 pt-10 px-4 md:px-8'>
                <div className='text-start md:pb-5 pb-4 flex justify-between items-center'>
                    <div className='text-2xl md:text-2xl font-semibold text-center pt-3'>All Novel</div>
                    <div>
                        <select className='px-5 py-[5px] focus:outline-none border border-gray-500 rounded-md'>
                            <option>Urban</option>
                            <option>Featured</option>
                            <option>Games</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-6 gap-4'>
                    {featuredBookData?.map((item, index) => {
                        return (
                            <div key={index} className=''>
                                <div className='h-24 w-20 md:h-40 md:w-40 lg:h-52 lg:w-48'>
                                    <Image src={item.image} alt='' className='h-full w-full rounded-md object-cover' />
                                </div>
                                <div className='pl-1'>
                                    <div className='text-sm md:text-lg font-semibold hidden md:block'>{item.name}</div>
                                    <div className='text-sm md:text-lg font-semibold block md:hidden'>{item.name.slice(0, 9)}..</div>
                                    <div className='text-xs py-1 md:py-2 text-gray-600'>{item.category}</div>
                                    <Rating size='small' name="read-only" value={item.rating} readOnly />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NovelList
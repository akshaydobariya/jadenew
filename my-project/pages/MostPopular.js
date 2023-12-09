import Image from 'next/image'
import React from 'react'
import Rating from '@mui/material/Rating';
import heroinImg from '../public/assets/Images/Banner/heroin.jpeg'

function MostPopular(props) {
    return (
        <div className='md:mt-16 mt-10 bg-gray-800 py-10 md:px-8 px-2'>
            <div className='pb-5 flex items-center justify-between text-white'>
                <div className='text-2xl md:text-3xl font-semibold'>Most Popular</div>
                <div className='underline'>See More</div>
            </div>

            <div className='flex flex-col md:flex-row'>
                <div className='md:border border-gray-600 md:w-[30%] w-[100%] flex md:flex-col justify-center items-center md:p-10 mr-6'>
                    <div className='md:w-full md:h-52 w-60 h-32 md:px-9 object-cover pr-3'>
                        <Image src={heroinImg} alt='' className='h-full w-full' />
                    </div>

                    <div className='text-white text-start md:pt-4'>
                        <div className='md:text-2xl text-lg font-semibold'>The Heroin Queen</div>
                        <div className='text-gray-400 md:text-base text-sm font-normal py-1'>Eastern</div>
                        <Rating size='small' name="read-only" value="3.5" readOnly />
                        <div className='text-gray-400 py-1 hidden md:block'>She was a beauty with pretty appearance beyond comparison. Time-traveling to the Alien world thousands of years ago for a few times, she fought against monsters and evils and saved her country ...</div>
                        <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                    </div>
                </div>

                <div className='grid md:grid-cols-4 grid-cols-3 md:gap-8 gap-3 justify-end md:w-[70%] pt-10 md:pt-0'>
                    {props.popular.map((item, index) => {
                        return (
                            <div key={index} className='cardPopular cursor-pointer'>
                                <div className='md:h-44 md:w-44 h-28 w-28 object-cover overflow-hidden'>
                                    <Image src={item.image} alt='' className='h-full w-full popularImageParent' />
                                </div>
                                <div className='text-white text-start pt-1'>
                                    <div className='text-sm font-semibold'>{item?.name}</div>
                                    <div className='text-sm py-1'>{item?.section}</div>
                                    <div className='flex items-center'>
                                        <Rating size='small' name="read-only" value="3.5" readOnly />
                                        <span className='text-xs pl-2'>4.5</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MostPopular
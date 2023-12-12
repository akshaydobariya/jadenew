import Image from 'next/image'
import React from 'react'
import Rating from '@mui/material/Rating';
import heroinImg from '../public/assets/Images/Banner/heroin.jpeg'
import Slider from 'react-slick';

function MostPopular(props) {

    return (
        <div className='md:mt-16 mt-10 bg-gray-800 py-10 md:px-8 px-2'>
            <div className='pb-5 flex items-center justify-between text-white'>
                <div className='text-2xl font-semibold'>Featured Product</div>
                <div className='underline'>See More</div>
            </div>

            <div className='flex flex-col md:flex-row'>
                <div className='md:w-[35%] grid md:grid-cols-2 grid-cols-3 gap-4'>
                    {props?.popular?.map((item, index) => {
                        return (
                            <div className=''>
                                <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-32 xl:w-56 h-28 w-32  overflow-hidden'>
                                        <Image src={item.image} alt='' className='h-full w-full object-cover popularImageParent' />
                                    </div>
                                    <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                        <div className='hidden md:block text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                        <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                        <div className='text-[13px] py-1'>{item?.section}</div>
                                        <div className='flex items-center'>
                                            <Rating size='small' name="read-only" value="3.5" readOnly />
                                            <span className='hidden md:block text-xs pl-2'>4.5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='border border-gray-600 rounded-md md:w-[30%] w-[100%] flex md:flex-col justify-center items-center md:px-8 md:mx-6 mt-4 mb-5 md:my-0'>
                    <div className='md:w-full md:h-48 w-52 h-32 md:px-3 object-cover pr-3 px-6'>
                        <Image src={heroinImg} alt='' className='h-full w-full rounded-l-md md:rounded-none' />
                    </div>

                    <div className='text-white text-start md:pt-4'>
                        <div className='md:text-xl text-lg font-semibold'>The Heroin Queen</div>
                        <div className='text-gray-400 md:text-sm text-sm font-normal py-1'>Eastern</div>
                        <Rating size='small' name="read-only" value="5" readOnly />
                        <div className='text-gray-400 py-1 hidden md:block text-sm'>She was a beauty with pretty appearance beyond comparison. Time-traveling to the Alien world thousands of years ago for a few times, she fought against monsters and evils and saved her country ...</div>
                        <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                    </div>
                </div>

                <div className='md:pr-0 md:w-[35%] grid md:grid-cols-2 grid-cols-3 gap-4'>
                    {props?.popular?.map((item, index) => {
                        return (
                            <div className=''>
                                <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-56 h-28 w-32 overflow-hidden'>
                                        <Image src={item.image} alt='' className='h-full w-full popularImageParent object-cover' />
                                    </div>
                                    <div className='text-white text-start pt-1 px-1'>
                                        <div className='text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                        <div className='text-sm py-1'>{item?.section}</div>
                                        <div className='flex items-center'>
                                            <Rating size='small' name="read-only" value="2.5" sx={{}} readOnly />
                                            <span className='hidden md:block text-xs pl-2'>2.5</span>
                                        </div>
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
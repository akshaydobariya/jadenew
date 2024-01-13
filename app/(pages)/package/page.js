'use client'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import Image from 'next/image'
import premuimIcon from '../../../public/assets/Images/PackagePage/crown.png'
import DoneIcon from '@mui/icons-material/Done';
import Slider from 'react-slick';
import coin from '../../../public/assets/Images/Coins/coin.png'
import coins from '../../../public/assets/Images/Coins/coin1.png'
import { useState } from 'react';
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import { useRouter } from 'next/navigation';

function Package() {
    const [tab, setTab] = useState('Coins')
    const router = useRouter()

    const packageData = [
        {
            totalCoin: "1000",
            name: "Golden Plan",
            price: "2.50"
        },
        {
            totalCoin: "2500",
            name: "Platinum Plan",
            price: "5.00"
        },
        {
            totalCoin: "5000",
            name: "Silver Plan",
            price: "8.50"
        },
        {
            totalCoin: "11,000",
            name: "Golden Plan",
            price: "12.50"
        },
        {
            totalCoin: "25,000",
            name: "Platinum Plan",
            price: "20.50"
        },
        {
            totalCoin: "50,000",
            name: "Golden Plan",
            price: "22.50"
        },
        {
            totalCoin: "1,00,000",
            name: "Golden Plan",
            price: "50.00"
        },
    ]

    return (
        <div class="pt-20 pb-10 lg:px-20">
            <div class="">
                <div class="ud-section-title mx-auto text-center pb-4">
                    <span className='text-2xl font-semibold'>Package</span>
                    {/* <h2 className='pt-1 pb-3'>Our Pricing Plans</h2> */}
                </div>
            </div>

            <div className='flex text-2xl gap-x-20 mb-2 px-3'>
                <div onClick={() => setTab('Coins')} className={tab === 'Coins' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >Coins</div>
                <div onClick={() => setTab('Tiers')} className={tab === 'Tiers' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'} >Tiers</div>
            </div>

            {tab == 'Coins' &&
                <div className='grid md:grid-cols-5 grid-cols-2 gap-4 px-2 md:px-0'>
                    {packageData?.map((item, index) => {
                        return (
                            <div className='rounded-md bg-gray-800' style={{ boxShadow: "#c7c2c2 0px 0px 7px 2px" }}>
                                <div className='flex justify-center py-6'>
                                    <Image src={coins} alt='coins' className='w-20 h-20' />
                                </div>
                                <div className='text-white font-semibold border-t border-white pb-2 pt-1'>
                                    <div className='flex justify-center gap-3'>
                                        <Image src={coin} alt='coin' className='h-5 w-5' />
                                        <div>{item?.totalCoin}</div>
                                    </div>
                                    <div className='pt-2 pb-1 text-center'>{item?.totalCoin} Jade coins</div>
                                    <div className='text-center'>$ {item?.price}</div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            }

            {tab == 'Tiers' &&
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 px-3'>
                    {[...Array(7)]?.map((_, i) => {
                        return (
                            <div className='flex border-gray-400 rounded-md' style={{ boxShadow: "#e1dbdb 0px 0px 4px 2px" }}
                                onClick={() => router.push('/detail')}>
                                <div>
                                    <Image src={popularComicTwo} alt='' className='h-16 w-16 object-cover rounded-l-md' />
                                </div>
                                <div className='pl-3'>
                                    <div className='text-lg text-gray-900'>Absolute Resonance</div>
                                    <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600'>
                                        <div>9 Chapter</div>
                                        <div>50 Advance</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            }
        </div>
    )
}

export default Package
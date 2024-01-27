'use client'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import Image from 'next/image'
import premuimIcon from '../../../public/assets/Images/PackagePage/crown.png'
import DoneIcon from '@mui/icons-material/Done';
import Slider from 'react-slick';
import coin from '../../../public/assets/Images/Coins/coin.png'
import coins from '../../../public/assets/Images/Coins/coin1.png'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import { useRouter } from 'next/navigation';
import benifitsImage from '../../../public/assets/Images/keywords.png'
import benifitskey from '../../../public/assets/Images/key.png'
import benifitAppointment from '../../../public/assets/Images/appointment.png'
import { useEffect, useState } from 'react';
import useApiService from '@/services/ApiService';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import tiersBanner from '../../../public/assets/Images/PackagePage/packageBanner.png'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import premiumIcon from '../../../public/assets/Images/PackagePage/crown.png'

function Package() {
    const [tab, setTab] = useState('Coins')
    const router = useRouter()
    const { getCoins } = useApiService()

    useEffect(() => {
        getCoins().then((res) => {
            console.log(res, "res--");
        }).catch((er) => {
            console.log(er);
        })
    }, [])

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
        <div class="pt-24 pb-10">
            <div class="">
                <div class="ud-section-title mx-auto text-center pb-4">
                    <span className='text-2xl font-semibold'>Package</span>
                    {/* <h2 className='pt-1 pb-3'>Our Pricing Plans</h2> */}
                </div>
            </div>

            <div className='flex text-2xl gap-x-20 py-1 md:py-0 px-3 lg:px-20 bg-gray-100 md:bg-white dark:bg-gray-800 shadow-md'>
                <div onClick={() => setTab('Coins')} className={tab === 'Coins' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'}>Coins</div>
                <div onClick={() => setTab('Tiers')} className={tab === 'Tiers' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'}>Tiers</div>
                <div onClick={() => setTab('Faq')} className={tab === 'Faq' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'}>FAQ</div>
            </div>

            {tab == 'Coins' &&
                <div className='flex gap-10 px-6 pt-10'>
                    <div className='w-3/4 grid md:grid-cols-4 grid-cols-2 gap-4 dark:gap-8 px-2 md:px-0'>
                        {packageData?.map((item, index) => {
                            return (
                                <div className='rounded-md bg-gray-800 dark:bg-gray-100' style={{ boxShadow: "#2c2c2c 0px 0px 7px 2px" }}>
                                    {/* <div className='flex justify-center py-6'>
                                        <Image src={coins} alt='coins' className='w-20 h-20' />
                                    </div> */}
                                    <div className='text-white font-semibold border-white pb-2 pt-3 dark:text-gray-800 dark:border-gray-800'>
                                        <div className='flex justify-center gap-3'>
                                            <Image src={coin} alt='coin' className='h-5 w-5' />
                                            <div>{item?.totalCoin}</div>
                                        </div>
                                        <div className='pt-2 pb-1 text-center'>{item?.totalCoin} Jade coins</div>
                                        <div className='text-center'>$ {item?.price}</div>
                                    </div>
                                    <div className='text-white bg-blue-600 text-center border-t rounded-b-md dark:border-gray-800 py-2'>
                                        <button>Buy Now</button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className='w-1/4 border shadow-sm bg-gray-100 rounded-md'>
                        <div className='text-center text-lg pt-1 pb-1 border-b'>Benfit</div>
                        <div className='p-2'>
                            <div className='shadow-md py-3 px-2'>
                                <div>Total Coins</div>
                                <div>45456456</div>
                            </div>
                            <div className='shadow-md py-3 px-2 my-2'>
                                <div>Coin Acquired</div>
                                <div>3423232</div>
                            </div>
                            <div className='shadow-md py-3 px-2'>
                                <div>Coin Spent</div>
                                <div>3423232</div>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {tab == 'Tiers' &&
                <div>
                    <div className='relative dark:bg-black dark:text-white'>
                        <div className='flex justify-end'>
                            <Image src={tiersBanner} alt='banner' className='h-full' />
                        </div>
                        <div className='absolute top-16 w-1/2 pr-28 pl-5'>
                            <div className='text-4xl'>Listen without limits. Try 1 month of Premium Individual for free.</div>
                            <div className='text-xl pt-5 pb-10'>Only ₹119/month after. Cancel anytime.</div>
                            <a href='#premiumPlan'>
                                <button className='border px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-900 font-semibold'>View all Premium plans</button>
                            </a>
                            <div className='text-xs pt-5'>Free for 1 month, then ₹119 per month after. Offer only available if you haven't tried Premium before. Terms apply.</div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='bg-gray-800 dark:bg-gray-600'>
                            <div className='pt-10 pb-10 dark:text-gray-800'>
                                <div className='text-center text-3xl pt-3 pb-10 text-white dark:text-gray-200'>Experience the difference</div>
                                <div className='h-full grid justify-center grid-cols-3 px-36 lg:gap-8 gap-2 pt-4 pb-4'>
                                    <div className='text-center border rounded-md flex flex-col justify-center items-center lg:p-2 py-1 bg-white shadow-lg'>
                                        <Image src={benifitsImage} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div className='font-semibold pt-1'>Free Access</div>
                                        <div className='text-sm lg:text-base'>All Publish Chapter</div>
                                    </div>
                                    <div className='border rounded-md flex flex-col justify-center items-center p-2 bg-white shadow-lg'>
                                        <Image src={benifitskey} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div className='font-semibold pt-1'>Early Access</div>
                                        <div>Advace Chapter</div>
                                    </div>
                                    <div className='border rounded-md flex flex-col justify-center items-center p-2 bg-white shadow-lg'>
                                        <Image src={benifitAppointment} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div className='font-semibold pt-1'>Early Access</div>
                                        <div>Upcoming Novels</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-200 dark:bg-gray-500 px-52 pb-10'>
                            <div className='text-center text-gray-800 pt-10 pb-5'>
                                <div className='text-3xl dark:text-gray-200'>Available Novels</div>
                            </div>
                            {[...Array(7)]?.map((_, i) => {
                                return (
                                    <div className='flex border-gray-400 rounded-md text-white shadow-md my-2 border bg-white'
                                        onClick={() => router.push('/detail/123')}>
                                        <div>
                                            <Image src={popularComicTwo} alt='' className='h-16 w-16 object-cover rounded-l-md' />
                                        </div>
                                        <div className='pl-3 flex items-center justify-between w-full pr-2'>
                                            <div>
                                                <div className='text-lg text-gray-900 dark:text-gray-800'>Absolute Resonance</div>
                                                <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-800'>
                                                    <div>9 Chapter</div>
                                                    <div>50 Advance</div>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='text-sm py-[6px] border bg-blue-600 px-9 rounded-full'>BUY</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='flex justify-between textThemeColor'>
                                <button className='flex items-center'>
                                    <KeyboardBackspaceIcon fontSize='small' />
                                    <div className='pl-1'>Preview</div>
                                </button>
                                <button className='flex items-center'>
                                    <div className='font-semibold pr-1'>Next</div>
                                    <EastIcon fontSize='small' />
                                </button>
                            </div>
                        </div>

                        <div id='premiumPlan' className=' bg-[#121212] px-20 text-white pb-12 pt-10'>
                            <div className='text-center text-3xl pb-6'>All Premium Plans</div>
                            <div className='grid grid-cols-3 gap-10'>
                                {[...Array(5)].map((_, i) => {
                                    return (
                                        <div className='border bg-[#242424] p-4 rounded-md'>
                                            <div className='border-b border-gray-400 pb-8'>
                                                <div className='flex'>
                                                    <Image src={premiumIcon} alt='' className='w-5 h-5' />
                                                    <div className='pl-2'>Premium</div>
                                                </div>
                                                <div className={`text-2xl font-semibold py-2 ${i == 0 ? 'text-[#CFF56A]' : i == 1 ? 'text-[#FFD2D7]' : i == 2 ? 'text-[#C4B1D4]' : 'text-[#FFC862]'}`}>Mini</div>
                                                <div>₹950 for 1 month</div>
                                            </div>
                                            <div className='pt-8'>Mortal You are a mere mortal! You have not manifested your resonance nor started on your cultivation path. Regardless, your dedicated efforts have unearthed 2 magical chapters for your perusal!</div>
                                            <button className={`w-full rounded-full py-3 mt-7 text-black font-semibold ${i == 0 ? 'bg-[#CFF56A]' : i == 1 ? 'bg-[#FFD2D7]' : i == 2 ? 'bg-[#C4B1D4]' : 'bg-[#FFC862]'} `}>Buy Now</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }

            {tab == 'Faq' &&
                <div className='pt-5 px-5'>
                    <div className='text-center text-3xl'>Frequently Asked Questions</div>
                    <div>
                        {[...Array(5)].map((_, i) => {
                            return (
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Faq 1
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                </div>}
        </div>
    )
}

export default Package
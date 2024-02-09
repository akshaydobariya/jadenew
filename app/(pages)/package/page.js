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
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Frozen yoghurt', 159, '25 Feb 2024'),
    createData('Ice cream sandwich', 237, '10 Feb 2024'),
];

function Package() {
    const [tab, setTab] = useState('Coins')
    const router = useRouter()
    const { getCoins, paymentApi } = useApiService()
    const [coinData, setCoinData] = useState([])

    useEffect(() => {
        getCoins().then((res) => {
            setCoinData(res?.data?.data);
        }).catch((er) => {
            console.log(er);
        })
    }, [])


    const coinBuy = (data) => {
        const tierBody = ({
            items: [
                {
                    "name": "",
                    "type": "Coin",
                    "tierName": data?.coins,
                    "price": data?.price,
                    "currency": "USD"
                },
            ],
            "amount": {
                "currency": "USD",
                "total": data?.price
            },
            "description": ""
        })
        paymentApi(tierBody).then((res) => {
            console.log(res?.data, "tiersBuy res");
            window.open(res?.data?.data?.url)
        }).catch((er) => {
            console.log(er);
        })
    }


    return (
        <div class="pt-24">
            {/* <div class="">
                <div class="ud-section-title mx-auto text-center pb-4">
                    <span className='text-2xl font-semibold'>Package</span>
                </div>
            </div> */}

            <div className='flex justify-center text-2xl gap-x-20 py-1 md:py-0 px-3 lg:px-20 bg-gray-100 md:bg-white dark:bg-gray-800 shadow-md'>
                <div onClick={() => setTab('Coins')} className={tab === 'Coins' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'}>Coins</div>
                <div onClick={() => setTab('Tiers')} className={tab === 'Tiers' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'}>Tiers</div>
                <div onClick={() => setTab('Faq')} className={tab === 'Faq' ? 'cursor-pointer border-b-2 border-pink-700 font-semibold' : 'cursor-pointer'}>FAQ</div>
            </div>

            {tab == 'Coins' &&
                <div className='md:flex gap-10 px-6 pt-10 pb-3'>
                    <div className='md:w-3/5 grid md:grid-cols-3 grid-cols-2 gap-4 dark:gap-8 px-2 md:px-0 h-max'>
                        {coinData?.map((item, index) => {
                            return (
                                <div key={index} className='rounded-md bg-gray-800 dark:bg-gray-100 shadow-[0_0_6px_1px_#101010]'>
                                    {/* <div className='flex justify-center py-6'>
                                        <Image src={coins} alt='coins' className='w-20 h-20' />
                                    </div> */}
                                    <div className='text-white font-semibold border-white pb-2 pt-3 dark:text-gray-800 dark:border-gray-800'>
                                        <div className='flex justify-center gap-3'>
                                            <Image src={coin} alt='coin' className='h-5 w-5' />
                                            <div>{item?.coins}</div>
                                        </div>
                                        <div className='pt-2 pb-1 text-center'>{item?.coins} Jade coins</div>
                                        <div className='text-center'>$ {item?.price}</div>
                                    </div>
                                    <div className='text-white bg-blue-600 text-center border-t rounded-b-md dark:border-gray-800 py-2'>
                                        <button onClick={() => coinBuy(item)}>Buy Now</button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className='dark:text-white text-white mt-14 md:mt-0 md:w-2/5 border shadow-sm bg-gray-800 rounded-md h-max'>
                        <div className='text-center items-center justify-center pt-2 gap-x-4'>
                            <div className='text-center text-lg '>JADE COIN</div>
                            <div className='flex items-center justify-center'>
                                <Image src={coin} alt='coins' className='w-5 h-5' />
                                <div className='pl-2'>500</div>
                            </div>
                        </div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ background: '#324258 !important', color: "white" }}
                            >
                                <Typography>Wallet</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='shadow-[0_0_8px_.3px_#dfdfdf] rounded-md mt-3'>
                                    <div className='border-b rounded-t-md px-2 bg-gray-700 text-white py-[10px]'>Jade Coin Purchase History</div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ width: '100%' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Jade Coin</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                    <TableCell align="right">Time</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">500</TableCell>
                                                        <TableCell align="right">10 Feb 2024</TableCell>
                                                        <TableCell align="right">10:00</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className='shadow-[0_0_8px_.3px_#dfdfdf] rounded-md mt-3'>
                                    <div className='border-b rounded-t-md px-2 bg-gray-700 text-white py-[10px]'>Jade Coin Spent</div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ width: '100%' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Novel</TableCell>
                                                    <TableCell align="right">coin spent</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className='p-2'>
                            {/* <div className='shadow-[0_0_6px_1px_#101010] rounded-md mt-3'>
                                <div className='border-b rounded-t-md px-2 bg-gray-700 text-white py-1'>Wallet History</div>
                                <div className='flex justify-between border-b-2 border-gray-500 px-2 py-1'>
                                    <div>Amount</div>
                                    <div>Coin</div>
                                    <div>Time</div>
                                </div>
                                <div className='px-1 py-2'>
                                    <div className='flex justify-between px-2 text-sm'>
                                        <div>0.1</div>
                                        <div>12</div>
                                        <div>12:00</div>
                                    </div>
                                    <div className='flex justify-between px-2 text-sm'>
                                        <div>0.1</div>
                                        <div>12</div>
                                        <div>12:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className='shadow-[0_0_6px_1px_#101010] rounded-md my-5'>
                                <div className='border-b rounded-t-md px-2 bg-gray-700 text-white py-1'>Wallet Purchase</div>
                                <div className='flex justify-between border-b-2 border-gray-500 px-2 py-1'>
                                    <div>Amount</div>
                                    <div>Coin</div>
                                    <div>Time</div>
                                </div>
                                <div className='px-1 py-2'>
                                    <div className='flex justify-between px-2 text-sm'>
                                        <div>0.1</div>
                                        <div>12</div>
                                        <div>12:00</div>
                                    </div>
                                    <div className='flex justify-between px-2 text-sm'>
                                        <div>0.1</div>
                                        <div>12</div>
                                        <div>12:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className='shadow-[0_0_6px_1px_#101010] rounded-md'>
                                <div className='border-b rounded-t-md px-2 bg-gray-700 text-white py-1'>Coin spent</div>
                                <div className='flex justify-between border-b-2 border-gray-500 px-2 py-1'>
                                    <div>Amount</div>
                                    <div>Coin</div>
                                    <div>Time</div>
                                </div>
                                <div className='px-1 py-2'>
                                    <div className='flex justify-between px-2 text-sm'>
                                        <div>0.1</div>
                                        <div>12</div>
                                        <div>12:00</div>
                                    </div>
                                    <div className='flex justify-between px-2 text-sm'>
                                        <div>0.1</div>
                                        <div>12</div>
                                        <div>12:00</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            }


            {
                tab == 'Tiers' &&
                <div>
                    <div className='relative dark:bg-black dark:text-white'>
                        <div className='flex justify-end'>
                            <Image src={tiersBanner} alt='banner' className='h-full' />
                        </div>
                        <div className='absolute md:top-16 top-6 md:w-1/2 md:pr-28 pr-10 pl-5'>
                            <div className='lg:text-4xl text-xl font-semibold md:font-medium'>Listen without limits. Try 1 month of Premium Individual for free.</div>
                            <div className='lg:text-xl text-base pt-2 pb-4 md:pt-5 md:pb-10'>Only ₹119/month after. Cancel anytime.</div>
                            <a href='#premiumPlan'>
                                <button className='border px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-900 font-semibold'>View all Premium plans</button>
                            </a>
                            <div className='text-xs md:pt-5 pt-2'>Free for 1 month, then ₹119 per month after. Offer only available if you haven't tried Premium before. Terms apply.</div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='bg-gray-800 dark:bg-gray-600'>
                            <div className='pt-10 pb-10 dark:text-gray-800'>
                                <div className='text-center text-3xl pt-3 pb-10 text-white dark:text-gray-200'>Experience the difference</div>
                                <div className='h-full grid justify-center grid-cols-3 md:px-36 px-3 lg:gap-8 gap-2 pt-4 pb-4'>
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
                                        <div className='font-semibold pt-1'>Ad Free</div>
                                        <div>All Novels</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-200 dark:bg-gray-500 md:px-52 px-5 pb-10'>
                            <div className='text-center text-gray-800 pt-10 pb-5'>
                                <div className='text-3xl dark:text-gray-200'>Available Novels</div>
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                {[...Array(7)]?.map((_, i) => {
                                    return (
                                        <div className='flex border-gray-400 rounded-md text-white shadow-md border bg-white'
                                            onClick={() => router.push('/detail/123')}>
                                            <div>
                                                <Image src={popularComicTwo} alt='' className='h-[4.5rem] w-24 object-cover rounded-l-md' />
                                            </div>
                                            <div className='pl-3 flex items-center justify-between w-full pr-2'>
                                                <div>
                                                    <div className='text-lg text-gray-900 dark:text-gray-800'>Absolute Resonance</div>
                                                    <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-800'>
                                                        <div>9 Chapter</div>
                                                        <div>50 Advance</div>
                                                    </div>
                                                </div>
                                                {/* <div>
                                                <button className='text-sm py-[6px] border bg-blue-600 px-9 rounded-full'>BUY</button>
                                            </div> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex justify-between textThemeColor pt-3'>
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
                    </div>
                </div>
            }

            {
                tab == 'Faq' &&
                <div className='pt-5'>
                    {/* <div className='text-center text-3xl'>Frequently Asked Questions</div> */}
                    <div className='px-20 mx-10 py-10 rounded-lg mb-5'>
                        {[...Array(5)].map((_, i) => {
                            return (
                                <Accordion sx={{ margin: "10px 0", padding: "4px" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <div className='flex items-center'>
                                            <Typography className='border border-black px-4 mr-3 rounded-md py-2'>{i + 1}</Typography>
                                            <Typography className='font-semibold'>Lorem ipsum dolor sit amet 1</Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ borderTop: "1px solid gray" }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                </div>
            }
        </div >
    )
}

export default Package
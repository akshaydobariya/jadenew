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
// import tiersBanner from '../../../public/assets/Images/PackagePage/packageBanner.png'
import tiersBanner from '../../../public/assets/Images/packageTiers.jpeg'
import paypalIcon from '../../../public/assets/Images/paypal.png'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import premiumIcon from '../../../public/assets/Images/PackagePage/crown.png'
import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import PaginationControlled from '@/components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { COIN_HISTORY } from '@/app/Redux/slice/userSlice';
import LoginBox from '@/components/LoginBox';

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Frozen yoghurt', 159, '25 Feb 2024'),
    createData('Ice cream sandwich', 237, '10 Feb 2024'),
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function Package() {
    const [tab, setTab] = useState('Coins')
    const router = useRouter()
    const { getCoinHistory, getCoins, paymentApi, getPurchaseTiers, accesssToken } = useApiService()
    const [coinData, setCoinData] = useState([])
    const [selectCoinData, setSelectCoinData] = useState()
    const [availabelNovelData, setAvailabelNovelData] = useState([])
    const [coinHistoryData, setCoinHistoryData] = useState()
    const [page, setPage] = useState(1)
    const [loadingCoin, setCoinLoading] = useState(false)
    const dispatch = useDispatch()
    const totalCoinData = useSelector((state) => state?.user?.coinHistory)
    const [localStorageToken, setLocalStorageToken] = useState()

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleLoginModalOpen = () => setLoginModalOpen(true);
    const handleLoginModalClose = () => setLoginModalOpen(false);

    useEffect(() => {
        getCoins().then((res) => {
            setCoinData(res?.data?.data);
        }).catch((er) => {
            console.log(er);
        })
    }, [])

    const coinBuy = (data) => {
        if (localStorageToken) {
            setCoinLoading(true)
            const tierBody = ({
                items: [
                    {
                        "name": "",
                        "type": "COIN",
                        "coins": data?.coins,
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
                //alert(res?.data?.data?.url);
                window.open(res?.data?.data?.url, "_blank")
                setCoinLoading(false)
            }).catch((er) => {
                console.log(er);
            })
        } else {
            handleLoginModalOpen()
        }
    }

    useEffect(() => {
        getPurchaseTiers().then((res) => {
            console.log(res?.data?.data, "tiers");
            setAvailabelNovelData(res?.data?.data)
        }).then((er) => {
            console.log(er);
        })
    }, [])

    useEffect(() => {
        getCoinHistory().then((res) => {
            console.log("res coins history", res);
            setCoinHistoryData(res?.data?.data)
        }).catch((er) => {
            console.log(er);
        })
    }, [])

    useEffect(() => {
        if (localStorage !== undefined && localStorage.getItem('token')) {
            setLocalStorageToken(localStorage.getItem('token'))
        }
    }, [])

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div class="pt-24">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px] dark:bg-[#202020] dark:text-white'>
                    <div className='flex justify-between items-center'>
                        <div className='text-center text-xl pb-2 font-semibold'>Get more JadeCoin</div>
                        <div>
                            <CloseIcon className='cursor-pointer' onClick={() => handleClose()} />
                        </div>
                    </div>
                    <div className='pt-3'>Your Selection</div>
                    <div className='flex justify-between border-b pb-3 pt-3'>
                        <div className='flex items-center'>
                            <Image src={coin} height={100} width={100} className='h-5 w-5' />
                            <div className='pl-2'>{selectCoinData?.coins}</div>
                        </div>
                        <div>${selectCoinData?.price}</div>
                    </div>

                    <div className='pt-3'>Payment Method</div>
                    <div className='flex items-center justify-between pt-2 gap-3'>
                        <div className='border rounded-md border-gray-300 w-full py-1 flex items-center px-2'>
                            <Image src={paypalIcon} height={100} width={100} className='h-5 w-5' />
                            <div className='pl-2'>PayPal</div>
                        </div>
                        <input type='radio' checked />
                    </div>
                    <div className='text-sm pt-4'>Secure checkout experience provided by PayPal. No payment method information is stored on JadeCoin.</div>
                    <div className='flex justify-end pt-3'>
                        {loadingCoin ?
                            <div className='border px-8 rounded-full py-1 bg-blue-600'>
                                <CircularProgress size={20} color='secondary' />
                            </div> :
                            <button onClick={() => coinBuy(selectCoinData)} className='border px-8 rounded-full bg-blue-600 text-white py-1'>Buy</button>}
                    </div>
                </Box>
            </Modal>

            <Modal
                open={loginModalOpen}
                onClose={handleLoginModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[640px] w-[320px] dark:bg-[#202020] dark:text-white'>
                    <div className='flex justify-end'><CloseIcon className='cursor-pointer' onClick={handleLoginModalClose} /></div>
                    <LoginBox />
                </Box>
            </Modal>


            <div className='flex justify-center text-2xl gap-x-20 py-1 md:py-0 px-3 lg:px-20 bg-gray-100 md:bg-white dark:bg-[#202020] shadow-md'>
                <div onClick={() => setTab('Coins')} className={tab === 'Coins' ? 'cursor-pointer border-b-2 border-blue-700 font-semibold' : 'cursor-pointer'}>Coins</div>
                <div onClick={() => setTab('Tiers')} className={tab === 'Tiers' ? 'cursor-pointer border-b-2 border-blue-700 font-semibold' : 'cursor-pointer'}>Tiers</div>
                <div onClick={() => setTab('Faq')} className={tab === 'Faq' ? 'cursor-pointer border-b-2 border-blue-700 font-semibold' : 'cursor-pointer'}>FAQ</div>
            </div>

            {tab == 'Coins' &&
                <div className='flex flex-col-reverse md:flex-row gap-10 px-6 pt-10 pb-3'>
                    <div className={`${!localStorageToken ? `w-full grid md:grid-cols-4 grid-cols-2 gap-4 dark:gap-8 md:px-10 h-max` : `md:w-3/5 grid md:grid-cols-3 grid-cols-2 gap-4 dark:gap-8 md:px-0 h-max`}`}>
                        {coinData?.map((item, index) => {
                            return (
                                <div key={index} className='rounded-md bg-gray-800 dark:bg-[#131415] dark:text-white shadow-[0_0_6px_1px_#101010]'>
                                    {/* <div className='flex justify-center py-6'>
                                        <Image src={coins} alt='coins' className='w-20 h-20' />
                                    </div> */}
                                    <div className='text-white font-semibold border-white pb-2 pt-3 dark:text-gray-200 dark:border-gray-800'>
                                        <div className='flex justify-center gap-3'>
                                            <Image src={coin} alt='coin' className='h-5 w-5' />
                                            <div>{item?.coins}</div>
                                        </div>
                                        <div className='pt-2 pb-1 text-center'>{item?.coins} Jade coins</div>
                                        <div className='text-center'>$ {item?.price}</div>
                                    </div>
                                    <div className='text-white bg-blue-600 text-center border-t rounded-b-md dark:border-gray-800 py-2'>
                                        <button onClick={() => {
                                            handleOpen()
                                            setSelectCoinData(item)
                                        }}>Buy Now</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {localStorageToken &&
                        <div className='md:w-2/5'>
                            <div className='md:mt-0  dark:shadow-[0_0_2px_2px_#131313] shadow-sm rounded-md h-max'>
                                <div className='text-center items-center justify-center pt-2 gap-x-4'>
                                    <div className='text-center text-2xl pb-2'>My Wallet</div>

                                    <div className='py-3 px-3 dark:bg-[#202020] dark:text-white bg-gray-900 text-white'>
                                        <div className='bg-blue-400 border md:w-1/2 w-[75%] m-auto py-10 rounded-md mt-1 flex items-center justify-center'>
                                            <Image src={coin} alt='coins' className='w-5 h-5' />
                                            <div className='pl-1'>{isClient && totalCoinData}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className=''>
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

                            <div className='dark:text-white text-white mt-4 md:mt-2 dark:shadow-[0_0_2px_2px_#131313] bg-gray-800 dark:bg-[#131415] rounded-md h-max'>
                                <Accordion className='dark:bg-[#202020] dark:text-white bg-gray-900 text-white'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        className='dark:bg-[#202020] dark:text-white bg-gray-900 text-white'
                                    >
                                        <Typography>Purchase history</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='dark:bg-[#131415] bg-gray-800'>
                                        <div className='dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-3'>
                                            <div className='border-b rounded-t-md px-2 bg-gray-800 text-white dark:bg-[#131415] py-[10px]'>Jade Coin Purchase History</div>
                                            <TableContainer component={Paper} className='dark:bg-[#202020] dark:text-gray-100'>
                                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                                    <TableHead className='bg-gray-800 dark:bg-[#131415] text-white'>
                                                        <TableRow>
                                                            <TableCell sx={{ color: "white" }} >Jade Coin</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="right">Date</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="right">Time</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className=' text-white'>
                                                        {coinHistoryData?.history?.map((item, index) => (
                                                            item?.type == 'BUY' &&
                                                            <TableRow
                                                                key={index}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell sx={{ color: "white" }} component="th" scope="row">{item?.currentCoinsAmount}</TableCell>
                                                                <TableCell sx={{ color: "white" }} align="right">{moment(item?.createdAt).format('DD MMM, YYYY')}</TableCell>
                                                                <TableCell sx={{ color: "white" }} align="right">{moment(item?.endDate).format('DD MMM, YYYY')}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <div className='dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-5'>
                                            <div className='border-b rounded-t-md px-2 bg-gray-800 text-white dark:bg-[#131415] py-[10px]'>Jade Coin Spent</div>
                                            <TableContainer component={Paper} className='dark:bg-[#202020] dark:text-gray-200'>
                                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                                    <TableHead className='bg-gray-800 dark:bg-[#131415]'>
                                                        <TableRow>
                                                            <TableCell className='text-white'>Novel</TableCell>
                                                            <TableCell className='text-white' align="right">coin spent</TableCell>
                                                            <TableCell className='text-white' align="right">Date</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {coinHistoryData?.history?.map((row, index) => (
                                                            row?.type == "SPENT" &&
                                                            <TableRow
                                                                key={index}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell className='dark:text-white' component="th" scope="row">{row.novelId?.title}</TableCell>
                                                                <TableCell className='dark:text-white' align="right">{row.amount}</TableCell>
                                                                <TableCell className='dark:text-white' align="right">{moment(row?.updatedAt).format('DD MMM, YYYY')}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    }
                </div>
            }

            {
                tab == 'Tiers' &&
                <div>
                    <div className='relative dark:bg-black dark:text-white'>
                        <div className='flex justify-end'>
                            <Image src={tiersBanner} height={500} width={500} alt='banner' className='md:h-[400px] h-[270px] w-full object-cover' />
                        </div>
                        <div className='text-white absolute md:top-16 top-6 md:w-1/2 md:pr-28 pr-10 pl-5'>
                            <div className='lg:text-4xl text-xl font-semibold md:font-medium'>Listen without limits. Try 1 month of Premium Individual for free.</div>
                            <div className='lg:text-xl text-base pt-2 pb-4 md:pt-5 md:pb-10'>Only ₹119/month after. Cancel anytime.</div>
                            <a href='#premiumPlan'>
                                <button className='border px-6 py-2 rounded-full bg-gray-800 dark:bg-gray-900 font-semibold'>View all Premium plans</button>
                            </a>
                            <div className='text-xs md:pt-5 pt-2'>Free for 1 month, then ₹119 per month after. Offer only available if you haven't tried Premium before. Terms apply.</div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='bg-gray-800 dark:bg-[#131415]'>
                            <div className='pt-10 pb-10 dark:text-gray-800'>
                                <div className='text-center text-3xl pt-3 pb-10 text-white dark:text-gray-200'>Experience the difference</div>
                                <div className='h-full grid justify-center grid-cols-3 md:px-36 px-3 lg:gap-8 gap-2 pt-4 pb-4'>
                                    <div className='text-center border rounded-md flex flex-col justify-center items-center lg:p-2 py-1 bg-white dark:bg-[#202020] dark:text-gray-200 shadow-lg'>
                                        <Image src={benifitsImage} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div className='font-semibold pt-1'>Free Access</div>
                                        <div className='text-sm lg:text-base'>All Publish Chapter</div>
                                    </div>
                                    <div className='border rounded-md flex flex-col justify-center items-center p-2 bg-white dark:bg-[#202020] dark:text-gray-200 shadow-lg'>
                                        <Image src={benifitskey} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div className='font-semibold pt-1'>Early Access</div>
                                        <div>Advace Chapter</div>
                                    </div>
                                    <div className='border rounded-md flex flex-col justify-center items-center p-2 bg-white dark:bg-[#202020] dark:text-gray-200 shadow-lg'>
                                        <Image src={benifitAppointment} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div className='font-semibold pt-1'>Ad Free</div>
                                        <div>All Novels</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-200 border-t-2 dark:bg-[#131415] md:px-52 px-5 pb-10'>
                            {availabelNovelData?.length > 0 &&
                                <>
                                    <div className='text-center text-gray-800 pt-10 pb-5'>
                                        <div className='text-3xl dark:text-gray-200'>Available Novels</div>
                                    </div>
                                    <div className='grid md:grid-cols-2 grid-gray-100 gap-3'>
                                        {availabelNovelData?.map((item, index) => {
                                            return (
                                                <div key={index} className='flex border-gray-400 rounded-md text-white dark:text-gray-200 shadow-md border bg-white dark:bg-[#202020]'
                                                    onClick={() => router.push(`/detail/${item?.novelId?._id}`)}>
                                                    <div>
                                                        <Image src={item?.novelId?.coverImg} alt='' height={300} width={300} className='h-[4.5rem] w-24 object-cover rounded-l-md' />
                                                    </div>
                                                    <div className='pl-3 flex pt-1 flex-col w-full pr-2'>
                                                        <div className='text-lg text-gray-900 dark:text-gray-200 font-semibold'>{item?.novelId?.title}</div>
                                                        <div className='flex justify-between w-full items-center'>
                                                            <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-200'>chapter {item?.tiers[0]?.fromChapter} - {item?.tiers[0]?.toChapter}</div>
                                                            <div className='text-gray-600 text-sm'><span className='font-semibold'>End Date -</span>{moment(item?.tiers[0]?.endDate).format('DD MMM, YYYY')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>}
                            {availabelNovelData.length > 0 && (
                                <div className='flex justify-center pt-20'>
                                    <PaginationControlled
                                        setPage={setPage}
                                        last_page='1'
                                        page={page}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }

            {
                tab == 'Faq' &&
                <div className='dark:pt-1 pt-5'>
                    {/* <div className='text-center text-3xl'>Frequently Asked Questions</div> */}
                    <div className='md:px-20 mx-5 md:mx-10 py-10 rounded-lg mb-5'>
                        {[...Array(5)].map((_, i) => {
                            return (
                                <Accordion className='dark:bg-[#131415] dark:text-white' sx={{ margin: "10px 0", padding: "4px" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <div className='flex items-center'>
                                            <Typography className='border border-black dark:border-white px-4 mr-3 rounded-md py-2'>{i + 1}</Typography>
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
        </div>
    )
}

export default Package
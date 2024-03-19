'use client'
import NewRelaseTwo from '../../../public/assets/Images/NewRelease/newReleaseSix.jpeg'
import Image from 'next/image'
import premuimIcon from '../../../public/assets/Images/PackagePage/crown.png'
import DoneIcon from '@mui/icons-material/Done';
import Slider from 'react-slick';
import coin from '../../../public/assets/Images/coin.gif'
import multicoin from '../../../public/assets/Images/coin.png'
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
import SearchIcon from '@mui/icons-material/Search';

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

function Home() {
    const [tab, setTab] = useState('Coins')
    const router = useRouter()
    const { getBanners, getCoinHistory, getCoins, paymentApi, getPurchaseTiers, accesssToken } = useApiService()
    const [coinData, setCoinData] = useState([])
    const [selectCoinData, setSelectCoinData] = useState()
    const [availabelNovelData, setAvailabelNovelData] = useState([])
    const [coinHistoryData, setCoinHistoryData] = useState([])
    const [page, setPage] = useState(1)
    const [coinHistoryPage, setCoinHistoryPage] = useState(1)
    const [loadingCoin, setCoinLoading] = useState(false)
    const dispatch = useDispatch()
    const totalCoinData = useSelector((state) => state?.user?.coinHistory)
    const [localStorageToken, setLocalStorageToken] = useState()
    const [debounceTime, setDebounceTime] = useState(null)
    const [bannerData, setBannerData] = useState([])

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
        setCoinLoading(true)
        const tierBody = ({
            items: [
                {
                    "packageId": data?._id,
                    "type": "COIN",
                },
            ],
            "discountId": null,
            "description": "",
        })
        paymentApi(tierBody).then((res) => {
            //alert(res?.data?.data?.url);
            window.open(res?.data?.data?.url, "_blank")
            setCoinLoading(false)
            setOpen(false)
            accessTokenApi()
        }).catch((er) => {
            console.log(er);
        })
    }

    const accessTokenApi = () => {
        if (localStorageToken) {
            accesssToken().then((res) => {
                dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
            }).catch((er) => {
            })
        }
    }

    useEffect(() => {
        if (localStorageToken) {
            let url = `page=1&limit=10&search=the`
            getPurchaseTiers(url).then((res) => {
                console.log(res?.data?.data, "tiers");
                setAvailabelNovelData(res?.data?.data)
            }).catch((er) => {
                console.log(er);
            })
        }
    }, [])
    const [searched, setSearched] = useState('');
    const getTiersApi = (value) => {
        if (localStorageToken) {
            setSearched(value);

            if (debounceTime) {
                clearTimeout(debounceTime);
            }

            const timeoutId = setTimeout(() => {
                let url = `page=1&limit=10&search=${value}`;
                getPurchaseTiers(url)
                    .then((res) => {
                        setAvailabelNovelData(res?.data?.data);
                    })
                    .catch((er) => {
                        console.log(er);
                    });
            }, 1000);

            setDebounceTime(timeoutId);
        }
    };

    useEffect(() => {
        if (localStorageToken) {
            const url = `page=${coinHistoryPage}&limit=10`
            getCoinHistory(url).then((res) => {
                console.log("res coins history", res);
                setCoinHistoryData(res?.data?.data)
            }).catch((er) => {
                console.log(er);
            })
        }
    }, [coinHistoryPage])

    useEffect(() => {
        if (localStorage !== undefined && localStorage.getItem('token')) {
            setLocalStorageToken(localStorage.getItem('token'))
        }
    }, [])

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        getBanners().then((res) => {
            setBannerData(res?.data?.data?.data)
        }).catch((er) => {
        })
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div class="py-10 pt-16 w-full mx-auto my-4 flex flex-col items-center bg-white dark:bg-[#202020] shadow-md">
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
                    <div className='rounded-md w-fit flex mx-auto my-0 px-10 bg-gray-800 dark:bg-[#131415] mt-2 dark:text-white shadow-[0_0_6px_1px_#101010]'>
                        <div className='text-white font-semibold border-white pb-1 pt-1 dark:text-gray-200 dark:border-gray-800'>
                            <div className='flex justify-center gap-3'>
                                <Image src={multicoin} alt='coin' className='h-24 w-24' />
                                {/*    <div>{item?.coins}</div> */}
                            </div>
                            <div className='text-center'>$ {selectCoinData?.price}</div>
                            <div className='pt-2 pb-1 text-center'>{selectCoinData?.coins} Jade coins</div>
                        </div>
                    </div>
                    <div className='px-10'>
                        <div className='pt-3'>Payment Method</div>
                        <div className='flex items-center justify-between pt-2 gap-3'>
                            <div className='border rounded-md border-gray-300 w-full py-1 flex items-center px-2'>
                                <Image src={paypalIcon} height={100} width={100} className='h-5 w-5' />
                                <div className='pl-2'>PayPal</div>
                            </div>
                            {/*      <input type='radio' checked /> */}
                        </div>

                        <div className='text-sm pt-4 dark:text-gray-200 text-slate-500'><span className="text-red-500 text-lg">*</span>Secure checkout experience provided by PayPal. No payment method information is stored on JadeScroll.</div>
                        <div className='flex justify-center pt-3'>
                            {loadingCoin ?
                                <div className='border px-8 rounded-full py-1 bg-blue-600'>
                                    <CircularProgress size={20} color='secondary' />
                                </div> :
                                <button onClick={() => coinBuy(selectCoinData)} className='border px-8 rounded-full bg-blue-600 text-white py-1'>Buy</button>}
                        </div>
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

            <div className='flex justify-center text-2xl gap-x-20  py-1 md:py-3 px-3 lg:px-20  '>
                <div onClick={() => setTab('Coins')} className={tab === 'Coins' ? 'cursor-pointer border-b-2 border-blue-700 font-semibold' : 'cursor-pointer'}>COINS</div>
                <div onClick={() => setTab('Tiers')} className={tab === 'Tiers' ? 'cursor-pointer border-b-2 border-blue-700 font-semibold' : 'cursor-pointer'}>NOBLE</div>
                <div onClick={() => setTab('Faq')} className={tab === 'Faq' ? 'cursor-pointer border-b-2 border-blue-700 font-semibold' : 'cursor-pointer'}>FAQ</div>
            </div>
            <hr className='bg-gray-700 w-full' />

            {tab == 'Coins' &&
                <div className='flex flex-col-reverse lg:flex-row lg:gap-10 w-full pt-10 pb-3 p gap-7'>
                    {localStorageToken && <div className='block lg:hidden bg-slate-200 px-4 py-4 rounde-2xl dark:text-white text-white mt-4 md:mt-2 dark:shadow-[0_0_2px_2px_#131313] dark:bg-[#131415] rounded-md h-max'>
                        <Accordion defaultExpanded className='dark:bg-[#202020] dark:text-white bg-gray-300 text-black'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className=' text-black  dark:text-white' />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                className='dark:bg-[#202020] dark:text-white bg-gray-300 text-black'
                            >
                                <Typography>Purchase history</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='dark:bg-[#131415] bg-gray-300 text-black'>
                                <div className='dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-3'>
                                    <div className='border-b rounded-t-md px-2 bg-gray-300 text-black dark:text-white dark:bg-[#131415] py-[10px]'>Jade Coin Purchase History</div>
                                    {coinHistoryData?.data?.length == 0 ?
                                        <div className='dark:text-white py-3 text-center'>No Transaction</div> :
                                        <TableContainer component={Paper} className='dark:bg-[#202020] dark:text-gray-100'>
                                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                                <TableHead className='bg-gray-300 text-black dark:bg-[#131415] dark:text-white'>
                                                    <TableRow>
                                                        <TableCell className=' text-black  dark:text-white' >Title</TableCell>
                                                        <TableCell className=' text-black  dark:text-white' align="right">Coin</TableCell>
                                                        <TableCell className=' text-black  dark:text-white' align="right">Current Coin</TableCell>
                                                        <TableCell className=' text-black  dark:text-white' align="right">Date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className=' bg-gray-300 text-black dark:bg-[#131415] dark:text-white'>
                                                    {coinHistoryData?.data?.map((item, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell className=' text-black  dark:text-white' component="th" scope="row">{item?.type == 'BUY' ? "ADD" : item?.novelId?.title}</TableCell>
                                                            <TableCell className=' text-black  dark:text-white' align="right">{item?.type == 'BUY' ? `+${item?.amount}` : `-${item?.amount}`}</TableCell>
                                                            <TableCell className=' text-black  dark:text-white' align="right">{item?.currentCoinsAmount}</TableCell>
                                                            <TableCell className=' text-black  dark:text-white' align="right">{moment(item?.createdAt).format('DD MMM, YYYY')}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    }
                                </div>
                                {/* <div className='dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-5'>
                                    <div className='border-b rounded-t-md px-2 bg-gray-300 text-black  dark:text-white dark:bg-[#131415] py-[10px]'>Jade Coin Spent</div>
                                    <TableContainer component={Paper} className='dark:bg-[#202020] dark:text-gray-200'>
                                        <Table sx={{ width: '100%' }} aria-label="simple table">
                                            <TableHead className='bg-gray-300 text-black  dark:text-white dark:bg-[#131415]'>
                                                <TableRow>
                                                    <TableCell className=' text-black  dark:text-white'>Novel</TableCell>
                                                    <TableCell className=' text-black  dark:text-white' align="right">coin spent</TableCell>
                                                    <TableCell className=' text-black  dark:text-white' align="right">Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {coinHistoryData?.data?.map((row, index) => (
                                                    row?.type == "SPENT" &&
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell className='dark:text-white' component="th" scope="row">{row.novelId?.title}</TableCell>
                                                        <TableCell className='dark:text-white' align="right">{row.amount}</TableCell>
                                                        <TableCell className='dark:text-white' align="right">{moment(row?.createdAt).format('DD MMM, YYYY')}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div> */}
                            </AccordionDetails>
                            {coinHistoryData?.data?.length > 0 && (
                                <div className='flex justify-center pt-1'>
                                    <PaginationControlled
                                        setPage={setCoinHistoryPage}
                                        last_page={coinHistoryData?.totalPage}
                                        page={coinHistoryPage}
                                    />
                                </div>
                            )}
                        </Accordion>
                    </div>}

                    <div className={`${!localStorageToken ? `w-full grid md:grid-cols-4 grid-cols-2 gap-6 dark:gap-8 md:px-10 h-max` : `lg:w-3/5 grid md:grid-cols-3 grid-cols-2 gap-4 dark:gap-8 md:px-10 lg:px-0 h-max`} px-4 lg:pl-10`}>
                        {coinData?.map((item, index) => {
                            return (
                                <div key={index} className='rounded-md bg-[#202020] dark:text-white shadow-[0_0_6px_1px_#101010]'>
                                    {/* <div className='flex justify-center py-6'>
                                        <Image src={coins} alt='coins' className='w-20 h-20' />
                                    </div> */}
                                    <div className='text-white font-semibold border-white pb-2 pt-3 dark:text-gray-200 dark:border-gray-800'>
                                        <div className='flex justify-center gap-3'>
                                            <Image src={multicoin} alt='coin' className='h-24 w-24' />
                                            {/*    <div>{item?.coins}</div> */}
                                        </div>
                                        <div className='text-center'>$ {item?.price}</div>
                                        <div className='pt-2 pb-1 text-center'>{item?.coins} Jade coins</div>
                                    </div>
                                    <div className='text-white bg-blue-600 text-center border-t rounded-b-md dark:border-gray-800 py-2'>
                                        <button onClick={() => {
                                            if (!localStorageToken) {
                                                handleLoginModalOpen()
                                            } else {
                                                setSelectCoinData(item)
                                                handleOpen()
                                            }
                                        }}>Buy Now</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {localStorageToken &&
                        <div className='lg:w-2/5 bg-slate-200 pt-6 md:pt-1 mx-2 rounded-2xl h-fit pb-6 dark:bg-black px-6'>
                            <div className='md:mt-0 relative    rounded-md h-max'>
                                <div className='text-center flex justify-between items-center px-2 rounded-sm gap-x-4 lg:border border-gray-400 lg:mt-2'>
                                    <div className='text-center text-2xl '>My Wallet</div>

                                    <div className='lg:py-3 px-3 text-white relative'>
                                        <div className='bg-blue-400 px-4 md:border h-fit w-fit m-auto py-1 rounded-md mt-1 flex items-center justify-center'>
                                            <div>
                                                <Image src={coin} alt='coins' className='h-5 w-5' height={200} width={200} />
                                            </div>
                                            <div className='pl-2'>{isClient && totalCoinData}</div>
                                        </div>
                                    </div>
                                    {/* <div className='flex items-center bg-blue-400'>
                                        <Image src={coin} className='h-16 w-16' height={200} width={200} />
                                        <div>{isClient && totalCoinData}</div>
                                    </div> */}
                                </div>
                            </div>
                            <div className='hidden lg:block dark:text-white text-black mt-4 md:mt-4 dark:shadow-[0_0_2px_2px_#131313] bg-gray-300 dark:bg-[#131415] rounded-md h-max'>
                                <Accordion defaultExpanded className='dark:bg-[#202020] dark:text-white bg-gray-300 text-black'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className=' text-black  dark:text-white' />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        className='dark:bg-[#202020] dark:text-white bg-gray-300 text-black'
                                    >
                                        <Typography>Purchase history</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='dark:bg-[#131415] bg-gray-300 text-black'>
                                        <div className='dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-3'>
                                            <div className='border-b rounded-t-md px-2 bg-gray-300 text-black dark:text-white dark:bg-[#131415] py-[10px]'>Jade Coin Purchase History</div>
                                            {coinHistoryData?.data?.length == 0 ?
                                                <div className='dark:text-white py-3 text-center'>No Transaction</div> :
                                                <TableContainer component={Paper} className='dark:bg-[#202020] dark:text-gray-100'>
                                                    <Table sx={{ width: '100%' }} aria-label="simple table">
                                                        <TableHead className='bg-gray-300 text-black dark:bg-[#131415] dark:text-white'>
                                                            <TableRow>
                                                                <TableCell className=' text-black  dark:text-white' >Title</TableCell>
                                                                <TableCell className=' text-black  dark:text-white' align="right">Coin</TableCell>
                                                                <TableCell className=' text-black  dark:text-white' align="right">Current Coin</TableCell>
                                                                <TableCell className=' text-black  dark:text-white' align="right">Date</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody className=' bg-gray-300 text-black dark:bg-[#131415] dark:text-white'>
                                                            {coinHistoryData?.data?.map((item, index) => (
                                                                <TableRow
                                                                    key={index}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell className=' text-black  dark:text-white' component="th" scope="row">{item?.type == 'BUY' ? "ADD" : item?.novelId?.title}</TableCell>
                                                                    <TableCell className=' text-black  dark:text-white' align="right">{item?.type == 'BUY' ? `+${item?.amount}` : `-${item?.amount}`}</TableCell>
                                                                    <TableCell className=' text-black  dark:text-white' align="right">{item?.currentCoinsAmount}</TableCell>
                                                                    <TableCell className=' text-black  dark:text-white' align="right">{moment(item?.createdAt).format('DD MMM, YYYY')}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            }
                                        </div>
                                        {/* <div className='dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-5'>
                                            <div className='border-b rounded-t-md px-2 bg-gray-300 text-black  dark:text-white dark:bg-[#131415] py-[10px]'>Jade Coin Spent</div>
                                            <TableContainer component={Paper} className='dark:bg-[#202020] dark:text-gray-200'>
                                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                                    <TableHead className='bg-gray-300 text-black  dark:text-white dark:bg-[#131415]'>
                                                        <TableRow>
                                                            <TableCell className=' text-black  dark:text-white'>Novel</TableCell>
                                                            <TableCell className=' text-black  dark:text-white' align="right">coin spent</TableCell>
                                                            <TableCell className=' text-black  dark:text-white' align="right">Date</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className=' bg-gray-300 text-black dark:bg-[#131415] dark:text-white'>
                                                        {coinHistoryData?.data?.map((row, index) => (
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
                                        </div> */}
                                    </AccordionDetails>
                                    {coinHistoryData?.data?.length > 0 && (
                                        <div className='flex justify-center pt-1'>
                                            <PaginationControlled
                                                setPage={setCoinHistoryPage}
                                                last_page={coinHistoryData?.totalPage}
                                                page={coinHistoryPage}
                                            />
                                        </div>
                                    )}
                                </Accordion>

                            </div>
                        </div>
                    }

                </div>
            }

            {
                tab == 'Tiers' &&
                <div className='w-full'>
                    {bannerData?.map((item, index) => {
                        return (
                            item?.location == "NOBEL" &&
                            <div className='relative w-full dark:bg-black dark:text-white'>
                                <div className='flex justify-end'>
                                    <Image src={item?.bannerImg} height={500} width={500} alt='banner' className='md:h-[400px] h-[270px] w-full object-cover' />
                                </div>
                                <div className='text-white absolute md:top-16 top-6 md:w-1/2 md:pr-28 pr-10 pl-5'>
                                    <div className='text-xl' dangerouslySetInnerHTML={{ __html: item?.text }}></div>
                                </div>
                            </div>
                        )
                    })}


                    {/* <div className='text-white absolute md:top-16 top-6 md:w-1/2 md:pr-28 pr-10 pl-5'>
                            <div className='lg:text-4xl text-xl font-semibold md:font-medium'>Listen without limits. Try 1 month of Premium Individual for free.</div>
                            <div className='lg:text-xl text-base pt-2 pb-4 md:pt-5 md:pb-10'>Only ₹119/month after. Cancel anytime.</div>
                            <a href='#premiumPlan'>
                                <button className='border px-6 py-2 rounded-full bg-gray-800 dark:bg-gray-900 font-semibold'>View all Premium plans</button>
                            </a>
                            <div className='text-xs md:pt-5 pt-2'>Free for 1 month, then ₹119 per month after. Offer only available if you haven't tried Premium before. Terms apply.</div>
                        </div> */}

                    <div className='w-full'>
                        <div className='bg-[#212121] dark:bg-[#131415]'>
                            <div className='pt-10 pb-10 dark:text-gray-800'>
                                <div className='text-center text-3xl pt-3 pb-10 text-white dark:text-gray-200'>Experience the difference!!</div>
                                <div className='h-full grid justify-center grid-cols-3 md:px-24 lg:px-36 px-3 lg:gap-8 gap-2 pt-4 pb-4'>
                                    <div className='text-center border rounded-md flex flex-col justify-around items-center lg:p-2 py-2 bg-white dark:bg-[#202020] dark:text-gray-200 shadow-lg'>
                                        <Image src={benifitsImage} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div>
                                            <div className='font-semibold pt-1 text-center'>Free Access</div>
                                            <div className='text-sm lg:text-base text-center'>All Publish Chapter</div>
                                        </div>
                                    </div>
                                    <div className='border rounded-md flex flex-col justify-around items-center p-2 bg-white dark:bg-[#202020] dark:text-gray-200 shadow-lg'>
                                        <Image src={benifitskey} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div>
                                            <div className='font-semibold pt-1 text-center'>Early Access</div>
                                            <div className='text-center'>Advance Chapter</div>
                                        </div>
                                    </div>
                                    <div className='border rounded-md flex flex-col justify-around items-center p-2 bg-white dark:bg-[#202020] dark:text-gray-200 shadow-lg'>
                                        <Image src={benifitAppointment} height={300} width={300} className='lg:h-20 lg:w-20 h-14 w-14' />
                                        <div>
                                            <div className='font-semibold pt-1 text-center'>Ad Free</div>
                                            <div className='text-center'>All Novels & chapters</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {availabelNovelData?.data?.length > 0 && <div className='bg-gray-200 border-t-2 dark:bg-[#131415] md:px-36 lg:px-52 px-5 pb-10'>
                            {availabelNovelData?.data?.length > 0 &&
                                <>
                                    <div className='flex flex-col lg:flex-row justify-between items-center text-gray-800 pt-10 pb-5'>
                                        <div className='text-3xl dark:text-gray-200 pb-4 lg:pb-0'>Available Novels</div>
                                        <div className='border bg-white rounded-md pl-2'>
                                            <SearchIcon />
                                            <input type='text' placeholder='search' onChange={(e) => getTiersApi(e.target.value)} className='rounded-md px-2 py-1 focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='grid lg:grid-cols-2 grid-gray-100 gap-3'>
                                        {availabelNovelData?.data?.map((item, index) => {
                                            return (
                                                <div key={index} className='flex border-gray-400 rounded-md text-white dark:text-gray-200 shadow-md border bg-white dark:bg-[#202020]'
                                                    onClick={() => router.push(`/detail/${item?.novelId?._id}`)}>
                                                    <div>
                                                        <Image src={item?.novelId?.coverImg} alt='' height={300} width={300} className='h-[5rem] w-24 object-cover rounded-l-md' />
                                                    </div>
                                                    <div className='pl-3 flex pt-1 flex-col w-full pr-2'>
                                                        <div className='text-lg text-gray-900 dark:text-gray-200 font-semibold'>{item?.novelId?.title.length > 21 ? `${item?.novelId?.title.slice(0, 21)}..` : item?.novelId?.title}</div>
                                                        <div className='flex justify-between w-full flex-col'>
                                                            <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-200'>chapter {item?.tiers[0]?.fromChapter} - {item?.tiers[0]?.toChapter}</div>
                                                            <div className='text-gray-600 text-sm'><span className='font-semibold'>End Date -</span>{moment(item?.tiers[0]?.endDate).format('DD MMM, YYYY')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>}
                            {availabelNovelData?.data?.length > 0 && (
                                <div className='flex justify-center pt-12'>
                                    <PaginationControlled
                                        setPage={setPage}
                                        last_page={availabelNovelData?.totalPage}
                                        page={page}
                                    />
                                </div>
                            )}
                        </div>}
                    </div>
                </div>
            }

            {
                tab == 'Faq' &&
                <div className='dark:pt-1 pt-10'>
                    {/* <div className='text-center text-3xl'>Frequently Asked Questions</div> */}
                    <div className='md:px-20 mx-5 md:mx-10 py-10 bg-slate-200 dark:bg-gray-950 px-4 rounded-lg'>
                        {[...Array(5)].map((_, i) => {
                            return (
                                <Accordion className='dark:bg-[#131415] dark:text-white' sx={{ margin: "10px 0", padding: "4px" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Typography className='border border-black dark:border-white px-4 mr-3 rounded-md py-2'>{i + 1}</Typography>
                                            <Typography className='font-semibold ml-2'>Lorem ipsum dolor sit amet 1</Typography>
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

export default Home
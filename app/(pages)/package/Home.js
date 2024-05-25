'use client'
import Image from 'next/image'
import multicoin from '../../../public/assets/Images/coin.png'
import { useState } from 'react';
import useApiService from '@/services/ApiService';
import paypalIcon from '../../../public/assets/Images/paypal.png'
import { Box, CircularProgress, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { COIN_HISTORY } from '@/app/Redux/slice/userSlice';
import LoginBox from '@/components/LoginBox';
import FaqPackage from './FaqPackage';
import NobleTab from './NobleTab';
import CoinTab from './CoinTab';

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
    const { paymentApi, accesssToken } = useApiService()
    const [selectCoinData, setSelectCoinData] = useState()
    const [loadingCoin, setCoinLoading] = useState(false)
    const dispatch = useDispatch()
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleLoginModalOpen = () => setLoginModalOpen(true);
    const handleLoginModalClose = () => setLoginModalOpen(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            if (typeof window !== 'undefined') {
                window.open(res?.data?.data?.url, "_blank")
            }
            setCoinLoading(false)
            setOpen(false)
            accessTokenApi()
        }).catch((er) => {
            console.log(er);
        })
    }

    const accessTokenApi = () => {
        accesssToken().then((res) => {
            dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
        }).catch((er) => {
        })
    }

    return (
        <div className="py-10 pt-16 w-full mx-auto my-4 flex flex-col items-center bg-white dark:bg-[#202020] shadow-md">
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
                                <Image alt='paypal-icon' src={paypalIcon} height={100} width={100} className='h-5 w-5' />
                                <div className='pl-2'>PayPal</div>
                            </div>
                            {/*      <input type='radio' checked /> */}
                        </div>

                        <div className='text-sm pt-4 dark:text-gray-200 text-slate-500'><span className="text-red-500 text-lg">*</span>Secure checkout experience provided by PayPal. No payment method information is stored on JadeScrolls.</div>
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
                <CoinTab
                    handleOpen={handleOpen}
                    handleLoginModalOpen={handleLoginModalOpen}
                    selectCoinData={selectCoinData}
                    setSelectCoinData={setSelectCoinData}
                />
            }

            {
                tab == 'Tiers' &&
                <NobleTab />
            }

            {
                tab == 'Faq' &&
                <FaqPackage />
            }
        </div>
    )
}

export default Home
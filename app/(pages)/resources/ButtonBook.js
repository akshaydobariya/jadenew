'use client'
import useApiService from '@/services/ApiService'
import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import paypalIcon from '../../../public/assets/Images/paypal.png'
import multicoin from '../../../public/assets/Images/coin.png'

import Image from 'next/image';
import LoginBox from '@/components/LoginBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function ButtonBook(props) {
    const [selectCoinData, setSelectCoinData] = useState()
    const [modelOpen, setModelOpen] = useState(false);
    const handleOpen = () => setModelOpen(true);
    const handleClose = () => setModelOpen(false);
    const { paymentApi } = useApiService()
    const [localStorageToken, setLocalStorageToken] = useState()
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleLoginModalOpen = () => setLoginModalOpen(true);
    const handleLoginModalClose = () => setLoginModalOpen(false);
    const [loadingButton, setLoadingButton] = useState(false)
    const buyBook = () => {
        setLoadingButton(true)
        let bookBody = ({
            items: [
                {
                    novelId: props?.item?._id,
                    type: "BOOK"
                },
            ],
            "discountId": null,
            "description": props?.item?.description
        })
        paymentApi(bookBody).then((res) => {
            setLoadingButton(false)
            window.open(res?.data?.data?.url, "_blank")
        }).catch((er) => {
            console.log(er)
        })
    }

    useEffect(() => {
        if (localStorage !== undefined && localStorage.getItem('token')) {
            setLocalStorageToken(localStorage.getItem('token'))
        }
    }, [])

    return (
        <>
            <Modal
                open={modelOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px] dark:bg-[#202020] dark:text-white'>
                    <div className='flex justify-between items-center'>
                        <div className='text-center text-xl pb-2 font-semibold'>Buy Book</div>
                        <div>
                            <CloseIcon className='cursor-pointer' onClick={() => handleClose()} />
                        </div>
                    </div>
                    <div className='rounded-md w-fit flex mx-auto my-0 px-10 bg-gray-800 dark:bg-[#131415] mt-2 dark:text-white shadow-[0_0_4px_1px_#101010]'>
                        <div className='text-white font-semibold border-white pb-1 pt-1 dark:text-gray-200 dark:border-gray-800'>
                            <div className='flex justify-center gap-3'>
                                <Image src={multicoin} alt='coin' className='h-24 w-24' />
                                {/*    <div>{item?.coins}</div> */}
                            </div>
                            <div className='text-center'>$ {props?.item?.novelPrice}</div>
                            <div className='pt-2 pb-1 text-center'>{props?.item?.title.length > 30 ? `${props?.item?.title?.slice(0, 30)}...` : props?.item?.title}</div>
                        </div>
                    </div>

                    <div className='pt-4 font-semibold px-5'>Payment Method</div>
                    <div className='flex items-center justify-between pt-2 gap-3 px-5'>
                        <div className='border rounded-md border-gray-300 w-full py-1 flex items-center px-2'>
                            <img src={paypalIcon} className='h-5 w-5' />
                            <div className='pl-2'>PayPal</div>
                        </div>
                        <input type='radio' checked />
                    </div>
                    <div className='text-sm pt-3 px-5'><span className="text-red-500 text-lg">*</span>Secure checkout experience provided by PayPal. No payment method information is stored on JadeScrolls.</div>
                    <div className='flex justify-end pt-3'>
                        <button onClick={() => buyBook()} className='border px-8 rounded-full bg-blue-600 text-white py-1'>Buy</button>
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

            <div onClick={() => {
                localStorageToken ? handleOpen() : handleLoginModalOpen()
            }} className='cursor-pointer text-center border w-full rounded-full py-1 bg-blue-500 text-white'>Buy Now ${props?.item?.novelPrice !== null && props?.item?.novelPrice}</div>
        </>
    )
}

export default ButtonBook
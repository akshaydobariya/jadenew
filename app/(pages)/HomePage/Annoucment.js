'use client'
import useApiService from '@/services/ApiService'
import { Box, Modal } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function Annoucment() {
    const { getGeneralAnnoucment } = useApiService()
    const [annoucmentData, setAnnoucmentData] = useState()

    useEffect(() => {
        getGeneralAnnoucment().then((res) => {
            console.log(res?.data?.data?.data, "annoucment");
            setAnnoucmentData(res?.data?.data?.data)
        }).catch((er) => {
            console.log(er);
        })
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [announcmentTab, setAnnouncmentTab] = useState("All")

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px]' >
                    <div className='flex justify-between text-center cursor-pointer'>
                        <div onClick={() => setAnnouncmentTab("All")} className={announcmentTab === "All" ? 'border w-full p-2 bg-black text-white' :
                            'border w-full p-2 border-black'}>All</div>
                        <div onClick={() => setAnnouncmentTab("offer")} className={announcmentTab === "All" ? 'border w-full p-2 border-black' :
                            'border w-full p-2 bg-black text-white'}>Offer</div>
                    </div>
                    <ul className='list-disc px-2 pt-2'>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                        <li className='flex justify-between items-center'>
                            <div>Lorem Ipsum is simply dummy text.</div>
                            <div className='text-sm'>13 Dec 2023</div>
                        </li>
                    </ul>
                </Box>
            </Modal>

            <div className="px-4 md:hidden block">
                <div className="text-xl font-semibold pt-3 pb-2">Annoucments</div>
                {annoucmentData?.map((item, index) => {
                    return (
                        <div key={index} className="py-4 px-2 bg-gray-100 dark:bg-gray-950 shadow-md">
                            <div className="font-semibold">{item?.title}</div>
                            <div className="text-gray-700 text-sm">{item?.content}</div>
                            <div className='text-end'>{moment(item?.createdAt).format('DD-MMM-YYYY')}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Annoucment
'use client'
import Image from 'next/image'
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useRouter } from 'next/navigation';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function LatestUpdate(props) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [announcmentTab, setAnnouncmentTab] = useState()
    const [chapterData, setChapterData] = useState([])
    const [selectedNovelId, setSelectedNovelId] = useState()

    return (
        <div className='pt-10 pb-6 md:pb-0 px-4 md:px-8'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px] dark:bg-[#202020]'>
                    <div className='gap-4'>
                        <div className='text-center text-xl pb-2 font-semibold'>Latest Chpater</div>
                        {chapterData?.map((item, index) => {
                            return (
                                <div className='cursor-pointer dark:hover:bg-gray-950 hover:bg-gray-100 pt-2 pb-1 flex justify-between border-b' onClick={() => router.push(`/detail/${selectedNovelId}`)}>
                                    <div className='flex'>
                                        {/* <div className='md:h-10 h-10 w-10'>
                                            <Image width={200} height={200} src={item?.coverImg} alt='updateImg' className='rounded-md h-full w-full object-cover' />
                                        </div> */}
                                        <div className='text-sm flex justify-between'>
                                            <div className='pl-3'>{item?.title.slice(0, 20)}</div>
                                        </div>
                                    </div>

                                    <div className='text-xs'>
                                        <div>{moment(item?.releaseDate).format('ha z')}</div>
                                        <div>{moment(item?.releaseDate).format('DD-MM-YYYY')}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Box>
            </Modal>

            <div className='text-start pb-5'>
                <div className='text-2xl md:text-2xl font-semibold'>Latest Update</div>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-3 md:gap-1 gap-4'>
                {props?.latestUpdateData?.data?.map((item, index) => {
                    return (
                        <div onClick={() => {
                            handleOpen()
                            setChapterData(item?.chapter)
                            setSelectedNovelId(item?._id)
                        }} key={index} className='latestCard shadow-[0px_0px_3px_1px_#d9d1d1] dark:shadow-[4px_4px_9px_-2px_#161212] md:m-3 flex flex-col md:flex-row items-center dark:bg-gray-950 bg-gray-200 rounded-md'>
                            <div className='md:h-32 h-24 w-40'>
                                <Image width={200} height={200} src={item?.coverImg} alt='updateImg' className='rounded-l-md h-full w-full object-cover' />
                            </div>
                            <div className='lg:pl-5 md:pl-2 md:pr-2 pr-0'>
                                <div className='text-lg font-semibold hidden md:block'>{item?.title.length > 22 ? item?.title.slice(0, 22) : item?.title}</div>
                                <div className='md:py-2 py-[2px] text-gray-600 text-sm'>{item?.genre}</div>
                                <Rating
                                    icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                    emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                    value={item?.totalRating}
                                    readOnly
                                    className='hidden md:flex'
                                />
                            </div>
                            <div className="go-corner">
                                <div className="go-arrow text-2xl">
                                    →
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LatestUpdate
'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import coverImage from '../../../../public/assets/Images/chapterCoverImage.jpg'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatSizeIcon from '@mui/icons-material/FormatSize';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DoneIcon from '@mui/icons-material/Done';
import Slide from '@mui/material/Slide';
import NewRelaseFive from '../../../../public/assets/Images/NewRelease/newReleaseFive.jpeg'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Link as ScrollLink, Element, scroller } from 'react-scroll';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SendIcon from '@mui/icons-material/Send';
import useApiService from '@/services/ApiService';
import { usePathname, useRouter } from 'next/navigation';
import { RectHtmlParser } from 'html-react-parser'
import moment from 'moment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, CircularProgress, Modal } from '@mui/material';
import Link from 'next/link';
import rightArrowIcon from '../../../../public/assets/icon/rightArrow.png'
import leftArrowIcon from '../../../../public/assets/icon/leftArrow.png'
import premiumIcon from '../../../../public/assets/Images/PackagePage/crown.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HomeIcon from '@mui/icons-material/Home';
import coin from '../../../../public/assets/Images/Coins/coin.png'
import BuyIcon from '../../../../public/assets/Images/buy.png'
import lockChapter from '../../../../public/assets/icon/lockChapter.png'
import { ToastContainer, toast } from 'react-toastify';
import PaginationControlled from '@/components/pagination';
import LoginBox from '@/components/LoginBox';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import IconLock from '../../../../public/assets/Images/lock.webp'
import { useDispatch } from 'react-redux';
import { COIN_HISTORY } from '@/app/Redux/slice/userSlice';
import multicoin from '../../../../public/assets/Images/multi-coin.gif'
import paypalIcon from '../../../../public/assets/Images/paypal.png'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function ChapterDetail() {
    const pathname = usePathname()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openModel, setOpenModel] = React.useState(false);
    const [changefontSize, setChangefontSize] = useState(16)
    const [changeLineHeight, setChangeLineHeight] = useState(1.8)
    const [lineHeightValue, setLineHeightValue] = useState(24)
    const [fontFamily, setFontFamily] = useState("openSans")
    const [contrastValue, setContrastValue] = useState("white")
    const [chpaterData, setChpaterData] = useState()
    const [commentInput, setCommentInput] = useState('')
    const [loginModal, setLoginModal] = useState(false);
    const [changeChapterBtn, setChangeChapterBtn] = useState(1)
    const [replyComment, setReplyComment] = useState()
    const [replyCommentMode, setReplyCommentMode] = useState(false)
    const { paymentApi, accesssToken, buyChapter, chpaterAnnoucment, getChapter, postComment, likeComment, dislikeComment, postReplyComment, chepterCompleteStatus } = useApiService()
    const router = useRouter()
    //scrool header 
    const [scrollDirection, setScrollDirection] = React.useState(null);
    const [scoll, setScroll] = useState(null)
    const [likeCount, setLikeCount] = useState(false)
    const [replyCommentInput, setReplyCommentInput] = useState()
    const [replyCommentUi, setReplyCommentUi] = useState()
    const [replyCommentUiMode, setReplyCommentUiMode] = useState(false)
    const [localStorageToken, setLocalStorageToken] = useState()
    const [localStorageTheme, setLocalStorageTheme] = useState()
    const [commentData, setCommentData] = useState()
    const [page, setPage] = useState(1);
    const [confirm, setConfirm] = useState(false);
    const [chapterAnnoucmentData, setChapterAnnoucmentData] = useState([])
    const [annoucmentModal, setAnnoucmentModal] = useState(false);
    const handleAnnoucmentOpen = () => setAnnoucmentModal(true);
    const handleAnnoucmentClose = () => setAnnoucmentModal(false);
    const [hideAnnoucment, setHideAnnoucment] = useState(true)
    const [annoucmentModelData, setAnnoucmentModelData] = useState()
    const [confirmTiers, setConfirmTiers] = useState(false)
    const [selectTirsModalData, setSelectTirsModalData] = useState(false)
    const dispatch = useDispatch()
    const [modeOpen, setModeOpen] = useState(false);
    const handleOpen = () => setModeOpen(true);
    const handleClose = () => setModeOpen(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (localStorage !== undefined && localStorage.getItem('theme')) {
            console.log('first')
            setLocalStorageTheme(localStorage.getItem('theme'))
        }
    }, [localStorageTheme])

    useEffect(() => {
        setLocalStorageToken(localStorage.getItem('token'))
    }, [])

    const totalCoinsData = () => {
        accesssToken().then((res) => {
            dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
        }).catch((er) => {
        })
    }

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            setScroll(scrollY);

            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", updateScrollDirection);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("scroll", updateScrollDirection);
            }
        };
    }, [scrollDirection]);

    useEffect(() => {
        chapterPageData()
    }, [likeCount, page])

    useEffect(() => {
        // purchaseHistory()
    }, [])

    const chapterPageData = () => {
        const path = pathname.slice(9)
        const localUserId = localStorage.getItem('user_id')
        let url;
        if (localStorage.getItem('token')) {
            url = `page=${page}&limit=10&id=${path}&userId=${localUserId}`
        } else {
            url = `page=${page}&limit=10&id=${path}`
        }
        getChapter(url).then((res) => {
            setChpaterData(res?.data?.data)
            setCommentData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error chapter");
        })
    }

    const tiersBuy = (data) => {
        console.log(data, 'first')
        const tierBody = ({
            items: [
                {
                    "novelId": chpaterData?.novelId?._id,
                    "tierId": data?._id,
                    "type": "TIER",
                },
            ],
            "discountId": null,
            "description": data?.tierDescription
        })
        paymentApi(tierBody).then((res) => {
            window.open(res?.data?.data?.url)
        }).catch((er) => {
            console.log(er);
        })
    }

    const handleChange = (e) => {
        setCommentInput(e.target.value);
    }

    const handleReplyChange = (e) => {
        setReplyCommentInput(e.target.value)
    }

    const handleSubmit = () => {
        const path = pathname.slice(9)
        const form = new FormData()
        form.append('comment', commentInput)
        setCommentInput('')
        postComment(path, form).then((res) => {
            console.log('comment res', res);
            chapterPageData()
        }).catch((er) => {
            console.log('Error Comment');
        })
    }

    const likeCommentApi = (id) => {
        likeComment(id).then((res) => {
            console.log(res);
            setLikeCount(!likeCount)
        }).catch((er) => {
            console.log(er, "Error Like Comment");
        })
    }

    const dislikeCommentApi = (id) => {
        dislikeComment(id).then((res) => {
            console.log(res, "dislike comment");
            setLikeCount(!likeCount)
        }).catch((er) => {
            console.log(er, "Error dislike comment");
        })
    }

    const commentReplyApi = (id, commentID) => {
        const url = `id=${id}&commentId=${commentID}`
        const form = new FormData()
        form.append('comment', replyCommentInput)
        setReplyCommentInput('')
        postReplyComment(url, form).then((res) => {
            console.log(res, "res reply");
            chapterPageData()
            setReplyCommentMode(false)
        }).catch((er) => {
            console.log(er, "Error reply comment");
        })
    }

    const nextChapter = (id) => {
        let chpaterNumber = id?.novelId?.chapter.find((item) => item?.chapterNo == chpaterData?.chapterNo);
        let currentChapter = chpaterNumber?.chapterNo + 1;
        console.log(currentChapter, "current chapter")
        let nextChapterData = chpaterData?.novelId?.chapter.filter((item) => item?.chapterNo == currentChapter)
        if (nextChapterData[0]?._id?.length > 0) {
            nextPrevButtonData(nextChapterData[0]?._id)
        }
    }

    const previousChapter = (id) => {
        let chpaterNumber = id?.novelId?.chapter.find((item) => item?.chapterNo == chpaterData?.chapterNo);
        let currentChapter = chpaterNumber?.chapterNo - 1;
        let previousChapterData = chpaterData?.novelId?.chapter.filter((item) => item?.chapterNo == currentChapter)
        console.log(previousChapterData, "previousChapterData")
        if (previousChapterData?.length > 0) {
            nextPrevButtonData(previousChapterData[0]?._id)
        }
    }

    const nextPrevButtonData = (id) => {
        router.push(`/chapter/${id}`)
        // const localUserId = localStorage.getItem('user_id')
        // let url;
        // if (localStorage.getItem('token')) {
        //     url = `id=${id}&userId=${localUserId}`
        // } else {
        //     url = `id=${id}`
        // }
        // getChapter(url).then((res) => {
        //     setChpaterData(res?.data?.data)
        // }).catch((er) => {
        //     console.log(er, "Error chapter");
        // })
    }

    useEffect(() => {
        if (scoll > 20) {
            const form = new FormData()
            form.append('chapterId', chpaterData?._id)
            form.append('novelId', chpaterData?.novelId?._id)
            chepterCompleteStatus(form).then((res) => {
                console.log(res, "chapter status");
            }).catch((er) => {
                console.log(er);
            })
        }
    }, [scoll > 20])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (chpaterData?.novelId?._id !== undefined) {
                const path = pathname.slice(9)
                const url = `novelId=${chpaterData?.novelId?._id}&chapterId=${path !== undefined && path}`
                chpaterAnnoucment(url).then((res) => {
                    console.log(res?.data?.data, "chapter res");
                    setChapterAnnoucmentData(res?.data?.data)
                }).catch((er) => {
                    console.log(er);
                })
            }
        }
    }, [chpaterData])

    const buyChapterByCoins = () => {
        const form = new FormData()
        form.append("id", chpaterData?._id)
        buyChapter(form).then((res) => {
            chapterPageData()
            toast.success(res?.data?.data)
            totalCoinsData()
        }).catch((er) => {
            console.log(er?.response?.data?.error);
            toast.error(er?.response?.data?.error)
        })
    }

    return (
        <>
            {/* Purchase confirmation */}
            <Modal
                open={confirm}
                onClose={() => { setConfirm(false); }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=''
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <div className='relative block'>
                    <Box sx={style} className='dark:bg-[#202020] dark:text-white md:w-[550px] w-[320px] h-max-[250px]'>
                        <div className='flex justify-between pt-1 pb-2 items-center'>
                            <div className="text-xl font-semibold ">Confirmation</div>
                            <CloseIcon onClick={() => setConfirm(false)} className='cursor-pointer' />
                        </div>
                        <hr className='mb-4' />
                        <div className='my-10 text-center w-full'>
                            <p>Are you sure you want to pay <b>{chpaterData?.purchaseByCoinValue} coins</b> for this chapter.</p>
                        </div>
                        <div className='flex gap-2 justify-center'>
                            <button className='bg-blue-500 text-white cursor-pointer rounded-md px-6 py-2' onClick={() => buyChapterByCoins()} >Pay & Unlock</button>
                        </div>
                    </Box>
                </div>
            </Modal>

            <Modal
                open={modeOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[550px] w-[320px] dark:bg-[#202020] dark:text-white'>
                    <div className='flex justify-between items-center'>
                        <div className='text-center text-xl pb-2 font-semibold'>Confirm</div>
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
                            <div className='text-center'>$ {selectTirsModalData?.price}</div>
                            <div className='pt-2 pb-1 text-center'>{selectTirsModalData?.tierName}</div>
                        </div>
                    </div>

                    <div className='pt-3 font-semibold'>Payment Method</div>
                    <div className='flex items-center justify-between pt-2 gap-3'>
                        <div className='border rounded-md border-gray-300 w-full py-1 flex items-center px-2'>
                            <Image src={paypalIcon} height={100} width={100} className='h-5 w-5' />
                            <div className='pl-2'>PayPal</div>
                        </div>
                        <input type='radio' checked />
                    </div>
                    <div className='text-sm pt-4'>Secure checkout experience provided by PayPal. No payment method information is stored on JadeScroll.</div>
                    <div className='flex justify-end pt-3'>
                        <button onClick={() => tiersBuy(selectTirsModalData)} className='border px-8 rounded-full bg-blue-600 text-white py-1'>Buy</button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={confirmTiers}
                onClose={() => { setConfirmTiers(false); }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=''
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Box sx={style} className='md:w-[70%] w-[90%] h-[60%] md:h-[70%] bg-white dark:bg-[#121212] dark:text-white overflow-y-scroll'>
                    {(chpaterData?.novelId?.subscription.length > 0 && chpaterData?.novelId?.subscription[0] !== '') &&
                        <div id='premiumPlan' className='lg:px-10 text-white pb-12 pt-4'>
                            <div className='flex justify-between items-center pb-6'>
                                <div className='text-center text-3xl text-black dark:text-white'>All Premium Plans</div>
                                <CloseIcon onClick={() => setConfirmTiers(false)} className='cursor-pointer dark:text-white text-black' />
                            </div>
                            <div className='grid md:grid-cols-2 gap-4'>
                                {chpaterData?.novelId?.subscription.map((item, i) => {
                                    return (
                                        <div key={i} className='border p-4 rounded-md bg-[#131415]'>
                                            <div className='border-b border-gray-400 pb-6'>
                                                <div className='flex'>
                                                    <Image src={premiumIcon} alt='' className='w-5 h-5' />
                                                    <div className='pl-2'>{item?.tierNo}</div>
                                                </div>
                                                <div className={`text-2xl font-semibold py-2 ${i == 0 ? 'text-[#CFF56A]' : i == 1 ? 'text-[#FFD2D7]' : i == 2 ? 'text-[#C4B1D4]' : 'text-[#FFC862]'}`}>{item?.tierName}</div>
                                                <div className='py-1'>Validity: {item?.purchaseValidityInDays}</div>
                                                <div>Chapters: {item?.fromChapter} to {item?.toChapter}</div>
                                            </div>
                                            <div className='pt-6'>{item?.tierDescription}</div>
                                            <button onClick={() => {
                                                setSelectTirsModalData(item)
                                                handleOpen()
                                            }} className={`w-full rounded-full py-3 mt-7 text-black font-semibold ${i == 0 ? 'bg-[#CFF56A]' : i == 1 ? 'bg-[#FFD2D7]' : i == 2 ? 'bg-[#C4B1D4]' : 'bg-[#FFC862]'} `}>Buy Now ${item?.price}</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}
                </Box>
            </Modal>

            <Modal
                open={loginModal}
                onClose={() => { setLoginModal(false); }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=''
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Box sx={style} className='md:w-[640px] w-[320px] dark:bg-[#202020] dark:text-white'>
                    <div className='flex justify-end'><CloseIcon className='cursor-pointer' onClick={() => setLoginModal(false)} /></div>
                    <LoginBox />
                </Box>
            </Modal>
            <ToastContainer />
            {scrollDirection == 'down' &&
                <div className='bg-gray-300 dark:bg-[#202020] dark:text-white text-black flex items-center justify-between px-5 py-[21px] fixed top-0 left-0 w-full z-50'>
                    <Link href={{ pathname: '/' }}><HomeIcon className='cursor-pointer dark:text-gray-200' /></Link>
                    <div className='font-semibold dark:text-gray-200'>Chapter {chpaterData?.chapterNo} - {chpaterData?.title}</div>
                    <div></div>
                </div>
            }
            {chpaterData !== undefined ?
                <div className={contrastValue == 'gray' ? 'bg-gray-100 dark:bg-[#333333]' : 'bg-white dark:bg-[#131415] dark:text-white'}>
                    <Drawer
                        sx={{
                            width: 330,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 330,
                                boxSizing: 'border-box',
                                backgroundColor: localStorageTheme == 'dark' ? '#202020' : '#FFFFFF'
                                // paddingTop: 1
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <Box className="dark:bg-[#202020] dark:text-white" >
                            <Box>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon className='dark:text-white text-black' /> : <ChevronRightIcon className='dark:text-white text-black' />}
                                </IconButton>
                            </Box>
                            <Divider />
                            <List>
                                {chpaterData?.novelId?.chapter?.map((text, index) => (
                                    <div key={index} onClick={() => nextPrevButtonData(text?._id)} className={chpaterData?._id == text?._id && 'text-teal-500'}>
                                        {/* <div className='pl-4 text-sm pt-1'>chapter {text?.chapterNo}</div> */}
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ borderBottom: "1px solid #e5e1e1", fontWeight: 600 }}>
                                                <span className='pr-3 text-sm'>{text?.chapterNo}.</span>
                                                <ListItemText className='capitalize' primary={text?.title} />
                                                {!text?.isPurchased && <LockIcon fontSize='small' className='text-blue-400' />}
                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                ))}
                            </List>
                        </Box>
                    </Drawer>


                    <Modal
                        open={annoucmentModal}
                        onClose={handleAnnoucmentClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className=''
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <div className='relative block'>

                            <Box sx={style} className='dark:bg-[#202020] md:w-[550px] w-[320px] h-max-[250px] overflow-y-scroll'>
                                <div className='flex justify-between pt-1 pb-2 items-center'>
                                    <div className="text-xl font-semibold ">{annoucmentModelData?.title}</div>
                                    <CloseIcon onClick={handleAnnoucmentClose} className='cursor-pointer' />
                                </div>
                                <hr />
                                <div>{annoucmentModelData?.content}</div>
                            </Box>
                        </div>
                    </Modal>

                    <div className='md:px-20 lg:px-56 px-4 mt-[60px]'>
                        {hideAnnoucment &&
                            chapterAnnoucmentData?.map((item, index) => {
                                return (
                                    <div div className='pb-2 pt-[24px]'>
                                        <div className='flex justify-between border py-2 rounded-lg px-3 bg-blue-400 text-white'>
                                            <div className='flex flex-col'>
                                                <div className='md:hidden block'>{item?.title?.length > 25 ? `${item?.title?.slice(0, 30)}..` : item?.title}</div>
                                                <div className='hidden md:block'>{item?.title?.length > 45 ? `${item?.title?.slice(0, 45)}..` : item?.title}</div>
                                                <div className='text-xs pt-[2px]'>{moment(item?.createdAt).format('DD MMM, YYYY')}</div>
                                            </div>
                                            <div className='flex items-center flex-col-reverse md:flex-row justify-end'>
                                                <div onClick={() => {
                                                    handleAnnoucmentOpen()
                                                    setAnnoucmentModelData(item)
                                                }} className='pr-3 cursor-pointer text-xs'>show more</div>
                                                <CloseIcon className='cursor-pointer text-end' onClick={() => setHideAnnoucment(false)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className='bg-gray-100 dark:bg-[#202020] pt-14 mt-4'>
                            <Link className='flex justify-center cursor-pointer' href={{ pathname: `/detail/${chpaterData?.novelId?._id}` }}>
                                <Image height={800} width={800} src={chpaterData?.novelId?.coverImg} alt='novel image' className='rounded-md h-44 w-44 ml-1' />
                            </Link>

                            <div className='flex flex-col justify-center'>
                                <div className='flex items-center justify-center py-3'>
                                    {/* <Image className='cursor-pointer h-8 w-8' src={leftArrowIcon} alt='' onClick={() => previousChapter(chpaterData)} /> */}
                                    <KeyboardArrowLeftIcon className='cursor-pointer border rounded-full border-[#20A7FE}' onClick={() => previousChapter(chpaterData)} />
                                    <div className='flex flex-col text-center justify-center  px-4'>
                                        <div className='pb-1 text-gray-700 dark:text-gray-100 text-lg font-semibold'>Chapter {chpaterData?.chapterNo} - {chpaterData?.title}</div>
                                    </div>
                                    <ChevronRightIcon className='cursor-pointer rounded-full border border-[#20A7FE}' onClick={() => nextChapter(chpaterData)} />
                                    {/* <Image className='cursor-pointer h-8 w-8' src={rightArrowIcon} alt='' onClick={() => nextChapter(chpaterData)} /> */}
                                </div>
                                <div className='flex flex-col items-center w-full pb-10'>
                                    <div className='text-sm'>Author: {chpaterData?.novelId?.authorId?.name}</div>
                                    <div className='text-xs pt-2'>© JadeScroll</div>
                                </div>
                            </div>
                        </div>

                        <div className='relative shadow-md'>
                            <div className='bg-gray-100 dark:bg-[#202020] border shadow-md mt-1 rounded-xl pt-4 pb-16 px-5  text-gray-800 dark:text-gray-300 font-[500] tracking-wider'
                                dangerouslySetInnerHTML={{ __html: chpaterData?.content }}
                                style={{ fontSize: changefontSize, lineHeight: changeLineHeight }}>
                            </div>

                            {!chpaterData?.isPurchased &&
                                <div className='flex flex-col'>
                                    <div className='absolute bottom-[0.18rem] rounded-md bg-gradient-to-b dark:from-[#ffffff00] dark:to-[#706f6f] from-[#ffffff00] to-[#dbd8d8] flex justify-center py-16' style={{ height: '100%', width: "100%" }}>
                                        <Image src={IconLock} height={300} width={300} className='h-12 w-12 absolute bottom-28' />
                                        <div className='flex justify-center '>
                                            <div onClick={() => {
                                                //buyChapterByCoins()
                                                if (localStorageToken) {
                                                    setConfirm(true);
                                                } else {
                                                    setLoginModal(true);
                                                }
                                            }} className='cursor-pointer absolute bottom-16 text-black border-slate-400 border py-2 px-6 rounded-full flex items-center'>BUY AND READ <span className='ml-2 mr-1'><Image src={coin} className='w-4 h-4' height={100} width={100} /> </span> {chpaterData?.purchaseByCoinValue}</div>
                                        </div>
                                    </div>
                                    <div className='rounded-md bg-gradient-to-b dark:from-[#ffffff00] dark:to-[#706f6f] from-[#ffffff00] to-[#dbd8d8] flex justify-center py-16' style={{ height: '100%', width: "100%" }}>
                                        <div className='flex justify-center '>
                                            <div onClick={() => {
                                                //buyChapterByCoins()
                                                if (localStorageToken) {
                                                    setConfirmTiers(true);
                                                } else {
                                                    setLoginModal(true);
                                                }
                                            }} className='cursor-pointer absolute bottom-2 text-black border-slate-400 border py-2 px-6 rounded-full flex items-center'>Subscribe for all chapters</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {chpaterData?.authorNote && <div className='dark:text-gray-300  text-gray-800 dark:bg-[#202020] border p-3 dark:my-4 mt-4 rounded-md shadow-md text-sm leading-6'>
                            <div className='text-base pb-[6px]'>Author's Note</div>
                            <div dangerouslySetInnerHTML={{ __html: chpaterData?.authorNote }}></div>
                        </div>}
                        {/*{localStorageToken ?
                            !chpaterData?.isPurchased &&
                            <div id='loginCard' className='py-7 border w-max m-auto px-16 mt-4 mb-4 rounded-md shadow-[0px_4px_14px_1px_#ddd2d2] dark:shadow-lg'>
                                <div className='text-center pb-2 font-semibold'>To Unlock this chapter <br /> click on buy Button</div>
                                <Image src={lockChapter} height={300} width={300} className='h-[4.5rem] w-20 flex justify-center m-auto' />
                                <div className='flex justify-center my-5'>
                                    <div onClick={() => buyChapterByCoins()} className='cursor-pointer border py-2 px-12 rounded-full bg-blue-500 text-white flex items-center'>BUY AND READ <span className='ml-2 mr-1'><Image src={coin} className='w-4 h-4' height={100} width={100} /> </span> {chpaterData?.purchaseByCoinValue}</div>
                                </div>
                            </div> :
                            <LoginBox />
                        }
                        */}
                        <div className='flex justify-between textThemeColor pb-5 mt-4'>
                            <button className='flex items-center' onClick={() => previousChapter(chpaterData)}>
                                <KeyboardBackspaceIcon fontSize='small' />
                                <div className='pl-1'>Previous</div>
                            </button>
                            <button className='flex items-center' onClick={() => nextChapter(chpaterData)}>
                                <div className='pr-1'>Next</div>
                                <EastIcon fontSize='small' />
                            </button>
                        </div>
                        <hr className='my-2' />


                        <div div className='pt-8 pb-5 bg-gray-200 dark:bg-[#202020] px-2 md:px-10 rounded-md  shadow-md my-6'>
                            {/* {(chpaterData?.comment?.data?.length > 0 && chpaterData?.isPurchased) &&  */}
                            <div className='text-2xl pb-4'>Reviews</div>
                            {/* // } */}
                            {/* {(localStorageToken && chpaterData?.isPurchased) &&
                            } */}
                            <div className='border p-3 bg-gray-200 rounded-md dark:bg-[#323232]'>
                                <textarea onChange={handleChange} value={commentInput} placeholder='Add a comment*' className='text-gray-800 dark:text-gray-200 dark:bg-[#202020] mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
                                <div className='flex justify-end'>
                                    <div onClick={() => {
                                        if (!localStorageToken) {
                                            setLoginModal(true)
                                        } else if (!chpaterData?.isPurchased) {
                                            setConfirm(true)
                                        } else {
                                            handleSubmit()
                                        }
                                    }} className='border rounded-full px-3 py-1 text-lg bg-blue-600 text-white cursor-pointer'>Submit</div>
                                </div>
                            </div>

                            {chpaterData?.comment?.data?.length > 0 &&
                                <div className='bg-white dark:bg-[#131415] shadow-md rounded-md mt-3 md:mt-0'>
                                    <div className='max-h-[50vh] overflow-y-scroll px-4'>
                                        {chpaterData?.comment?.data?.length > 0 && chpaterData?.comment?.data?.map((item, i) => {
                                            return (
                                                <div key={i}>
                                                    <div className='my-3 flex rounded-md p-3 bg-gray-200 dark:bg-[#202020] dark:text-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                                        <div>
                                                            {item?.userId?.profileImg == null ?
                                                                <Avatar className='md:h-16 md:w-16 w-16 h-16' /> :
                                                                <Image height={200} width={200} alt='' src={item?.userId?.profileImg} className='md:h-16 md:w-16 w-16 h-16 object-cover rounded-full' />
                                                            }
                                                        </div>
                                                        <div className='md:pl-4 pl-2'>
                                                            <div className='flex items-center'>
                                                                <div className='text-lg font-semibold capitalize'>{item?.userId?.name}</div>
                                                                <div className='pl-3 text-sm'>{moment(item?.createdAt).format('DD MMM YYYY')}</div>
                                                            </div>
                                                            <div className='text-sm py-1'>{item?.comment}</div>
                                                            <div className='flex'>
                                                                {/* {item?.like.length > 0 ?
                                                                    <ThumbUpAltIcon className='cursor-pointer mr-2' onClick={() => likeCommentApi(item?._id)} /> :
                                                                    <ThumbUpOffAltIcon className='cursor-pointer mr-2' onClick={() => likeCommentApi(item?._id)} />
                                                                    }

                                                                    {item?.dislike.length > 0 ?
                                                                    <ThumbDownAltIcon className='cursor-pointer' onClick={() => dislikeCommentApi(item?._id)} /> :
                                                                    <ThumbDownOffAltIcon className='cursor-pointer' onClick={() => dislikeCommentApi(item?._id)} />
                                                                } */}
                                                                {localStorageToken ?
                                                                    <button className='pr-3 text-sm font-semibold' onClick={() => {
                                                                        setReplyComment(item?._id)
                                                                        setReplyCommentMode(!replyCommentMode)
                                                                    }}>Reply</button>
                                                                    :
                                                                    <div className='pr-3 text-sm font-semibold'>Reply</div>
                                                                }
                                                                {item?.reply.length > 0 &&
                                                                    <div className='pt-1 text-sm text-[#20A7FE] cursor-pointer' onClick={() => {
                                                                        setReplyCommentUi(item?._id)
                                                                        setReplyCommentUiMode(!replyCommentUiMode)
                                                                    }}>
                                                                        <span>view {item?.reply.length} more reply</span>
                                                                        {(replyCommentUi == item?._id && replyCommentUiMode) ?
                                                                            <span><KeyboardArrowUpIcon fontSize='small' /></span> :
                                                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {(replyComment == item?._id && replyCommentMode) &&
                                                        <div className='flex items-center pl-6'>
                                                            <textarea onChange={handleReplyChange} value={replyCommentInput} placeholder='Reply' className='dark:bg-[#202020] mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
                                                            <SendIcon onClick={() => commentReplyApi(chpaterData?._id, item?._id)} className='border rounded-full p-2 text-3xl bg-blue-600 text-white cursor-pointer' />
                                                        </div>
                                                    }
                                                    <span>
                                                        {(replyCommentUi == item?._id && replyCommentUiMode) &&
                                                            item?.reply?.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='ml-10 my-3 flex rounded-md p-3 bg-gray-200 dark:bg-[#202020] dark:text-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                                                        <div>
                                                                            {/* {item?.userId?.profileImg == null ? */}
                                                                            <Avatar />
                                                                            {/* // :
                                                                    // <Image alt='' height={100} width={100} src={item?.userId?.profileImg} className='md:h-16 md:w-16 w-24 h-16 object-cover rounded-md' />} */}
                                                                        </div>
                                                                        <div className='md:pl-4 pl-2'>
                                                                            <div className='flex items-center'>
                                                                                <div className='text-lg font-semibold capitalize'>{item?.userId?.name}</div>
                                                                                <div className='pl-3 text-sm'>{moment(item?.createdAt).format('DD MMM YYYY')}</div>
                                                                            </div>
                                                                            <div className='text-sm py-1'>{item?.comment}</div>
                                                                            {/* <div className=''>
                                                                    {item?.like?.length > 0 ?
                                                                        <ThumbUpAltIcon className='cursor-pointer mr-2' onClick={() => likeCommentApi(item?._id)} /> :
                                                                        <ThumbUpOffAltIcon className='cursor-pointer mr-2' onClick={() => likeCommentApi(item?._id)} />
                                                                    }

                                                                    {item?.dislike?.length > 0 ?
                                                                        <ThumbDownAltIcon className='cursor-pointer' onClick={() => dislikeCommentApi(item?._id)} /> :
                                                                        <ThumbDownOffAltIcon className='cursor-pointer' onClick={() => dislikeCommentApi(item?._id)} />
                                                                    }
                                                                </div> */}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {chpaterData?.comment?.data?.length > 0 && (
                                        <div className='flex justify-center'>
                                            <PaginationControlled
                                                setPage={setPage}
                                                last_page={chpaterData?.comment?.totalPage}
                                                page={page}
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>

                    {scrollDirection == 'up' &&
                        <div className='bg-gray-300 dark:bg-[#202020] dark:text-white flex items-center justify-between px-5 mt-2 py-2 fixed left-0 bottom-0 w-full'>
                            <MenuIcon onClick={handleDrawerOpen} className='cursor-pointer dark:text-gray-200' />
                            <div className='flex items-center'>
                                <div>
                                    <FormatSizeIcon className='cursor-pointer dark:text-gray-200' fontSize='large' onClick={() => setOpenModel(true)} />
                                </div>
                                <div className='flex gap-x-4 text-gray-700 dark:text-gray-200'>
                                    <ArrowLeftIcon fontSize='large' className='cursor-pointer h-8 w-8' src={leftArrowIcon} alt='' onClick={() => previousChapter(chpaterData)} />
                                    <ArrowRightIcon fontSize='large' className='cursor-pointer h-8 w-8' src={rightArrowIcon} alt='' onClick={() => nextChapter(chpaterData)} />
                                </div>
                            </div>
                        </div>
                    }

                    <Dialog
                        open={openModel}
                        onClose={() => setOpenModel(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        TransitionComponent={Transition}
                        keepMounted
                    >
                        <DialogContent className='dark:bg-[#202020] dark:text-white'>
                            <div className='flex items-center justify-between py-3'>
                                <div className='font-semibold pt-1'>Text Size</div>
                                <div className='flex'>
                                    <div onClick={() => setChangefontSize(changefontSize == 16 ? changefontSize : changefontSize - 2)}
                                        className='cursor-pointer border rounded-full px-[10px] bg-gray-200 dark:bg-[#131415] font-semibold'>-</div>
                                    <div className='px-3'>{changefontSize}</div>
                                    <div onClick={() => setChangefontSize(changefontSize == 40 ? changefontSize : changefontSize + 2)}
                                        className='cursor-pointer border rounded-full px-[10px] bg-gray-200 dark:bg-[#131415] font-semibold'>+</div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between py-3'>
                                <div className='font-semibold pt-1'>Line height</div>
                                <div className='flex'>
                                    <div onClick={() => {
                                        setChangeLineHeight(changeLineHeight == 2 ? changeLineHeight : changeLineHeight - .1)
                                        setLineHeightValue(lineHeightValue == 2 ? lineHeightValue : lineHeightValue - 2)
                                    }
                                    } className='cursor-pointer border rounded-full px-[10px] bg-gray-200 dark:bg-[#131415] font-semibold'>-</div>
                                    <div className='px-3'>{lineHeightValue}</div>
                                    <div onClick={() => {
                                        setChangeLineHeight(changeLineHeight == 40 ? changeLineHeight : changeLineHeight + .1)
                                        setLineHeightValue(lineHeightValue == 40 ? lineHeightValue : lineHeightValue + 2)
                                    }} className='cursor-pointer border rounded-full px-[10px] bg-gray-200 dark:bg-[#131415] font-semibold'>+</div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between py-3'>
                                <div className='font-semibold  pr-2'>Contrast</div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <div className='border px-6 rounded-xl' onClick={() => setContrastValue("gray")}>
                                        {contrastValue == "gray" ? <DoneIcon /> : "A"}
                                    </div>
                                    <div className='border rounded-xl px-6 bg-gray-200  dark:bg-[#131415] underline font-semibold' onClick={() => setContrastValue("white")}>
                                        {contrastValue == "white" ? <DoneIcon /> : "A"}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div >
                :
                <div className='pt-32 pb-64 min-h-[80vh] flex justify-center text-lg flex-col items-center'>
                    <CircularProgress className='mb-4' />
                    Preparing chapter for you please wait...</div>
            }
        </>
    )
}

export default ChapterDetail
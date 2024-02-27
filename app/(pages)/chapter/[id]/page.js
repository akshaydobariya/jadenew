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
import { Avatar, Modal } from '@mui/material';
import Link from 'next/link';
import rightArrowIcon from '../../../../public/assets/icon/rightArrow.png'
import leftArrowIcon from '../../../../public/assets/icon/leftArrow.png'
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
import IconLock from '../../../../public/assets/icon/padlock.png'

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
    const [changeChapterBtn, setChangeChapterBtn] = useState(1)
    const [replyComment, setReplyComment] = useState()
    const [replyCommentMode, setReplyCommentMode] = useState(false)
    const { buyChapter, chpaterAnnoucment, getChapter, postComment, likeComment, dislikeComment, postReplyComment, chepterCompleteStatus } = useApiService()
    const router = useRouter()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //scrool header 
    const [scrollDirection, setScrollDirection] = React.useState(null);
    const [scoll, setScroll] = useState(null)
    const [likeCount, setLikeCount] = useState(false)
    const [replyCommentInput, setReplyCommentInput] = useState()
    const [replyCommentUi, setReplyCommentUi] = useState()
    const [replyCommentUiMode, setReplyCommentUiMode] = useState(false)
    const [localStorageToken, setLocalStorageToken] = useState()
    const [commentData, setCommentData] = useState()
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLocalStorageToken(localStorage.getItem('token'))
    }, [])

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
            const path = pathname.slice(9)
            chpaterAnnoucment(path).then((res) => {
                console.log(res, "chapter res");
            }).catch((er) => {
                console.log(er);
            })
        }
    }, [])

    const buyChapterByCoins = () => {
        const form = new FormData()
        form.append("id", chpaterData?._id)
        buyChapter(form).then((res) => {
            console.log(res, "buy coins");
            chapterPageData()
            toast.success(res?.data?.data)
        }).catch((er) => {
            console.log(er);
        })
    }

    const [annoucmentModal, setAnnoucmentModal] = useState(false);
    const handleAnnoucmentOpen = () => setAnnoucmentModal(true);
    const handleAnnoucmentClose = () => setAnnoucmentModal(false);
    const [hideAnnoucment, setHideAnnoucment] = useState(true)

    return (
        <>
            <ToastContainer />
            {scrollDirection == 'down' &&
                <div className='bg-gray-300 dark:bg-[#202020] dark:text-white text-black flex items-center justify-between px-5 py-[21px] fixed top-0 left-0 w-full z-50'>
                    <Link href={{ pathname: '/' }}><HomeIcon className='cursor-pointer dark:text-gray-200' /></Link>
                    <div className='font-semibold dark:text-gray-200'>Chapter {chpaterData?.chapterNo} - {chpaterData?.title}</div>
                    <div></div>
                </div>
            }
            {chpaterData !== undefined ?
                <div className={contrastValue == 'gray' ? 'bg-gray-100 pt-20' : 'bg-white dark:bg-[#131415] dark:text-white pt-4'}>

                    <Drawer
                        sx={{
                            width: 330,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 330,
                                boxSizing: 'border-box',
                                paddingTop: 1
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <Box>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
                                            <ListItemText primary={text?.title} />
                                            {!text?.isPurchase && <LockIcon fontSize='small' className='text-blue-400' />}
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
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

                            <Box sx={style} className='md:w-[550px] w-[320px] h-max-[250px] overflow-y-scroll'>
                                <div className='flex justify-between pt-1 pb-2 items-center'>
                                    <div className="text-xl font-semibold ">The Elusive Legacy</div>
                                    <CloseIcon onClick={handleAnnoucmentClose} className='cursor-pointer' />
                                </div>
                                <hr />
                                {/* <div>{annoucmentFullData}</div> */}
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Box>
                        </div>
                    </Modal>

                    <div className='md:px-20 lg:px-56 px-4 mt-[60px]'>
                        {hideAnnoucment &&
                            <div className=''>
                                <div className='flex justify-between border py-2 rounded-lg px-3 bg-blue-400 text-white'>
                                    <div className='flex items-center'>
                                        <div>THE PERFECT LUNA</div>
                                        <div className='text-xs pl-2'>11 days ago</div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div onClick={handleAnnoucmentOpen} className='pr-3 cursor-pointer text-xs'>Show more</div>
                                        <CloseIcon className='cursor-pointer' onClick={() => setHideAnnoucment(false)} />
                                    </div>
                                </div>
                            </div>
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

                        <div className='relative'>
                            <div className='bg-gray-100 dark:bg-[#202020] mt-1 rounded-xl pt-4 pb-2 px-5 text-gray-800 dark:text-gray-300 font-[500] tracking-wider'
                                dangerouslySetInnerHTML={{ __html: chpaterData?.content }}
                                style={{ fontSize: changefontSize, lineHeight: changeLineHeight }}>
                            </div>
                            {!chpaterData?.isPurchased && <div className='absolute bottom-3 bg-[#d5cecec9] w-full flex justify-center py-6'>
                                <Image src={IconLock} height={300} width={300} className='h-12 w-12 absolute bottom-7' />
                            </div>}
                        </div>
                        {chpaterData?.authorNote && <div className='dark:text-gray-300 text-gray-800 dark:bg-[#202020] border p-3 dark:my-1 mt-4 rounded-md shadow-md text-sm leading-6'>
                            <div className='text-base pb-[6px]'>Author's Note</div>
                            <div dangerouslySetInnerHTML={{ __html: chpaterData?.authorNote }}></div>
                        </div>}
                        {localStorageToken ?
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

                        <div className='pt-8 pb-5 pl-2 border-t'>
                            {(chpaterData?.comment?.data?.length > 0 && chpaterData?.isPurchased) && <div className='text-2xl pb-1'>Reviews</div>}
                            {(localStorageToken && chpaterData?.isPurchased) &&
                                <div className='border p-3 bg-gray-200 rounded-md dark:bg-[#323232]'>
                                    <textarea onChange={handleChange} value={commentInput} placeholder='Add a comment*' className='text-gray-800 dark:text-gray-200 dark:bg-[#202020] mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
                                    <div className='flex justify-end'>
                                        <div onClick={handleSubmit} className='border rounded-full px-3 py-1 text-lg bg-blue-600 text-white cursor-pointer'>Submit</div>
                                    </div>
                                </div>
                            }
                            <div>
                                <div className=''>
                                    {chpaterData?.comment?.data?.length > 0 && chpaterData?.comment?.data?.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <div className='my-3 flex rounded-md p-3 bg-gray-200 dark:bg-[#202020] dark:text-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                                    <div>
                                                        {/* <Image alt='' src={item?.profileImg} className='md:h-16 md:w-16 w-24 h-16 object-cover rounded-md' /> */}
                                                        <Avatar className='md:h-16 md:w-16 w-16 h-16' />
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
                                                        <textarea onChange={handleReplyChange} placeholder='Reply' className='dark:bg-[#202020] mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
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
                            </div>
                        </div>

                    </div>

                    {scrollDirection == 'up' &&
                        <div className='bg-gray-300 dark:bg-[#202020] dark:text-white flex items-center justify-between px-5 mt-2 py-2 fixed left-0 bottom-0 w-full'>
                            <MenuIcon onClick={handleDrawerOpen} className='cursor-pointer dark:text-gray-200' />
                            <div className='flex'>
                                <div>
                                    <FormatSizeIcon className='cursor-pointer dark:text-gray-200' fontSize='large' onClick={() => setOpenModel(true)} />
                                </div>
                                <div className='flex gap-4 text-gray-700 dark:text-gray-200'>
                                    <Image className='cursor-pointer h-8 w-8' src={leftArrowIcon} alt='' onClick={() => previousChapter(chpaterData)} />
                                    <Image className='cursor-pointer h-8 w-8' src={rightArrowIcon} alt='' onClick={() => nextChapter(chpaterData)} />
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
                        <DialogContent>
                            {/* <div className='font-semibold pb-2 pl-1'>Font</div>
                            <div className='grid grid-cols-2 gap-2 text-start text-sm'>
                                <div onClick={() => setFontFamily("openSans")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Opensans</div>
                                <div onClick={() => setFontFamily("Source serif")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Source serif</div>
                                <div onClick={() => setFontFamily("Poopins")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Poppins</div>
                                <div onClick={() => setFontFamily("Merriweather")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Merriweather</div>
                                <div onClick={() => setFontFamily("Lato")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Lato</div>
                                <div onClick={() => setFontFamily("Mostserrat")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Montserrat</div>
                            </div> */}

                            <div className='flex items-center justify-between py-3'>
                                <div className='font-semibold pt-3'>Text Size</div>
                                <div className='flex'>
                                    <div onClick={() => setChangefontSize(changefontSize == 16 ? changefontSize : changefontSize - 2)}
                                        className='cursor-pointer border rounded-full px-[10px] bg-gray-200 font-semibold'>-</div>
                                    <div className='px-3'>{changefontSize}</div>
                                    <div onClick={() => setChangefontSize(changefontSize == 40 ? changefontSize : changefontSize + 2)}
                                        className='cursor-pointer border rounded-full px-[10px] bg-gray-200 font-semibold'>+</div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between py-3'>
                                <div className='font-semibold pt-3'>Line height</div>
                                <div className='flex'>
                                    <div onClick={() => {
                                        setChangeLineHeight(changeLineHeight == 2 ? changeLineHeight : changeLineHeight - .1)
                                        setLineHeightValue(lineHeightValue == 2 ? lineHeightValue : lineHeightValue - 2)
                                    }
                                    } className='cursor-pointer border rounded-full px-[10px] bg-gray-200 font-semibold'>-</div>
                                    <div className='px-3'>{lineHeightValue}</div>
                                    <div onClick={() => {
                                        setChangeLineHeight(changeLineHeight == 40 ? changeLineHeight : changeLineHeight + .1)
                                        setLineHeightValue(lineHeightValue == 40 ? lineHeightValue : lineHeightValue + 2)
                                    }} className='cursor-pointer border rounded-full px-[10px] bg-gray-200 font-semibold'>+</div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between py-3'>
                                <div className='font-semibold pt-3 pr-2'>Contrast</div>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <div className='border px-6 rounded-xl' onClick={() => setContrastValue("gray")}>
                                        {contrastValue == "gray" ? <DoneIcon /> : "A"}
                                    </div>
                                    <div className='border rounded-xl px-6 bg-gray-200 underline font-semibold' onClick={() => setContrastValue("white")}>
                                        {contrastValue == "white" ? <DoneIcon /> : "A"}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                :
                <div className='pt-32 pb-64 flex justify-center text-lg'>chapter ongoing</div>
            }
        </>
    )
}

export default ChapterDetail
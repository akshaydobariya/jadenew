'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import coverImage from '../../../../public/assets/Images/chapterCoverImage.jpg'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import popularComicTwo from '../../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SendIcon from '@mui/icons-material/Send';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import useApiService from '@/services/ApiService';
import { usePathname } from 'next/navigation';
import { RectHtmlParser } from 'html-react-parser'
import moment from 'moment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    const [commentInput, setCommentInput] = useState()
    const [changeChapterBtn, setChangeChapterBtn] = useState(1)
    const [replyComment, setReplyComment] = useState()
    const { getChapter, postComment, likeComment, dislikeComment, postReplyComment } = useApiService()

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

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            setScroll(scrollY)

            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener("scroll", updateScrollDirection); // add event listener
        return () => {
            window.removeEventListener("scroll", updateScrollDirection); // clean up
        }
    }, [scrollDirection])

    useEffect(() => {
        const path = pathname.slice(9)
        getChapter(path).then((res) => {
            console.log(res?.data?.data, "chapter res");
            setChpaterData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error chapter");
        })
    }, [likeCount])

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

        postComment(path, form).then((res) => {
            console.log('comment res', res);
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
        }).catch((er) => {
            console.log(er, "Error reply comment");
        })
    }

    const nextChapter = (id) => {
        let chpaterNumber = id?.novelId?.chapter.find((item) => item?.chapterNo == chpaterData?.chapterNo);
        let currentChapter = chpaterNumber?.chapterNo + 1;
        let nextChapterData = chpaterData?.novelId?.chapter.filter((item) => item?.chapterNo == currentChapter)
        nextPrevButtonData(nextChapterData[0]?._id)
    }

    const previousChapter = (id) => {
        let chpaterNumber = id?.novelId?.chapter.find((item) => item?.chapterNo == chpaterData?.chapterNo);
        let currentChapter = chpaterNumber?.chapterNo - 1;
        let previousChapterData = chpaterData?.novelId?.chapter.filter((item) => item?.chapterNo == currentChapter)
        nextPrevButtonData(previousChapterData[0]?._id)
    }

    const nextPrevButtonData = (id) => {
        getChapter(id).then((res) => {
            setChpaterData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "Error chapter");
        })
    }

    return (
        <div className={contrastValue == 'gray' ? 'bg-gray-100 pt-20' : 'bg-white dark:bg-gray-800 dark:text-white pt-20'}>
            {scoll > 10 && <div className='fixed lg:right-20 right-8 bottom-20 border-2 border-black rounded-full bg-gray-100 dark:bg-gray-700'>
                <KeyboardArrowUpIcon className='cursor-pointer' fontSize='large' onClick={() => window.scrollTo(0, 0)} />
            </div>}

            <Drawer
                sx={{
                    width: 290,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 290,
                        boxSizing: 'border-box',
                        paddingTop: 9
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
                                    <span className='pr-3 text-sm'>{text?.chapterNo}.</span> <ListItemText primary={text?.title} />
                                </ListItemButton>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Drawer>

            <div className='md:px-56 px-4'>
                <div className='flex justify-between w-full items-center bg-gray-200 px-2'>
                    <div className='flex'>
                        <Image height={100} width={100} src={chpaterData?.novelId?.coverImg} alt='novel image' className='h-11 w-12 ml-1' />
                        <div className='pl-2 text-center font-semibold text-gray-700 text-xl py-2 w-full block md:hidden'>{chpaterData?.novelId?.title.length > 18 ? `${chpaterData?.novelId?.title?.slice(0, 18)}..` : chpaterData?.novelId?.title}</div>
                        <div className='pl-2 text-center font-semibold text-gray-700 text-xl py-2 w-full hidden md:block'>{chpaterData?.novelId?.title}</div>
                    </div>
                    <div className='flex gap-4 text-gray-700'>
                        <div><KeyboardArrowLeftIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => previousChapter(chpaterData)} /></div>
                        <div><ChevronRightIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => nextChapter(chpaterData)} /></div>
                    </div>
                </div>
                <div className='flex justify-center pt-3 pb-2'>
                    <div className='text-gray-700 dark:text-gray-100 text-lg font-semibold'>Chapter {chpaterData?.chapterNo} - {chpaterData?.title}</div>
                </div>
                <div className='text-gray-700 dark:text-gray-300 font-[500] tracking-wider px-2' dangerouslySetInnerHTML={{ __html: chpaterData?.content }}
                    style={{ fontSize: changefontSize, lineHeight: changeLineHeight }}>
                </div>
                <div className='dark:text-gray-300 text-gray-800 border p-3 my-4 rounded-md shadow-md text-sm leading-6'>
                    <div className='text-base pb-[6px]'>Autor's Note</div>
                    <div>{chpaterData?.authorNote}</div>
                </div>

                <div className='flex justify-between textThemeColor'>
                    <button className='flex items-center' onClick={() => previousChapter(chpaterData)}>
                        <KeyboardBackspaceIcon fontSize='small' />
                        <div className='pl-1'>Preview</div>
                    </button>
                    <button className='flex items-center' onClick={() => nextChapter(chpaterData)}>
                        <div className='font-semibold pr-1'>Next</div>
                        <EastIcon fontSize='small' />
                    </button>
                </div>

                <div className='pt-8 pl-2'>
                    <div className='text-2xl pb-1'>Reviews</div>
                    <div className='flex items-center'>
                        <textarea onChange={handleChange} placeholder='Add a comment' className='dark:text-gray-800 mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
                        <SendIcon onClick={handleSubmit} className='border rounded-full p-2 text-5xl bg-blue-600 text-white cursor-pointer' />
                    </div>
                    <div>
                        <div className=''>
                            {chpaterData?.comment?.length > 0 && chpaterData?.comment?.map((item, i) => {
                                return (
                                    <>
                                        <div className='my-3 flex rounded-md p-3 bg-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                            <div>
                                                <Image alt='' src={NewRelaseFive} className='md:h-16 md:w-16 w-24 h-16 object-cover rounded-md' />
                                            </div>
                                            <div className='md:pl-4 pl-2'>
                                                <div className='flex items-center'>
                                                    <div className='text-lg text-gray-900 font-semibold'>{item?.userId?.name}</div>
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

                                                    <button className='pr-3 text-sm font-semibold' onClick={() => setReplyComment(item?._id)}>Reply</button>
                                                    {item?.reply.length > 0 &&
                                                        <div className='pt-1 text-sm text-pink-700 cursor-pointer' onClick={() => setReplyCommentUi(item?._id)}>
                                                            <span>view {item?.reply.length} more reply</span>
                                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {replyComment == item?._id &&
                                            <div className='flex items-center pl-6'>
                                                <textarea onChange={handleReplyChange} placeholder='Reply' className='mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
                                                <SendIcon onClick={() => commentReplyApi(chpaterData?._id, item?._id)} className='border rounded-full p-2 text-3xl bg-blue-600 text-white cursor-pointer' />
                                            </div>
                                        }
                                        <span>
                                            {replyCommentUi == item?._id &&
                                                item?.reply?.map((item, index) => {
                                                    return (
                                                        <div key={index} className='ml-10 my-3 flex rounded-md p-3 bg-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                                            <div>
                                                                <Image alt='' height={100} width={100} src={item?.userId?.profileImg} className='md:h-16 md:w-16 w-24 h-16 object-cover rounded-md' />
                                                            </div>
                                                            <div className='md:pl-4 pl-2'>
                                                                <div className='flex items-center'>
                                                                    <div className='text-lg text-gray-900 font-semibold'>{item?.userId?.name}</div>
                                                                    <div className='pl-3 text-sm'>{moment(item?.createdAt).format('DD MMM YYYY')}</div>
                                                                </div>
                                                                <div className='text-sm py-1'>{item?.comment}</div>
                                                                <div className=''>
                                                                    {item?.like.length > 0 ?
                                                                        <ThumbUpAltIcon className='cursor-pointer mr-2' onClick={() => likeCommentApi(item?._id)} /> :
                                                                        <ThumbUpOffAltIcon className='cursor-pointer mr-2' onClick={() => likeCommentApi(item?._id)} />
                                                                    }

                                                                    {item?.dislike.length > 0 ?
                                                                        <ThumbDownAltIcon className='cursor-pointer' onClick={() => dislikeCommentApi(item?._id)} /> :
                                                                        <ThumbDownOffAltIcon className='cursor-pointer' onClick={() => dislikeCommentApi(item?._id)} />
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </span>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                    {chpaterData?.comment?.length > 3 && <div className='text-end underline pt-3 pb-2'>See More</div>}
                </div>

            </div>

            {scrollDirection == 'up' &&
                <div className='bg-gray-300 flex items-center justify-between px-5 mt-2 py-2 fixed bottom-0 w-full'>
                    <MenuIcon onClick={handleDrawerOpen} className='cursor-pointer' />
                    <div className='font-semibold'>Chapter {chpaterData?.chapterNo} - {chpaterData?.title}</div>
                    <div className='flex'>
                        <div>
                            <FormatSizeIcon className='cursor-pointer' fontSize='large' onClick={() => setOpenModel(true)} />
                        </div>
                        <div className='flex gap-4 text-gray-700'>
                            <div><KeyboardArrowLeftIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => previousChapter(chpaterData)} /></div>
                            <div><ChevronRightIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => nextChapter(chpaterData)} /></div>
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
                    <div className='font-semibold pb-2 pl-1'>Font</div>
                    <div className='grid grid-cols-2 gap-2 text-start text-sm'>
                        <div onClick={() => setFontFamily("openSans")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Opensans</div>
                        <div onClick={() => setFontFamily("Source serif")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Source serif</div>
                        <div onClick={() => setFontFamily("Poopins")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Poppins</div>
                        <div onClick={() => setFontFamily("Merriweather")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Merriweather</div>
                        <div onClick={() => setFontFamily("Lato")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Lato</div>
                        <div onClick={() => setFontFamily("Mostserrat")} className='bg-gray-200 px-3 border rounded-md py-[6px]'>Montserrat</div>
                    </div>

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
                        <div className='font-semibold pt-3'>Contrast</div>
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
    )
}

export default ChapterDetail
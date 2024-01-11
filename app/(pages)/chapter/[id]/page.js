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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ChapterDetail() {
    const chapter = [
        {
            id: "200",
            name: "Chapter 1 - Go to the light",
            detail: "1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32. 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
            authorNote: "Here are just a few notes for this first chapter. Minor spoilers for this first chapter, so please read the chapter first if you haven’t already. No spoilers for anything beyond that, I promise First, Su Yi and Su Xuanjun are the same person.",
            authorNote2: "You’ve likely picked up on that already, especially if you’ve read lots of Chinese fiction and are familiar with the concept of courtesy names. For those unfamiliar with the concept, a courtesy name is bestowed upon a man upon reaching adulthood, and it’s used as a show of respect. Using his given name is either affectionate or rude, depending on context. At this point in the text, it is uncertain whether the post-hundred-year-timeskip Su Yi has a courtesy name or not.",
        },
        {
            id: "201",
            name: "Chapter 2 - Yu's Restaurant",
            detail: "2 There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.  a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section",
            authorNote: "Here are just a few notes for this first chapter. Minor spoilers for this first chapter, so please read the chapter first if you haven’t already. No spoilers for anything beyond that, I promise First, Su Yi and Su Xuanjun are the same person. You’ve likely picked up on that already, especially if you’ve read lots of Chinese fiction and are familiar with the concept of courtesy names. For those unfamiliar with the concept, a courtesy name is bestowed upon a man upon reaching adulthood, and it’s used as a show of respect. Using his given name is either affectionate or rude, depending on context. At this point in the text, it is uncertain whether the post-hundred-year-timeskip Su Yi has a courtesy name or not.",
        },
        {
            id: "202",
            name: "Chapter 3 - Peerles Genius",
            detail: "3 But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section",
            authorNote: "Here are just a few notes for this first chapter. Minor spoilers for this first chapter, so please read the chapter first if you haven’t already. No spoilers for anything beyond that, I promise First, Su Yi and Su Xuanjun are the same person. You’ve likely picked up on that already, especially if you’ve read lots of Chinese fiction and are familiar with the concept of courtesy names. For those unfamiliar with the concept, a courtesy name is bestowed upon a man upon reaching adulthood, and it’s used as a show of respect. Using his given name is either affectionate or rude, depending on context. At this point in the text, it is uncertain whether the post-hundred-year-timeskip Su Yi has a courtesy name or not.",
        },
        {
            id: "203",
            name: "Chapter 4 - The Sky Academy",
            detail: "4At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section",
            authorNote: "Here are just a few notes for this first chapter. Minor spoilers for this first chapter, so please read the chapter first if you haven’t already. No spoilers for anything beyond that, I promise First, Su Yi and Su Xuanjun are the same person. You’ve likely picked up on that already, especially if you’ve read lots of Chinese fiction and are familiar with the concept of courtesy names. For those unfamiliar with the concept, a courtesy name is bestowed upon a man upon reaching adulthood, and it’s used as a show of respect. Using his given name is either affectionate or rude, depending on context. At this point in the text, it is uncertain whether the post-hundred-year-timeskip Su Yi has a courtesy name or not.",
        },
    ]

    const { getChapter } = useApiService()

    const [changeChapterBtn, setChangeChapterBtn] = useState(1)

    const chapterChange = (data) => {
        if (data == 'increment') {
            setChangeChapterBtn(changeChapterBtn + 1)
        } else {
            if (changeChapterBtn > 1) {
                setChangeChapterBtn(changeChapterBtn - 1)
            }
        }
    }

    const pathname = usePathname()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openModel, setOpenModel] = React.useState(false);
    const [chpaterId, setChpaterId] = useState()
    const [changefontSize, setChangefontSize] = useState(16)
    const [changeLineHeight, setChangeLineHeight] = useState(1.8)
    const [lineHeightValue, setLineHeightValue] = useState(24)
    const [fontFamily, setFontFamily] = useState("openSans")
    const [contrastValue, setContrastValue] = useState("white")
    const [chpaterData, setChpaterData] = useState()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const chapterData = chapter.filter((item) => item?.id === chpaterId)

    //scrool header 
    const [scrollDirection, setScrollDirection] = React.useState(null);
    const [scoll, setScroll] = useState(null)

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
    }, [])

    return (
        <div className={contrastValue == 'gray' ? 'bg-gray-100 pt-20' : 'bg-white pt-20'}>
            {scoll > 10 && <div className='fixed lg:right-20 right-8 bottom-20 border-2 border-black rounded-full bg-gray-100'>
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
                    {chapter?.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton sx={{ borderBottom: "1px solid #e5e1e1", fontWeight: 600 }}>
                                <ListItemText primary={text?.name} onClick={() => setChpaterId(text.id)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className='md:px-56 px-4'>
                <div className='flex justify-between w-full items-center bg-gray-200 px-2'>
                    <div className='flex'>
                        <Image height={100} width={100} src={popularComicTwo} alt='novel image' className='h-10 w-12 ml-1' />
                        <div className='pl-2 text-center font-semibold text-gray-700 text-xl py-2 w-full'>Immortal Martial God</div>
                    </div>
                    <div className='flex gap-4 text-gray-700'>
                        <div><KeyboardArrowLeftIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => chapterChange("decrement")} /></div>
                        <div><ChevronRightIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => chapterChange("increment")} /></div>
                    </div>
                </div>
                <div className='flex justify-center pt-3 pb-2'>
                    <div className='text-gray-700 text-lg font-semibold'>Chapter {chpaterData?.chapterNo} - {chpaterData?.title}</div>
                </div>
                <div className='text-gray-700 font-[500] tracking-wider' dangerouslySetInnerHTML={{ __html: chpaterData?.content }} style={{ fontSize: changefontSize, lineHeight: changeLineHeight }}>
                    {/* {chapterData.length > 0 ? chapterData[0]?.detail : chapter[0]?.detail} */}
                    {/* {RectHtmlParser(chpaterData?.content)} */}
                </div>
                <div className='border p-3 my-4 rounded-md shadow-md text-sm leading-6'>
                    <div className='text-base pb-[6px]'>Autor's Note</div>
                    <div>{chapter[0]?.authorNote}</div>
                    <div className='pt-[6px]'>{chapter[0]?.authorNote2}</div>
                </div>
                {/* <div className='flex pb-7'>
                    <StarBorderIcon />
                    <div className='pl-1'>Favourite</div>
                </div> */}

                <div className='flex justify-between textThemeColor'>
                    <div className='flex items-center'>
                        <KeyboardBackspaceIcon fontSize='small' />
                        <div className='pl-1'>Preview</div>
                    </div>
                    <div className='flex items-center'>
                        <div className='font-semibold pr-1'>Next</div>
                        <EastIcon fontSize='small' />
                    </div>
                </div>

                <div className='pt-8 pl-2'>
                    <div className='text-2xl pb-1'>Reviews</div>
                    <div className='flex items-center'>
                        <textarea placeholder='Add a comment' className='mr-2 border w-full focus:outline-none rounded-md px-2 py-2' />
                        <SendIcon className='border rounded-full p-2 text-5xl bg-blue-600 text-white cursor-pointer' />
                    </div>
                    <div>
                        {/* <div className='flex gap-4 py-3'>
                            <div className='flex items-center'><ThumbUpOffAltIcon /><span className='pl-1'>75%</span></div>
                            <div className='flex items-center'><RemoveRedEyeOutlinedIcon /><span className='pl-1'>50.1k</span></div>
                        </div> */}
                        <div className=''>
                            {[...Array(3)].map((_, i) => {
                                return (
                                    <div className='my-3 flex rounded-md p-3 bg-gray-200 text-gray-800' style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}>
                                        <div>
                                            <Image alt='' src={NewRelaseFive} className='md:h-16 md:w-16 w-24 h-16 object-cover rounded-md' />
                                        </div>
                                        <div className='md:pl-4 pl-2'>
                                            <div className='text-lg font-semibold'>Mister fuzz</div>
                                            <div className='text-sm'>1 year ago</div>
                                            <div className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='text-end underline pt-3 pb-2'>See More</div>
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
                            <div><KeyboardArrowLeftIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => chapterChange("decrement")} /></div>
                            <div><ChevronRightIcon sx={{ cursor: "pointer" }} fontSize='large' onClick={() => chapterChange("increment")} /></div>
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
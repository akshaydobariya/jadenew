'use client'
import dynamic from 'next/dynamic';
import Head from 'next/head';
import loader from '../../public/assets/loader/loader.gif';
import Image from 'next/image';
import { Box, Modal } from "@mui/material";
import moment from "moment";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Pagination } from 'swiper/modules';
import useApiService from '@/services/ApiService';
import debounce from 'lodash.debounce';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
};

// const NewRelease = dynamic(() => import('../(pages)/HomePage/NewRelease'), {
//     loading: () => <Loader />,
// });
// const PopularNovels = dynamic(() => import('../(pages)/HomePage/PopularNovels'), {
//     loading: () => <Loader />,
// });
const FeaturedBook = dynamic(() => import('../(pages)/HomePage/FeaturedBook'), {
    loading: () => <Loader />,
});
const Popular = dynamic(() => import('../(pages)/HomePage/Popular'), {
    loading: () => <Loader />,
});
const Originals = dynamic(() => import('../(pages)/HomePage/Originals'), {
    loading: () => <Loader />,
});
const LatestUpdate = dynamic(() => import('../(pages)/latest-update/page'), {
    loading: () => <Loader />,
});
const Ranking = dynamic(() => import('../(pages)/HomePage/Ranking'), {
    loading: () => <Loader />,
});

const HomePage = () => {

    const { getGeneralAnnoucment } = useApiService();
    const [annoucmentData, setAnnoucmentData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [annoucmentFullData, setAnnoucmentFullData] = useState("");
    const [title, setTitleIndex] = useState(null);
    const [newReleaseNovelData, setNewReleaseNovelData] = useState([]);
    const { getNovels } = useApiService();
    const router = useRouter();
    const [mostPopularNovelData, setMostPopularNovelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getMostPopularNovels } = useApiService();


    useEffect(() => {
        getGeneralAnnoucment()
            .then((res) => {
                setAnnoucmentData(res?.data?.data?.data);
            })
            .catch((er) => {
                console.log(er);
            });
    }, []);
    const fetchNovels = debounce(() => {
        setLoading(true);
        getNovels()
            .then((res) => {
                setNewReleaseNovelData(res?.data?.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, 300);

    useEffect(() => {
        fetchNovels();
        return () => {
            fetchNovels.cancel();
        };
    }, []);

    const handleClick = (id) => {
        router.push(`/detail/view/${id}`);
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    const fetchMostPopularNovels = debounce(() => {
        setLoading(true);
        getMostPopularNovels()
            .then((res) => {
                setMostPopularNovelData(res?.data?.data?.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, 1000);

    useEffect(() => {
        fetchMostPopularNovels();
        return () => {
            fetchMostPopularNovels.cancel();
        };
    }, []);

    const handleNavigation = (id) => {
        router.push(`/detail/view/${id}`);
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    };



    return (
        <>
            <Head>
                <meta property="og:title" content="Jade scroll" />
                <meta name="og:description" content="Jade scroll novels home page" />
            </Head>
            {loading ? <Loader /> :
                <div>
                    <div className='pt-[65px]'>
                        {/* <Banner /> */}

                        <div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className=""
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                            >
                                <div className="relative block outline-none">
                                    <Box
                                        sx={style}
                                        className="md:w-[550px] w-[350px] h-[350px] rounded-[10px]"
                                    >
                                        <div className="text-xl font-semibold border-b-[1px] border-b-[#a6a6a6] pt-2 lg:pt-3 pb-2 px-4 sticky top-0 bg-gray-100 dark:bg-[#212121] rounded-t-[10px] flex justify-between">
                                            <div>Announcement</div>
                                            <div className="cursor-pointer font-bold rounded-full text-[16px]" onClick={() => {
                                                handleClose();
                                            }}>X</div>
                                        </div>
                                        {/* <hr className='mt-4' /> */}
                                        <div className="p-4 overflow-auto h-[300px] announcement-scroll dark:bg-[#5c5c5c] rounded-b-[10px]" dangerouslySetInnerHTML={{ __html: annoucmentFullData }}>
                                        </div>
                                    </Box>
                                </div>
                            </Modal>

                            {/* {annoucmentData.length > 0 && */}
                            <div className="px-4">
                                {annoucmentData.length > 0 && (
                                    <div className="text-xl font-semibold pt-3 pb-2">Imperial Edict</div>
                                )}
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={15}
                                    freeMode={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    effect={"coverflow"}
                                    id="announcement"
                                    modules={[FreeMode, Pagination]}
                                    className="mySwiper"
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                        },
                                    }}
                                >
                                    {annoucmentData.length > 0 &&
                                        annoucmentData?.map((item, index) => {
                                            return (
                                                <SwiperSlide
                                                    key={index}
                                                    className="min-h-[135px]  my-3  py-4 lg:py-6 px-6 bg-gray-100 dark:bg-[#202020] dark:text-white shadow-md border border-transparent hover:border hover:border-gray-400 cursor-pointer hover:shadow-md rounded-[1.75rem] gap-10"
                                                >
                                                    <div className="font-semibold">{item?.title}</div>

                                                    {item?.content?.length > 200 ?
                                                        <div className="flex">
                                                            <div className="text-gray-700 dark:text-white text-sm"
                                                                dangerouslySetInnerHTML={{ __html: `${item?.content?.slice(0, 200)}...` }}>
                                                            </div>
                                                            <span
                                                                className="cursor-pointer text-blue-500 flex items-end"
                                                                onClick={() => {
                                                                    handleOpen();
                                                                    setAnnoucmentFullData(item.content);
                                                                }}
                                                            >
                                                                more
                                                            </span>
                                                        </div> :
                                                        <div className="text-gray-700 dark:text-white text-sm"
                                                            dangerouslySetInnerHTML={{ __html: item?.content }}>
                                                        </div>
                                                    }

                                                    <div className="text-end text-sm pt-1">
                                                        {moment(item?.createdAt).format("DD MMM, YYYY")}
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                </Swiper>
                            </div>
                            {/* } */}
                        </div>

                        {/* <NewRelease /> */}

                        <div className='md:pt-10 pt-10 px-4 md:px-8'>
                            <div className='flex justify-between items-center pb-5'>
                                <div className='text-2xl md:text-2xl font-bold'>New Releases</div>
                                {newReleaseNovelData.length > 6 && (
                                    <Link href='/novel-list/latest-More' className='underline cursor-pointer'>
                                        See More
                                    </Link>
                                )}
                            </div>
                            <div className='md:hidden block'>
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={10}
                                    freeMode={true}
                                    pagination={{ clickable: false }}
                                    modules={[FreeMode]}
                                    allowTouchMove={true}
                                    breakpoints={{
                                        640: { slidesPerView: 3 },
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                >
                                    {newReleaseNovelData.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className={`${index === title ? '' : 'before:z-0'} NewReleaseCard cursor-pointer rounded-2xl overflow-hidden`} onClick={() => handleClick(item._id)}>
                                                <Image
                                                    src={item.coverImg === "null" ? "/path/to/placeholder.jpg" : item.coverImg}
                                                    height={300}
                                                    width={200}
                                                    alt={item.title || 'Cover image'}
                                                    className='releaseImage'
                                                    priority
                                                />
                                                <div className={index === title ? "info" : ""}>
                                                    <h1 className='font-semibold'>{item.title}</h1>
                                                    <p>{item.description?.length > 145 ? `${item.description.slice(0, 145)}...` : item.description}</p>
                                                </div>
                                                <div
                                                    onClick={() => setTitleIndex(index)}
                                                    className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10"
                                                >
                                                    {item.title}
                                                </div>
                                                <div
                                                    onClick={() => setTitleIndex(title !== index ? index : null)}
                                                    className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10"
                                                >
                                                    {item.title?.length > 15 ? `${item.title.slice(0, 15)}...` : item.title}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='md:gap-x-4 md:flex hidden'>
                                <Swiper
                                    direction='horizontal'
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    mousewheel={true}
                                    freeMode={true}
                                    modules={[Mousewheel, FreeMode]}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                >
                                    {newReleaseNovelData.map((item, index) => (
                                        <SwiperSlide key={index} className="containerImage cursor-pointer">
                                            <div onClick={() => handleClick(item._id)}>
                                                <Image
                                                    src={item.coverImg === "null" ? "/path/to/placeholder.jpg" : item.coverImg}
                                                    height={300}
                                                    width={200}
                                                    alt={item.title || 'Cover image'}
                                                    className='rounded-md h-auto max-h-[280px] object-cover aspect-auto'
                                                    priority
                                                />
                                                <div className="textImage px-2">
                                                    <h1 className='font-semibold pb-1 pt-1'>
                                                        {item.title?.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
                                                    </h1>
                                                    <p>
                                                        {item.description?.length > 110 ? `${item.description.slice(0, 110)}...` : item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* <BecomeAuthor /> */}

                        {/* <PopularNovels /> */}
                        <div className='md:pt-10 pt-10 px-4 md:px-8'>
                            <div className='flex justify-between items-center pb-5'>
                                <div className='text-2xl md:text-2xl font-bold'>Most Popular Novels</div>
                                <Link href='/novel-list/popular-More' className='underline cursor-pointer'>
                                    See More
                                </Link>
                            </div>
                            <div className='md:gap-x-4 flex md:hidden'>
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={10}
                                    freeMode={true}
                                    pagination={{ clickable: false }}
                                    modules={[FreeMode]}
                                    breakpoints={{
                                        640: { slidesPerView: 3 },
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                >
                                    {mostPopularNovelData.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className={`${index === title ? '' : 'before:z-0'} NewReleaseCard cursor-pointer rounded-2xl overflow-hidden`}
                                                onClick={() => handleNavigation(item._id)}
                                            >
                                                <Image
                                                    src={item?.coverImg === null || item?.coverImg === 'null' ? '/path/to/placeholder.jpg' : item?.coverImg}
                                                    height={300}
                                                    width={300}
                                                    alt='cover'
                                                    className='releaseImage'
                                                    priority
                                                />
                                                <div className={index === title ? 'info' : ''}>
                                                    <h1 className='font-semibold'>{item?.title || ''}</h1>
                                                    <p>{item?.description?.length > 200 ? `${item?.description.slice(0, 200)}...` : item?.description}</p>
                                                </div>
                                                <div
                                                    onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
                                                    className='hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10'
                                                >
                                                    {item?.title}
                                                </div>
                                                <div
                                                    onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
                                                    className='block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10'
                                                >
                                                    {item?.title?.length > 15 ? `${item?.title.slice(0, 15)}...` : item?.title}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='md:gap-x-4 md:flex hidden'>
                                <Swiper
                                    slidesPerView={5}
                                    loop
                                    spaceBetween={8}
                                    freeMode={true}
                                    mousewheel={true}
                                    pagination={{ clickable: false }}
                                    modules={[Mousewheel, FreeMode]}
                                    breakpoints={{
                                        640: { slidesPerView: 3 },
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                >
                                    {mostPopularNovelData.map((item, index) => (
                                        <SwiperSlide key={index} className='containerImage cursor-pointer'>
                                            <div onClick={() => handleNavigation(item._id)}>
                                                <Image
                                                    src={item?.coverImg === null || item?.coverImg === 'null' ? '/path/to/placeholder.jpg' : item?.coverImg}
                                                    height={300}
                                                    width={300}
                                                    alt='cover'
                                                    className='rounded-md h-[280px] object-cover'
                                                    priority
                                                />
                                                <div className='textImage'>
                                                    <h1 className='font-semibold'>
                                                        {item?.title?.length > 30 ? `${item?.title.slice(0, 30)}...` : item?.title}
                                                    </h1>
                                                    <p>
                                                        {item?.description?.length > 70 ? `${item?.description.slice(0, 70)}...` : item?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    {/* <NovelByGenre /> */}

                    <FeaturedBook />

                    <Popular />

                    <Originals />

                    <LatestUpdate />

                    <div className="hidden lg:block">
                        <Ranking />
                    </div>
                </div>
            }
        </>
    );
}

export default HomePage;

const Loader = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[80vh] flex justify-center text-lg flex-col items-center">
            <Image src={loader} alt="Loading..." height={1000} width={1000} className="h-20 w-20" />
        </div>
    );
};

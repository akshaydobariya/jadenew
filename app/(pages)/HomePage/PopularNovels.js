'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import useApiService from '@/services/ApiService';
import debounce from 'lodash.debounce';
import loader from '../../../public/assets/loader/loader.gif'

function PopularNovels() {
    const router = useRouter();
    const [title, setTitleIndex] = useState(null);
    const [mostPopularNovelData, setMostPopularNovelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getMostPopularNovels } = useApiService();

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
        }, 3000);
    };

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-bold'>Most Popular Novels</div>
                <Link href='/novel-list/popular-More' className='underline cursor-pointer'>
                    See More
                </Link>
            </div>
            {loading ? (
                <div className="min-h-[80vh] flex justify-center text-lg flex-col items-center">
                    <Image src={loader} alt="Loading..." height={1000} width={1000} className="h-20 w-20" />
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default PopularNovels;

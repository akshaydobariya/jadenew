'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { Mousewheel } from 'swiper/modules';
import useApiService from '@/services/ApiService';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import loader from '../../../public/assets/loader/loader.gif'


function NewRelease() {
    const [title, setTitleIndex] = useState(null);
    const [newReleaseNovelData, setNewReleaseNovelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getNovels } = useApiService();
    const router = useRouter();

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

    return (
        <div className='md:pt-10 pt-10 px-4 md:px-8'>
            <div className='flex justify-between items-center pb-5'>
                <div className='text-2xl md:text-2xl font-bold'>New Releases</div>
                {newReleaseNovelData.length > 6 && (
                    <Link href='/novel-list/latest-More' className='underline cursor-pointer'>
                        See More
                    </Link>
                )}
            </div>
            {loading ? (
                <div className="min-h-[80vh] flex justify-center text-lg flex-col items-center">
                    <Image src={loader} alt="Loading..." height={1000} width={1000} className="h-20 w-20" />
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default NewRelease;

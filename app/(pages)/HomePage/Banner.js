'use client'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import banner7 from '../../../public/assets/Images/Banner/banner-seven.jpg'
import BannerImageTwo from '../../../public/assets/Images/detailPage.jpg'
import Image from 'next/image';
import useApiService from '@/services/ApiService'
import { useDispatch } from 'react-redux'
import { COIN_HISTORY } from '@/app/Redux/slice/userSlice'

function Banner(props) {
    const { accesssToken, getBanners } = useApiService()
    const dispatch = useDispatch()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [bannerData, setBannerData] = useState([])
    const [localStorageToken, setLocalStorageToken] = useState()

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        if (localStorage !== undefined && localStorage.getItem('token')) {
            setLocalStorageToken(localStorage.getItem('token'))
        }
    }, [])

    useEffect(() => {
        if (localStorageToken) {
            accesssToken().then((res) => {
                dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
            }).catch((er) => {
            })
        }
    }, [])

    useEffect(() => {
        getBanners().then((res) => {
            setBannerData(res?.data?.data?.data)
        }).catch((er) => {
        })
    }, [])

    return (
        <div>
            <Slider {...settings}>
                {bannerData?.map((item, index) => {
                    const showBanner = item?.bannerType === 'APP' && item?.location === 'HOME' && screenWidth < 1000;
                    return (
                        showBanner && (
                            <div key={index} className='flex'>
                                <Image height={500} width={500} src={item?.bannerImg} alt='' className='w-full md:h-[30rem] h-auto max-h-[26rem] object-cover' />
                            </div>)
                    )
                })}
                {bannerData?.map((item, index) => {
                    const showBanner = item?.bannerType === 'WEB' && item?.location === 'HOME' && screenWidth > 1000;
                    return (
                        showBanner && (
                            <div key={index} className='w-full md:h-[30rem] h-[26rem]'>
                                <Image height={500} width={500} src={item?.bannerImg} alt='' className='w-full h-full object-cover' />
                            </div>)
                    )
                })}
            </Slider>
        </div>
    )
}

export default Banner
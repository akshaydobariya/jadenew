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
    const [bannerData, setBannerData] = useState([])

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    useEffect(() => {
        accesssToken().then((res) => {
            dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
        }).catch((er) => {
        })
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
                    return (
                        <div key={index} className='w-full md:h-[30rem] h-[26rem]'>
                            <Image height={1000} width={1000} src={item?.bannerImg} alt='' className='w-full h-full object-cover' />
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default Banner
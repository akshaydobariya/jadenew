'use client'
import useApiService from '@/services/ApiService';
import React, { useEffect } from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import Image from 'next/image';

function page() {
    const { getProfile } = useApiService()

    useEffect(() => {
        getProfile().then((res) => {
            console.log(res, "res profile");
        }).catch((er) => {
            console.log(er, "er profile");
        })
    }, [])

    return (
        <div className='pt-16'>
            <div className='h-[200px] bg-gray-200 flex justify-center items-center'>
                <div className='text-3xl'>Your Profile</div>
            </div>
            <div className='relative'>
                <div>
                    <Image src={popularComicTwo} alt='' className='w-28 h-28 rounded-full border-2 border-black p-1 absolute -top-12 ml-10' />
                </div>
                <div className='pt-20'>
                    <div>abc</div>
                    <div>abc</div>
                    <div>abc</div>
                    <div>abc</div>
                </div>
            </div>
        </div>
    )
}

export default page

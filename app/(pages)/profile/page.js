'use client'
import useApiService from '@/services/ApiService';
import React, { useEffect } from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import Image from 'next/image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

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
        <div className='pt-16 pb-20'>
            <div className='h-[200px] bg-gray-200 flex justify-center items-center'>
                <div className='text-3xl'>Your Profile</div>
            </div>
            <div className='relative'>
                <div>
                    <Image src={popularComicTwo} alt='' className='w-28 h-28 rounded-full border-2 border-black p-1 absolute -top-12 ml-10' />
                </div>
                <div className='pt-20 flex justify-between px-14'>
                    <div>
                        <div className='text-2xl'>jadeScrollUser1000</div>
                        <div className='flex items-center'>
                            <span><CalendarMonthIcon className='text-gray-700' fontSize='small' /></span>
                            <span className='py-1 text-lg pl-1'>2024-1-10</span>
                        </div>
                        <div className='flex'>
                            <span><LanguageIcon className='text-gray-700' fontSize='small' /></span>
                            <span className='text-lg pl-1'>Global</span>
                        </div>
                    </div>
                    <div className='flex items-start'>
                        <SettingsIcon className='mt-1' titleAccess='setting' />
                        <span className='ml-4 px-7 py-1 backgroundTheme text-white hover:opacity-[.9]'>Edit Profile</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

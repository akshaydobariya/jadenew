'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import playStore from '../public/assets/icon/playstoreSoon.webp'
import appStore from '../public/assets/icon/appStoreIcon.jpg'
import twiterIcon from '../public/assets/icon/twiterIcon.png'
import facebook from '../public/assets/icon/facebook.png'
import discord from '../public/assets/icon/discordThree.png'
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import logoLight from '../public/assets/icon/logoLightMode.png';
import logoDark from '../public/assets/icon/logoDarkMode.png';

function Footer() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className={pathname == '/chapter' ? 'hidden' : ' pt-10 pb-10 bg-[#000000] text-[#FFFFFF]  px-4 md:px-20'}>
            <div className='flex justify-center'>
                <Image alt="logo" className='h-6 w-40 md:h-7 md:w-48 object-fill' src={logoDark} height={400} width={400} />
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-0 text-center md:px-20 pb-6 pt-6'>
                <div className='cursor-pointer' onClick={() => router.push('/cms/aboutUs')}>About Us</div>
                <div className='cursor-pointer' onClick={() => router.push('/cms/contactUs')}>Contact Us</div>
                <div className='cursor-pointer' onClick={() => router.push('/resources')}>Resources</div>
                {/* <div>Jobs</div> */}
            </div>
            <div className='border-t border-gray-400 flex flex-col lg:flex-row justify-center items-center gap-5 pt-8'>
                <div className='flex'>
                    <Image alt="play-store" src={playStore} height={600} width={600} className="h-10 w-32 dark:border rounded-md mr-2" />
                    <Image alt="app-store" src={appStore} height={600} width={600} className="h-10 w-32 dark:border rounded-md" />
                </div>
                <div className='flex items-center gap-4'>
                    {/* <FacebookIcon sx={{ fontSize: "40px" }} className="text-[#5765F2]" />
                    <TwitterIcon sx={{ fontSize: "40px" }} className="text-[#5765F2] mx-3" /> */}
                    <Image alt='facebook' src={facebook} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                    <Image alt="tiwtter" src={twiterIcon} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                    <Image alt='discord' onClick={() => {if(typeof window !== 'undefined')window.open(`https://discord.gg/8g574CCS7c`)}} src={discord} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Footer
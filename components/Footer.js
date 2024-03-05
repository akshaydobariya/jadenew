'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import playStore from '../public/assets/icon/playstoreSoon.webp'
import appStore from '../public/assets/icon/appStoreIcon.jpg'
import twiterIcon from '../public/assets/icon/twiterIcon.png'
import facebook from '../public/assets/icon/facebook.png'
import discord from '../public/assets/icon/discordThree.png'
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
    const pathname = usePathname()

    return (
        <div className={pathname == '/chapter' ? 'hidden' : ' pt-10 pb-10 bg-gray-100 dark:bg-[#000000] dark:text-white px-4 md:px-20'}>
            <div className=''>
                <div className='text-2xl text-center pb-10 footerHeading'>JadeScroll</div>
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-0 text-center md:px-20 pb-6 pt-6'>
                <div>About</div>
                <div>Contact Us</div>
                <div>Resources</div>
                {/* <div>Jobs</div> */}
            </div>
            <div className='border-t border-gray-400 flex flex-col lg:flex-row justify-center items-center gap-5 pt-8'>
                <div className='flex'>
                    <Image src={playStore} height={600} width={600} className="h-10 w-32 dark:border rounded-md mr-2" />
                    <Image src={appStore} height={600} width={600} className="h-10 w-32 dark:border rounded-md" />
                </div>
                <div className='flex'>
                    <FacebookIcon sx={{ fontSize: "40px" }} className="text-[#5765F2]" />
                    <TwitterIcon sx={{ fontSize: "40px" }} className="text-[#5765F2] mx-3" />
                    <Image onClick={() => window.open(`https://discord.gg/8g574CCS7c`)} src={discord} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Footer
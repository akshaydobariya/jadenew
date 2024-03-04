'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import playStore from '../public/assets/icon/playstoreSoon.webp'
import twiterIcon from '../public/assets/icon/twiterIcon.png'
import facebook from '../public/assets/icon/facebook.png'
import discord from '../public/assets/icon/discordTwo.png'
import Image from 'next/image';

function Footer() {
    const pathname = usePathname()
    return (
        <div className={pathname == '/chapter' ? 'hidden' : ' pt-10 pb-10 bg-gray-900 text-white px-4 md:px-20'}>
            {/* <div>
                <div className='text-2xl'>JadeScroll</div>
                <div className='pt-3'>
                    <Image src={playStore} height={300} width={300} className="h-10 w-32" />
                </div>
            </div>
            <div>
                <div className='pb-1'>About</div>
                <div>Contact Us</div>
            </div>
            <div>
                <div className='pb-1'>Resources</div>
                <div>Jobs</div>
            </div>
            <div className='flex gap-5'>
                <Image src={facebook} height={300} width={300} className='h-[30px] w-[30px]' />
                <Image src={twiterIcon} height={300} width={300} className='h-8 w-8' />
            </div> */}
            <div className=''>
                <div className='text-2xl text-center pb-10 footerHeading'>JadeScroll</div>
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-0 text-center md:px-20 pb-6 pt-6'>
                <div>About</div>
                <div>Contact Us</div>
                <div>Resources</div>
                {/* <div>Jobs</div> */}
            </div>
            <hr />
            <div className='flex justify-center items-center gap-5 pt-8'>
                <Image src={facebook} height={300} width={300} className='h-[30px] w-[30px]' />
                <Image src={playStore} height={600} width={600} className="h-10 w-32" />
                <Image src={twiterIcon} height={300} width={300} className='h-8 w-8' />
                <Image src={discord} height={300} width={300} className='h-10 w-10' />
            </div>
        </div>
    )
}

export default Footer
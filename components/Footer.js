'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

function Footer() {
    const pathname = usePathname()
    return (
        <div className={pathname == '/chapter' ? 'hidden' : 'pt-20 pb-10 mt-1 bg-gray-900 text-white grid md:grid-cols-4 grid-cols-2 gap-4 px-4 md:px-20'}>
            <div>
                <div className='font-semibold'>ABOUT</div>
                <div className='pt-1 md:pt-2 text-gray-400'>
                    <div>About us</div>
                    <div>Contact us</div>
                    <div>Resources</div>
                </div>
            </div>
            <div>
                <div className='font-semibold'>SUPPORT</div>
                <div className='pt-1 md:pt-2 text-gray-400'>
                    <div>Help</div>
                    <div>Feedback</div>
                    <div>Copyright Complaint</div>
                </div>
            </div>
            <div>
                <div className='font-semibold'>LEGAL</div>
                <div className='pt-1 md:pt-2 text-gray-400'>
                    <div>Terms of use</div>
                    <div>Privacy Policy</div>
                    <div>Cookies Settings</div>
                </div>
            </div>
            <div>
                <div className='font-semibold'>STAY CONNECTED</div>
                <div className='pt-1 md:pt-2 text-gray-400'>
                    <div>Facebook</div>
                    <div>Instagram</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
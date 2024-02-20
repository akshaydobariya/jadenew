'use client'
import useApiService from '@/services/ApiService';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';

function AuthorProfile() {
    const { getProfile, profileEdit, authorProfile } = useApiService()
    const [profiledata, setProfiledata] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const [file, setFile] = useState()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
    })

    const path = usePathname()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const pathName = path.slice(15)
            authorProfile(pathName).then((res) => {
                setProfiledata(res?.data?.data)
                console.log(res?.data?.data?.author);
            }).catch((er) => {
                console.log(er, "er profile");
            })
        }
    }, [editProfile])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='pt-16 pb-20'>
            <ToastContainer autoClose={2000} />

            <div className='h-[200px] bg-gray-200 flex justify-center items-center'>
                <div className='text-3xl'>Author Profile</div>
            </div>
            <div className='relative'>
                <div className='absolute -top-12 ml-10'>
                    {profiledata?.author?.profileImg == null || profiledata?.author?.profileImg == null ?
                        <Avatar className='w-28 h-28 rounded-full p-1' /> :
                        <Image src={profiledata?.author?.profileImg} alt='profileImg' className='rounded-full h-28 w-28' height={200} width={200} />
                    }
                </div>
                <div className='pt-20 pb-5 flex justify-between px-14 shadow-md'>
                    <div>
                        <div className='text-xl'>{profiledata?.author?.name}</div>
                        <div className='text-base text-gray-700 py-1'>{profiledata?.author?.email}</div>
                        <div className='text-base text-gray-700'>{profiledata?.author?.bio}</div>
                        <div className='text-base text-gray-700'>Total Books - {profiledata?.total_books ? profiledata?.total_books : "0"}</div>
                        {/* <div className='flex items-center'>
                                    <span><CalendarMonthIcon className='text-gray-700' fontSize='small' /></span>
                                    <span className='py-1 text-lg pl-1'>2024-1-10</span>
                                </div> */}
                        {/* <div className='flex'>
                                    <span><LanguageIcon className='text-gray-700' fontSize='small' /></span>
                                    <span className='text-lg pl-1'>Global</span>
                                </div> */}
                    </div>
                    {/* <div className='flex items-start'>
                                <SettingsIcon className='mt-1' titleAccess='setting' />
                                <button className='ml-4 px-7 py-1 backgroundTheme text-white hover:opacity-[.9]' onClick={() => setEditProfile(true)}>Edit Profile</button>
                            </div> */}
                </div>
            </div>
            {/* <div className='pt-7 flex justify-center gap-x-10 lg:gap-x-20 bg-gray-200 py-10 text-gray-800'>
                <div>
                    <div className='text-center text-4xl'>10</div>
                    <div>Total Books</div>
                </div>
                <div>
                    <div className='text-center text-4xl'>4.5</div>
                    <div>Total Ranking</div>
                </div>
                <div>
                    <div className='text-center text-4xl'>10</div>
                    <div>Total Books</div>
                </div>
            </div> */}
        </div>

    )
}

export default AuthorProfile
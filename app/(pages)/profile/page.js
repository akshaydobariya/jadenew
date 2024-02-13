'use client'
import useApiService from '@/services/ApiService';
import React, { useEffect, useState } from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import Image from 'next/image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function page() {
    const { getProfile, profileEdit } = useApiService()
    const [profiledata, setProfiledata] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const [file, setFile] = useState()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProfile().then((res) => {
                setProfiledata(res?.data?.data)
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

    const editProfileApi = () => {
        const form = new FormData()
        form.append('name', input.name ? input.name : profiledata?.name ? profiledata?.name : "")
        form.append('email', input.email ? input.email : profiledata?.email ? profiledata?.email : "")
        form.append('password', input.password ? input.password : profiledata?.password ? profiledata?.password : "")
        form.append('bio', input.bio ? input.bio : profiledata?.bio ? profiledata?.bio : "")
        form.append('profileImg', file ? file : profiledata?.profileImg ? profiledata?.profileImg : "")

        profileEdit(form).then((res) => {
            toast.success(res?.data?.message)
            setEditProfile(false)
        }).catch((er) => {
            console.log(er, "Error Edit Profile");
        })
    }

    return (
        <div className='pt-16 pb-20'>
            <ToastContainer autoClose={2000} />
            {editProfile ?
                <div className='flex flex-col justify-center items-center pt-5'>
                    <div className='text-start w-full pl-4 pb-5'>
                        <span onClick={() => setEditProfile(false)} className='cursor-pointer flex '>
                            <ArrowBackIcon />
                            <div className='hidden md:block'>Back</div>
                        </span>
                    </div>
                    <div className='text-xl text-gray-800 dark:text-white pb-3'>Edit Profile</div>
                    <div className='border px-20 mx-4 p-4 rounded-md bg-gray-200 dark:bg-gray-950 shadow-[0px_2px_7px_2px_#cfcfcf] dark:shadow-md'>
                        <div className='flex justify-center pb-5'>
                            <label for="file-input">
                                {file ?
                                    <Image src={file} height={100} width={100} className='rounded-full h-20 w-20' /> :
                                    <Avatar className='h-20 w-20' />}
                            </label>
                            <input type='file' className='hidden' id='file-input' onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
                        </div>
                        <div className='flex flex-col gap-y-4 text-gray-700'>
                            <input
                                onChange={handleChange}
                                placeholder='Your Name'
                                name='name'
                                defaultValue={profiledata?.name}
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                            />
                            <input
                                onChange={handleChange}
                                placeholder='Your Email'
                                name='email'
                                defaultValue={profiledata?.email}
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                            />
                            <input
                                onChange={handleChange}
                                placeholder='Your password'
                                name='password'
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                            />
                            <input
                                onChange={handleChange}
                                placeholder='Your bio'
                                name='bio'
                                defaultValue={profiledata?.bio}
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                            />
                        </div>
                        <button onClick={() => editProfileApi()} className='w-full rounded-full mt-5 buttonGradient py-[6px] text-white'>Edit</button>
                    </div>
                </div>
                :
                <>
                    <div className='h-[200px] bg-gray-200 dark:bg-gray-600 flex justify-center items-center'>
                        <div className='text-3xl'>Your Profile</div>
                    </div>
                    <div className='relative'>
                        <div>
                            {(profiledata?.profileImg == '' || profiledata?.profileImg == null) ? <Avatar className='w-28 h-28 rounded-full p-1 absolute -top-12 ml-10' /> :
                                <Image height={100} width={100} src={profiledata?.profileImg} alt='' className='w-28 h-28 rounded-full border-2 border-black p-1 absolute -top-12 ml-10' />
                            }
                        </div>
                        <div className='pt-20 flex justify-between px-14'>
                            <div>
                                <div className='text-xl'>{profiledata?.name}</div>
                                <div className='text-base text-gray-700 dark:text-gray-300 py-1'>{profiledata?.email}</div>
                                <div className='text-base text-gray-700 dark:text-gray-300'>{profiledata?.bio}</div>
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
                                {/* <SettingsIcon className='mt-1' titleAccess='setting' /> */}
                                <button className='ml-4 px-7 py-1 backgroundTheme text-white hover:opacity-[.9]' onClick={() => setEditProfile(true)}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default page

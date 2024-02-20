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
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

function page() {
    const { getProfile, profileEdit } = useApiService()
    const [profiledata, setProfiledata] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const [file, setFile] = useState()
    const [tab, setTab] = useState("setting")
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
            <div className='flex justify-center pt-10 gap-x-8 font-semibold border-b text-lg'>
                <div onClick={() => setTab("profile")} className={`cursor-pointer ${tab == "profile" ? 'border-b-2 border-blue-600' : ''}`}>Edit Profile</div>
                <div onClick={() => setTab("setting")} className={`cursor-pointer ${tab == "setting" ? 'border-b-2 border-blue-600' : ''}`}>Settings</div>
            </div>

            {tab == 'profile' ?
                <div>
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
                                <div className='flex justify-center pb-5 relative'>
                                    <label for="file-input">
                                        {file ?
                                            <Image src={file} height={100} width={100} className='rounded-full h-20 w-20' /> :
                                            <Avatar className='h-20 w-20' />}
                                        <EditIcon className='cursor-pointer absolute bottom-[1rem] right-[4rem] md:right-[7.5rem] text-gray-800 bg-gray-500 p-1 border rounded-full' fontSize='medium' />
                                    </label>
                                    <input type='file' className='hidden' id='file-input' onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
                                </div>
                                <div className='flex flex-col gap-y-4 text-gray-700'>
                                    <div>
                                        <label className='text-sm dark:text-white'>Username :</label>
                                        <input
                                            onChange={handleChange}
                                            placeholder='Your Name'
                                            name='name'
                                            defaultValue={profiledata?.name}
                                            className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                        />
                                    </div>

                                    <div>
                                        <label className='text-sm dark:text-white'>Email :</label>
                                        <input
                                            onChange={handleChange}
                                            placeholder='Your Email'
                                            name='email'
                                            defaultValue={profiledata?.email}
                                            className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                        />
                                    </div>

                                    <div>
                                        <label className='text-sm dark:text-white'>Password :</label>
                                        <input
                                            onChange={handleChange}
                                            placeholder='Your password'
                                            name='password'
                                            className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                        />
                                    </div>

                                    <div>
                                        <label className='text-sm dark:text-white'>Bio :</label>
                                        <input
                                            onChange={handleChange}
                                            placeholder='Your bio'
                                            name='bio'
                                            defaultValue={profiledata?.bio}
                                            className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                        />
                                    </div>
                                </div>
                                <button onClick={() => editProfileApi()} className='w-full rounded-full mt-5 buttonGradient py-[6px] text-white'>Edit</button>
                            </div>
                        </div>
                        :
                        <div>
                            <div className='md:max-w-[600px] m-auto pt-10 px-4'>
                                <div className='text-3xl border-b font-semibold pb-1'>Your Profile</div>
                                <div className='pt-3'>
                                    <div className='w-[7.5rem] rounded-full text-gray-500'>
                                        {(profiledata?.profileImg == '' || profiledata?.profileImg == null) ? <div className='bg-gray-200 text-[10px] cursor-pointer px-4 py-11'> Drag & Drop your picture or <span className='underline'>Browse</span></div> :
                                            <Image height={100} width={100} src={profiledata?.profileImg} alt='' className='w-28 h-28 rounded-full border-2 border-black p-1' />
                                        }
                                    </div>
                                    <div className='pt-6'>
                                        <div className=''>
                                            <div>
                                                <label className='text-sm font-semibold'>Username</label>
                                                <div className='text-base border-2 text-gray-700 dark:text-gray-300 py-1 rounded-md px-3 w-[300px]'>{profiledata?.name}</div>
                                            </div>
                                            <div className='py-3'>
                                                <label className='text-sm'>Email</label>
                                                <div className='border-2 text-base text-gray-700 dark:text-gray-300 py-1 rounded-md px-3 w-[300px]'>{profiledata?.email}</div>
                                            </div>
                                            <div>
                                                <label className='text-sm'>Bio</label>
                                                <div className='border-2 text-base text-gray-700 dark:text-gray-300 py-1 rounded-md px-3 w-[300px]'>{profiledata?.bio}</div>
                                            </div>
                                        </div>
                                        <button className='mt-6 rounded-md px-7 py-1 backgroundTheme text-white hover:opacity-[.9]' onClick={() => setEditProfile(true)}>Edit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className='md:max-w-[600px] m-auto pt-10 px-4'>
                    <div className='text-2xl border-b font-semibold pb-1'>General Settings</div>
                    <div className='pt-4'>
                        <div className='pb-1'>Delete My Account</div>
                        <div className='text-sm text-gray-600'>If you delete your account, you will lose access to all associated bookmarks, purchases, and settings. Account deletion is irreversible.</div>
                        <button className='border px-10 py-1 bg-red-600 rounded-md mt-4 text-white'>Delete account</button>
                    </div>
                </div>}
        </div>
    )
}

export default page

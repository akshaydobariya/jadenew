'use client'
import useApiService from '@/services/ApiService';
import React, { useEffect, useState } from 'react'
import popularComicTwo from '../../../public/assets/Images/PopularComics/comicsTwo.jpg'
import Image from 'next/image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, CircularProgress, Switch } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function page() {
    const { allNotificationBookmark, getProfile, profileEdit, profileImageEdit } = useApiService()
    const [profiledata, setProfiledata] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const [file, setFile] = useState()
    const [visible, setVisible] = useState(false);
    const [tab, setTab] = useState("profile")
    const [lodingImage, setLoadingImage] = useState(false)
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
    })

    useEffect(() => {
        profileGet()
    }, [editProfile])

    const profileGet = () => {
        if (localStorage.getItem('token')) {
            getProfile().then((res) => {
                setProfiledata(res?.data?.data)
            }).catch((er) => {
                console.log(er, "er profile");
            })
        }
    }

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


        profileEdit(form).then((res) => {
            toast.success(res?.data?.message)
            setEditProfile(false)
        }).catch((er) => {
            console.log(er, "Error Edit Profile");
        })
    }

    const editProfileImage = (Imgfile) => {
        setLoadingImage(true)
        const form = new FormData()
        form.append('images', Imgfile ? Imgfile : profiledata?.profileImg ? profiledata?.profileImg : "")
        profileImageEdit(form).then((res) => {
            console.log(res, "image res")
            profileGet()
            setLoadingImage(false)
        }).catch((er) => {
            console.log(er)
        })
    }

    const handleNotification = (data) => {
        allNotificationBookmark(data).then((res) => {
            console.log(res)
        }).catch((er) => {
            console.log(er, "er")
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
                    {
                        <div>
                            <div className='md:max-w-full m-auto pt-10 sm:px-24  '>
                                <div className='text-3xl border-b font-semibold w-full flex sm:justify-start justify-center mx-auto my-0 pb-1 sm:px-0 px-10'>Your Profile</div>
                                <div className='pt-3 sm:flex block gap-20 sm:px-24 px-10'>
                                    <div className='w-[7.5rem] rounded-full flex mx-auto     my-0 justify-center items-center text-gray-500'>
                                        <div className='flex justify-center pb-5 relative'>
                                            <label htmlFor="file-input" className='relative'>
                                                {lodingImage ?
                                                    <div className='border p-7 rounded-full'>
                                                        <CircularProgress size={20} color='secondary' />
                                                    </div>
                                                    :
                                                    profiledata?.profileImg ?
                                                        <Avatar src={profiledata?.profileImg} className='sm:my-10' style={{ height: '10rem', width: '10rem' }} /> :
                                                        <Avatar className='sm:my-10' sx={{ height: '10rem', width: '10rem' }} />}
                                                <EditIcon className='cursor-pointer absolute sm:bottom-[3rem] bottom-[.3rem] right-[1.5rem] md:right-[1.5rem] text-gray-800 bg-gray-500 p-1 border rounded-full' fontSize='medium' />
                                            </label>
                                            <input type='file' className='hidden' id='file-input' onChange={(e) => editProfileImage(e.target.files[0])} />
                                        </div>
                                        {/* {(profiledata?.profileImg == '' || profiledata?.profileImg == null) ? <div className='bg-gray-200 text-[10px] cursor-pointer px-4 py-11'> Drag & Drop your picture or <span className='underline'>Browse</span></div> :
                                            <Image height={100} width={100} src={profiledata?.profileImg} alt='' className='w-28 h-28 rounded-full border-2 border-black p-1' />
                                        } */}
                                    </div>
                                    <div className='sm:pt-6 flex-1'>
                                        <div className=''>
                                            <div className='flex flex-col gap-y-4 text-gray-700'>
                                                <div className='grid sm:grid-cols-2 sm:gap-10'>
                                                    <div>
                                                        <label className='text-sm dark:text-white'>User Name :</label>
                                                        <input
                                                            onChange={handleChange}
                                                            placeholder='Your Name'
                                                            disabled
                                                            name='name'
                                                            defaultValue={profiledata?.name}
                                                            className='border bg-[#b5b1b133]  focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className='text-sm dark:text-white'>Email :</label>
                                                        <input
                                                            onChange={handleChange}
                                                            placeholder='Your Email'
                                                            name='email'
                                                            disabled
                                                            defaultValue={profiledata?.email}
                                                            className='border bg-[#b5b1b133] focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                                        />
                                                    </div></div>

                                                <div className='relative'>
                                                    <label className='text-sm dark:text-white'>Password :</label>
                                                    <input
                                                        onChange={handleChange}
                                                        type={visible ? "text" : "password"}
                                                        placeholder='Your password'
                                                        name='password'
                                                        className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                                    />
                                                    <div>
                                                        {!visible ? <Visibility className="text-xs absolute bottom-[0.4rem] right-[0.4rem] text-slate-400 cursor-pointer" onClick={() => setVisible(!visible)} /> :
                                                            <VisibilityOff className="text-xs absolute bottom-[0.4rem] right-[0.4rem] text-slate-400 cursor-pointer" onClick={() => setVisible(!visible)} />}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className='text-sm dark:text-white'>Bio :</label>
                                                    <textarea
                                                        rows={5}
                                                        onChange={handleChange}
                                                        placeholder='Your bio'
                                                        name='bio'
                                                        defaultValue={profiledata?.bio}
                                                        className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white'
                                                    />
                                                </div>
                                            </div>
                                            <button onClick={() => editProfileApi()} className=' w-fit px-10 rounded-md mt-5 buttonGradient py-[6px] text-white'>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className='md:max-w-full min-h-[450px] m-auto pt-10 sm:px-24'>
                    <div className='text-3xl border-b font-semibold w-full flex sm:justify-start justify-center mx-auto my-0 pb-1 sm:px-0 px-10'>General Settings</div>
                    <div className='pt-4 px-10'>
                        <div className='pb-1'>Delete My Account</div>
                        <div className='text-sm text-gray-600 dark:text-gray-200'>If you delete your account, you will lose access to all associated bookmarks, purchases, and settings. Account deletion is irreversible.</div>
                        <button className='border px-10 py-1 bg-red-600 rounded-md mt-4 text-white'>Delete account</button>
                    </div>

                    {/* <div className='py-8'>
                        <div className='text-2xl border-b font-semibold pb-1'>Web Notification Settings</div>
                        <div className='flex justify-between pt-3'>
                            <div>
                                <div>Unlock Updates</div>
                                <div>Receive notification when chapters are ready to be unlocked</div>
                            </div>
                            <Switch {...label} defaultChecked onChange={(e) => handleNotification(e.target.checked)} />
                        </div>
                    </div> */}

                    <div className='pt-12 px-10'>
                        <div className='text-2xl border-b font-semibold pb-1'>Push Notification Settings</div>
                        <div className='flex justify-between pt-3'>
                            <div>
                                <div>Chapter Updates</div>
                                <div>Receive notification when chapters of bookmarked series are published</div>
                            </div>
                            <Switch {...label} defaultChecked onChange={(e) => handleNotification(e.target.checked)} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default page

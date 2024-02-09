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

    // console.log();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authorProfile('65c5aed4bb685dd84a9d7948').then((res) => {
                setProfiledata(res?.data?.data?.author)
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
                <div className='flex flex-col justify-center items-center pt-10'>
                    <div className='text-xl text-gray-800 pb-3'>Edit Profile</div>
                    <div className='border px-20 p-4 rounded-md bg-gray-200' style={{ boxShadow: "0px 2px 7px 2px #cfcfcf" }}>
                        <div className='flex justify-center pb-5'>
                            <label for="file-input">
                                <Avatar className='h-20 w-20' />
                            </label>
                            <input type='file' className='hidden' id='file-input' onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
                        </div>
                        <div className='flex flex-col gap-y-4 text-gray-700'>
                            <input
                                onChange={handleChange}
                                placeholder='Your Name'
                                name='name'
                                defaultValue={profiledata?.name}
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full'
                            />
                            <input
                                onChange={handleChange}
                                placeholder='Your Email'
                                name='email'
                                defaultValue={profiledata?.email}
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full'
                            />
                            <input
                                onChange={handleChange}
                                placeholder='Your password'
                                name='password'
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full'
                            />
                            <input
                                onChange={handleChange}
                                placeholder='Your bio'
                                name='bio'
                                defaultValue={profiledata?.bio}
                                className='border focus:outline-none text-sm py-2 px-2 rounded-md w-full'
                            />
                        </div>
                        <button onClick={() => editProfileApi()} className='w-full rounded-full mt-5 buttonGradient py-[6px] text-white'>Edit</button>
                    </div>
                </div>
                :
                <>
                    <div className='h-[200px] bg-gray-200 flex justify-center items-center'>
                        <div className='text-3xl'>Author Profile</div>
                    </div>
                    <div className='relative'>
                        <div className='absolute -top-12 ml-10'>
                            {profiledata?.profileImg == '' ?
                                <Avatar className='w-28 h-28 rounded-full p-1' /> :
                                <Image src={profiledata?.profileImg} alt='profileImg' className='rounded-full h-28 w-28' height={200} width={200} />
                            }
                        </div>
                        <div className='pt-20 pb-5 flex justify-between px-14 shadow-md'>
                            <div>
                                <div className='text-xl'>{profiledata?.name}</div>
                                <div className='text-base text-gray-700 py-1'>{profiledata?.email}</div>
                                <div className='text-base text-gray-700'>{profiledata?.bio}</div>
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
                </>
            }
            <div className='pt-7 flex justify-center gap-x-10 lg:gap-x-20 bg-gray-200 py-10 text-gray-800'>
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
            </div>
        </div>

    )
}

export default AuthorProfile
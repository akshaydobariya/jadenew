'use client'
import React, { useState } from 'react'
import leftImage from '../../public/assets/Images/LoginPageImage.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useApiService from '@/services/ApiService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function LoginPage() {
    const router = useRouter()
    const { loginApi, verifyOtpApi, forgotPasswordApi } = useApiService()
    const [otpScreen, setOtpScreen] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [forgotPassword, setForgotPassword] = useState(false)
    // const [forgotPasswordInput, setForgotPasswordInput] = useState()
    const [input, setInput] = useState({
        email: "",
        password: "",
        otp: "",
        forgotPassword: "",
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const userLogin = () => {
        if (input.email == '') {
            setEmailError('Email not valid')
        }
        if (input.password == '') {
            setPasswordError('password error')
        }
        const form = new FormData()
        form.append("email", input.email)
        form.append("password", input.password)
        loginApi(form).then((res) => {
            if (res.status == 200) {
                toast.success(res?.data?.data?.message)
                setOtpScreen(true)
            }
        }).catch((er) => {
            toast.error(er?.response?.data?.message)
        })
    }

    const OtpVerify = () => {
        const form = new FormData()
        form.append("email", input.email)
        form.append("password", input.password)
        form.append('otp', input.otp)
        verifyOtpApi(form).then((res) => {
            if (res.status == 200) {
                localStorage.setItem('token', res?.data?.data?.accessToken)
                toast.success('Login succesfully')
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            }
        })
    }

    const forgotPasswordButton = () => {
        // const form = new FormData()
        // form.append('password', input.forgotPassword)
        // forgotPasswordApi(form).then((res) => {
        //     console.log(res, "forgot password");
        // }).catch((er) => {
        //     console.log("error forgotPassword", er);
        // })
    }

    return (
        <div>
            <ToastContainer />
            <section className="lg:h-screen mt-36 mb-24 lg:mt-0 lg:mb-0">
                <div className="h-full">
                    {/* <!-- Left column container with background--> */}
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between lg:mt-10">
                        <div className="hidden lg:flex rounded-r-[90px] shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 bg-[#5d8f9b] justify-center items-center h-full"
                            style={{ boxShadow: "rgb(189 225 233) 5px 0px 16px 0px" }}>
                            <Image
                                src={leftImage}
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>

                        {/* <!-- Right column container --> */}
                        <div className="rounded-lg py-10 px-10 lg:mr-20 lg:mb-0 md:w-8/12 lg:w-5/12 xl:w-1/3"
                            style={{ boxShadow: "0px 0px 6px 0px #D5D0D1" }}>
                            {forgotPassword ?
                                <div>
                                    <div className="mb-5 flex items-center lg:justify-start">
                                        <KeyboardBackspaceIcon onClick={() => setForgotPassword(false)} className='cursor-pointer' />
                                        <p className="text-2xl font-semibold ml-5">Forgot Password</p>
                                    </div>
                                    <div className='flex justify-center flex-col'>
                                        <input
                                            type="forgotPassword"
                                            name='forgotPasswrd'
                                            label="Email address"
                                            placeholder='Enter Your password'
                                            size="lg"
                                            onChange={handleChange}
                                            className="border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                        />
                                        <span className='text-sm text-red-600 pl-1'>{emailError}</span>
                                        <div className='flex justify-center mt-4'>
                                            <button onClick={() => forgotPasswordButton()} className='border px-3 py-1 w-max bg-black text-white'>Forgot password</button>
                                        </div>
                                    </div>
                                </div> :
                                <form>
                                    {/* <!--Sign in section--> */}
                                    <div className="flex flex-col items-center justify-center lg:justify-start">
                                        <p className="mb-5 md:mb-10 mr-4 text-2xl font-semibold">Login</p>
                                    </div>

                                    <div className='flex flex-col'>
                                        {/* <!-- Email input --> */}
                                        <input
                                            type="email"
                                            name='email'
                                            label="Email address"
                                            placeholder='Enter Your Email'
                                            size="lg"
                                            onChange={handleChange}
                                            className="border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                        />
                                        <span className='text-sm text-red-600 pl-1'>{emailError}</span>

                                        {/* <!--Password input--> */}
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='Enter Your Password'
                                            label="Password"
                                            size="lg"
                                            onChange={handleChange}
                                            className="mt-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                        />
                                        <span className='text-sm text-red-600 pl-1'>{passwordError}</span>

                                        {otpScreen &&
                                            <input
                                                type='otp'
                                                name='otp'
                                                placeholder='Enter Otp'
                                                label='Otp'
                                                size='lg'
                                                onChange={handleChange}
                                                className="mt-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                            />}
                                    </div>

                                    {/* <!-- Remember me checkbox --> */}
                                    {/* <div className="mb-6 flex items-center justify-between">
                                    <div className="mb-[0.125rem] block min-h-[1.5rem]">
                                        <input
                                            className="mr-[4px]"
                                            type="checkbox"
                                            value=""
                                            id="exampleCheck2"
                                        />
                                        <label
                                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="exampleCheck2"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <a href="#!">Forgot password?</a>
                                </div> */}

                                    {/* <!-- Login button --> */}
                                    <div className="text-center lg:text-left">
                                        <div rippleColor="light" className='flex justify-center mt-2'>
                                            {otpScreen ?
                                                <button
                                                    onClick={() => OtpVerify()}
                                                    type="button"
                                                    className="w-full inline-block rounded bg-primary px-2 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                >
                                                    Verify Otp
                                                </button>
                                                :
                                                <button
                                                    onClick={() => userLogin()}
                                                    type="button"
                                                    className="w-full inline-block rounded bg-primary px-2 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                >
                                                    Login
                                                </button>
                                            }
                                        </div>

                                        {/* <!-- Register link --> */}
                                        <div className='flex items-center justify-between mt-2 pt-1 text-sm font-semibold'>
                                            <p onClick={() => router.push('/register')} className="mb-0 cursor-pointer">
                                                Don't have an account?{" "}Register
                                            </p>
                                            <button onClick={() => setForgotPassword(true)}>Forgot password?</button>
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage

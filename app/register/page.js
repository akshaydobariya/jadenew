'use client'
import React, { useState } from 'react'
import leftImage from '../../public/assets/Images/LoginPageImage.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useApiService from '@/services/ApiService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material'

function RegisterPage() {
    const router = useRouter()
    const { signUpApi, verifyOtpApi } = useApiService()
    const [loadingButton, setLoadingButton] = useState(false)
    const [otpScreen, setOtpScreen] = useState(false)
    const [input, setInput] = useState({
        email: "",
        password: "",
        otp: "",
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const SignUp = () => {
        setLoadingButton(true)
        const form = new FormData()
        form.append("email", input.email)
        form.append("password", input.password)
        form.append('name', input.name)
        signUpApi(form).then((res) => {
            if (res.status == 200) {
                setLoadingButton(false)
                console.log(res, "res signup");
                toast.success(res?.data?.message?.message)
                setOtpScreen(true)
            }
        }).catch((er) => {
            toast.error(er?.response?.data?.message)
        })
    }

    const OtpVerify = () => {
        setLoadingButton(true)
        const form = new FormData()
        form.append("email", input.email)
        form.append("otp", input.otp)
        verifyOtpApi(form).then((res) => {
            localStorage.setItem("token", res?.data?.data?.accessToken)
            toast.success("Account Registered Successfully.")
            setTimeout(() => {
                router.push('/login')
                setLoadingButton(false)
            }, 2000);
        }).catch((er) => {
            console.log(er, "er");
        })
    }

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <section className="h-[70vh]  lg:mt-0 lg:mb-0">
                <div className="h-full">
                    {/* <!-- Left column container with background--> */}
                    <div className="g-6  relative flex h-full items-center justify-center lg:mt-10">
                        <div className="mt-[8rem] sm:mt-[3rem] flex  shrink-1  grow-0 basis-auto md:mb-0  md:shrink-0 w-full bg-[#5d8f9b] justify-center items-center h-full" style={{ boxShadow: "rgb(189 225 233) 5px 0px 16px 0px" }}>
                            {/*  <Image
                                src={leftImage}
                                className="w-full h-full object-contain"
                                alt="Sample image"
                            /> */}


                            {/* <!-- Right column container --> */}
                            <div className="rounded-lg absolute flex mx-auto my-0 right-0 left-0 bg-[#1313134f] py-10 px-10 sm:w-2/4 w-full"
                                style={{ boxShadow: "0px 0px 6px 0px #D5D0D1" }}>
                                <form className='w-full sm:px-10'>
                                    {/* <!--Sign in section--> */}
                                    <div className="flex flex-col items-center justify-center lg:justify-start">
                                        <p className="mb-6 mr-4 text-2xl font-semibold text-white">SIGN UP</p>
                                    </div>

                                    <div className='flex flex-col'>
                                        <input
                                            type="text"
                                            name='name'
                                            label="User Name"
                                            disabled={otpScreen}
                                            placeholder='Enter User Name'
                                            size="lg"
                                            onChange={handleChange}
                                            className="mb-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                        />
                                        {/* <!-- Email input --> */}
                                        <input
                                            type="email"
                                            name='email'
                                            disabled={otpScreen}
                                            label="Email address"
                                            placeholder='Enter Your Email'
                                            size="lg"
                                            onChange={handleChange}
                                            className="mb-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                        />

                                        {/* <!--Password input--> */}
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='Enter Your Password'
                                            label="Password"
                                            disabled={otpScreen}
                                            onChange={handleChange}
                                            className="mb-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                            size="lg"
                                        />

                                        {otpScreen &&
                                            <input
                                                type="password"
                                                name='otp'
                                                placeholder='Enter OTP'
                                                label="Password"
                                                onChange={handleChange}
                                                className="mb-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2"
                                                size="lg"
                                            />}
                                    </div>

                                    {/* <!-- Remember me checkbox --> */}
                                    {/* <div className="mb-6 flex items-center justify-between">
                                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
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
                                        <div rippleColor="light" className='flex justify-center'>
                                            {otpScreen ?
                                                (loadingButton ? <div className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                    <CircularProgress size={20} />
                                                </div> :
                                                    <button
                                                        onClick={() => OtpVerify()}
                                                        type="button"
                                                        className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                    >
                                                        Verify Otp
                                                    </button>)
                                                :
                                                (loadingButton ? <div className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                    <CircularProgress size={20} />
                                                </div> :
                                                    <button
                                                        onClick={() => SignUp()}
                                                        type="button"
                                                        // disabled={input !== '' && input.password !== ''}
                                                        className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                    >
                                                        SignUp
                                                    </button>)}
                                        </div>

                                        {/* <!-- Register link --> */}
                                        <p onClick={() => router.push('/login')} className="mb-0 mt-2 pt-1 text-sm font-normal w-fit text-white cursor-pointer">
                                            Already have an account?{" "}Login
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RegisterPage

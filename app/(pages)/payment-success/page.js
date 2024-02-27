'use client'
import { COIN_HISTORY } from '@/app/Redux/slice/userSlice'
import useApiService from '@/services/ApiService'
import React from 'react'
import { useDispatch } from 'react-redux'
import load from '../../../public/assets/Images/done.gif';
import Image from 'next/image'
function page() {
    const { accesssToken } = useApiService()
    const dispatch = useDispatch()

    const accessTokenApi = () => {
        accesssToken().then((res) => {
            dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
        }).catch((er) => {
        })
    }

    return (
        <div className='md:pt-24 pt-16 px-26 w-fit flex mx-auto h-[100vh] my-0 justify-center items-center'>
            <div class="">
                <div class="bg-white p-6 px-16 rounded-2xl md:mx-auto w-full">
                <Image src={load} alt="my gif" height={220} className='flex mx-auto justify-center' width={220} />
                    <div class="text-center">
                        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done</h3>
                        <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                        <p> Have a great day!  </p>
                        <div class="py-10 text-center" onClick={() => accessTokenApi()}>
                            <a href="/package" class="px-12 bg-indigo-600 cursor-pointer rounded-md hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
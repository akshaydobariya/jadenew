'use client'
import useApiService from '@/services/ApiService'
import { useEffect, useState } from 'react'

function page() {
    const [aboutData, setAboutData] = useState()
    const { cms } = useApiService()

    useEffect(() => {
        cms('privacy_policy').then((res) => {
            setAboutData(res?.data?.data)
        }).catch((er) => {
            console.log(er)
        })
    }, [])

    return (
        <div className='pt-20'>
            <div className='pt-4 pb-8 px-20 break-all h-screen overflow-y-scroll w-full' dangerouslySetInnerHTML={{ __html: aboutData?.description }}></div>
        </div>
    )
}

export default page
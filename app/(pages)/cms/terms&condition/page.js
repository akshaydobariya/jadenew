'use client'
import useApiService from '@/services/ApiService'
import { useEffect, useState } from 'react'

function page() {
    const [aboutData, setAboutData] = useState([])
    const { cms } = useApiService()

    useEffect(() => {
        cms('terms_and_conditions').then((res) => {
            setAboutData(res?.data?.data)
        }).catch((er) => {
            console.log(er)
        })
    }, [])

    return (
        <div className='pt-20'>
            {aboutData?.map((data, index) => {
                return (
                    <div>
                        <div key={index} className='pt-4 pb-8 px-20 break-all h-screen  w-full' dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                    </div>
                )
            })}
        </div>
    )
}

export default page
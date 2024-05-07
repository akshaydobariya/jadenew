'use client'
import useApiService from '@/services/ApiService'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function page() {
    const [cmsData, setCmsData] = useState([])
    const { cms } = useApiService()
    const pathname = usePathname()

    useEffect(() => {
        let cmsType;
        if (pathname == '/cms/terms&condition') {
            cmsType = 'terms_and_conditions'
        } else if (pathname == '/cms/contactUs') {
            cmsType = 'contact'
        } else if (pathname == '/cms/privacy_policy') {
            cmsType = 'privacy_policy'
        } else {
            cmsType = 'about'
        }

        cms(cmsType).then((res) => {
            setCmsData(res?.data?.data)
        }).catch((er) => {
            console.log(er)
        })
    }, [])

    return (
        <div className={`pt-20 ${pathname == '/cms/aboutUs' ? 'pb-48' : ''}`}>
            {cmsData?.map((data, index) => {
                return (
                    <div key={index} className='pt-4 pb-8 px-8 md:px-20 break-all h-full w-full' dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                )
            })}
        </div>
    )
}

export default page
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link'
import ButtonBook from './ButtonBook'
import PaginationControlled from '@/components/pagination';
import comingSoon from '../../../public/assets/icon/comingSoon.png'

function Home(props) {
    const [page, setPage] = useState(1)
    return (
        <div className='pt-20 m-2 px-3 md:px-5 xl:px-52'>
            <div className='flex justify-center items-center py-48'>
                <Image src={comingSoon} alt="coming-soon" height={200} width={200} />
            </div>
          
        </div>
    )
}

export default Home
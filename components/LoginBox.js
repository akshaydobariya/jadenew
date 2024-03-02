import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/navigation';

function LoginBox() {
    const router = useRouter()
    return (
        <div className='border p-4 my-3 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white lg:w-[600px] m-auto'>
            <div className='text-center pb-2 text-2xl'>Log in to continue your adventure</div>
            <div className='py-4 mb-2 text-gray-600'>
                <div className='flex items-center pb-3'>
                    <LockIcon className='text-blue-500' fontSize='small' />
                    <div className='pl-[6px] dark:text-white'>Unlock and Read free chapters every day</div>
                </div>
                <div className='flex items-center'>
                    <LockIcon className='text-blue-500' fontSize='small' />
                    <div className='pl-[6px] dark:text-white'>Bookmark your novel and never lose track of your progress</div>
                </div>
            </div>
            <div className='flex justify-center flex-col w-max m-auto'>
                <button onClick={() => router.push('/login')} className='border px-6 py-[6px] rounded-md bg-blue-500 text-white'>LOG IN</button>
                {/* <button className='border px-10 py-2 rounded-full bg-blue-500 text-white'>SIGN UP</button> */}
            </div>
        </div>
    )
}

export default LoginBox
"use client"
import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Header() {
    const router = useRouter();

    return (
        <div className='bg-gray-900 text-white static inset-x-0 top-0 w-full z-[9999] shadow-sm'>
            <div className='flex justify-between items-center px-5 pt-4 pb-4'>
                <div className='flex items-center'>
                    <div className='block md:hidden'>
                        <MenuIcon />
                    </div>
                    <div className='text-2xl pl-3 cursor-pointer' onClick={() => router.push('/')}>Zscroll</div>
                </div>
                <div className='flex items-center'>
                    <div className='md:gap-x-12 hidden md:flex pl-20'>
                        <div onClick={() => router.push('/')} className='cursor-pointer hover:font-semibold hover:text-lg'>Home</div>
                        <div onClick={() => router.push('/chapter')} className='cursor-pointer hover:font-semibold hover:text-lg'>Bookmarks</div>
                        <div className='cursor-pointer hover:font-semibold hover:text-lg' onClick={() => router.push('/package')}>Packages</div>
                        {/* <div className='cursor-pointer hover:font-semibold hover:text-lg'>Forum</div> */}
                        <div className='cursor-pointer hover:font-semibold hover:text-lg'>Resources</div>
                    </div>
                </div>
                <div className='flex items-center gap-x-6'>
                    <div className='rounded-full bg-gray-700 md:flex items-center px-2 hidden'>
                        <Image src={searchIcon} alt='' className='h-4 w-4' />
                        <input type="search" placeholder='Search' className='bg-gray-700 text-black py-1 outline-none pl-3 rounded-full inputWidth' />
                    </div>
                    <div className=''>
                        {/* <Image src={user} alt='profile' className='h-7 w-7 object-cover' /> */}
                        <PersonIcon onClick={() => router.push('/login')} fontSize='large' sx={{ cursor: "pointer" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
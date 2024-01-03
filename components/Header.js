"use client"
import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function Header() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='bg-gray-900 text-white fixed inset-x-0 top-0 w-full z-[9999] shadow-sm'>
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
                        <div onClick={() => router.push('/bookmark')} className='cursor-pointer hover:font-semibold hover:text-lg'>Bookmarks</div>
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
                    <div>
                        <PersonIcon onClick={(event) => setAnchorEl(event.currentTarget)} fontSize='large' sx={{ cursor: "pointer" }} />
                    </div>
                </div>
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                sx={{
                    paddingRight: "0px !important",
                    marginTop: "20px"
                }}
            >
                <div>
                    <div className='px-10 py-1 cursor-pointer' onClick={() => router.push('/login')}>Login</div>
                </div>
            </Popover>
        </div>
    )
}

export default Header
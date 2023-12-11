import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'

function Header() {
    return (
        <div className='container'>
            <div className='flex justify-between items-center px-5 pt-4 pb-4 bg-gray-900 text-white fixed top-0 w-full z-[9999]'>
                <div className='text-2xl'>Zscroll</div>
                <div className='flex items-center'>
                    <div className='md:gap-x-12 hidden md:flex pl-20'>
                        <div className='cursor-pointer hover:font-semibold hover:text-lg'>Home</div>
                        <div className='cursor-pointer hover:font-semibold hover:text-lg'>Bookmarks</div>
                        <div className='cursor-pointer hover:font-semibold hover:text-lg'>Forum</div>
                        <div className='cursor-pointer hover:font-semibold hover:text-lg'>Resources</div>
                    </div>
                </div>
                <div className='flex items-center gap-x-6'>
                    <div className='rounded-full bg-gray-700 md:flex items-center px-2 hidden'>
                        <Image src={searchIcon} alt='' className='h-4 w-4' />
                        <input type="search" placeholder='Search' className='bg-gray-700 text-black py-1 outline-none pl-3 rounded-full inputWidth' />
                    </div>
                    <div className=''>
                        <Image src={user} alt='profile' className='h-7 w-7 object-cover' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
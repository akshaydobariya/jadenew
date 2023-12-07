import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'

function Header() {
    return (
        <div>
            <div className='flex justify-between items-center px-5 pt-4 pb-10 bg-gray-700 text-white fixed top-0 w-full'>
                <div className='flex items-center'>
                    <div className='text-2xl'>Zscroll</div>
                    <div className='md:gap-x-12 hidden md:flex pl-20'>
                        <div>Series</div>
                        <div>Bookmarks</div>
                        <div>Forum</div>
                        <div>Resources</div>
                    </div>
                </div>
                <div className='flex items-center gap-x-6'>
                    <div className='rounded-full bg-white flex items-center px-2'>
                        <Image src={searchIcon} alt='' style={{ height: "20px", width: "20px" }} />
                        <input type="search" placeholder='Search' className='bg-white text-black py-1 outline-none pl-3 rounded-full inputWidth' />
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
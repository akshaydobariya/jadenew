import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'

function Header() {
    return (
        <div>
            <div className='flex justify-between items-center px-5 py-3 bg-primary text-white'>
                <div className='text-2xl'>Zscroll</div>
                <div className='flex gap-x-16'>
                    <div>Series</div>
                    <div>Bookmarks</div>
                    <div>Forum</div>
                    <div>Resources</div>
                </div>
                <div className='flex gap-x-6'>
                    <div className='rounded-full bg-primary-light flex items-center px-2'>
                        <Image src={searchIcon} alt='' style={{ height: "20px", width: "20px" }} />
                        <input type="search" placeholder='Search' className='bg-primary-light py-1 outline-none pl-3' />
                    </div>
                    <div>
                        <Image src={user} alt='profile' style={{ height: "20px", width: "20px" }} className='h-10 w-10 object-cover' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
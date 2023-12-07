import banner1 from '../public/assets/Images/Banner/banner-one.jpg'
import banner2 from '../public/assets/Images/Banner/banner-two.jpg'
import banner3 from '../public/assets/Images/Banner/banner-three.jpg'
import banner4 from '../public/assets/Images/Banner/banner-four.jpg'
import banner5 from '../public/assets/Images/Banner/banner-five.jpg'
import heroinImg from '../public/assets/Images/Banner/heroin.jpeg'
import Image from 'next/image'
import Rating from '@mui/material/Rating';
import ImageOne from '../public/assets/Images/latesUpdate/ImageOne.jpeg'
import ImageTwo from '../public/assets/Images/latesUpdate/ImageTwo.jpeg'
import ImageThree from '../public/assets/Images/latesUpdate/ImageThree.jpeg'
import ImageFour from '../public/assets/Images/latesUpdate/ImageFour.jpeg'
import ImageFive from '../public/assets/Images/latesUpdate/ImageFive.jpeg'
import ImageSix from '../public/assets/Images/latesUpdate/ImageSix.jpeg'

import originalsOne from '../public/assets/Images/originals/ImageOne.jpg'
import originalsTwo from '../public/assets/Images/originals/ImageTwo.jpg'
import originalsThree from '../public/assets/Images/originals/ImageThree.jpg'
import originalsFour from '../public/assets/Images/originals/ImageFour.jpg'
import originalsFive from '../public/assets/Images/originals/ImageFive.jpg'

const BannerImage = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    // { image: banner4 },
    // { image: banner5 },
]

const CartImage = [
    {
        image: banner1,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: banner2,
        name: "Reborn:Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: banner3,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: banner4,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    {
        image: banner5,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
]

const popular = [
    {
        image: banner1,
        name: "Dragon Prince Yuan",
        section: "Fantasy"
    },
    {
        image: banner2,
        name: "Immortal Martial God",
        section: "Fantasy"
    },
    {
        image: banner3,
        name: "Medical Princess",
        section: "Eastern"
    },
    {
        image: banner4,
        name: "Immortal and Martial Supreme Master",
        section: "Fantasy"
    },
    {
        image: banner5,
        name: "Reborn to Be A Noble Wife",
        section: "Romance"
    },
    {
        image: banner3,
        name: "Talisman Emperor",
        section: "Fantasy"
    },
    {
        image: banner4,
        name: "I Have X-ray Vision: Nude Beauties Love Me",
        section: "Urban"
    },
    {
        image: banner5,
        name: "Supreme Martial Artist",
        section: "Fantasy"
    },
]

const latestUpdate = [
    {
        image: ImageOne,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: ImageTwo,
        name: "Reborn:Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: ImageThree,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: ImageFour,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    {
        image: ImageFive,
        name: "Reborn: Revenge of the Councubine's",
        category: "Romance",
        rating: "4",
    },
    {
        image: ImageSix,
        name: "The Doctor",
        category: "Urban",
        rating: "4.5",
    },
]

const OriginalsImage = [
    {
        image: originalsOne,
        name: "Down of the Gods",
        category: "Wuxi&Xiang",
        rating: "3",
    },
    {
        image: originalsTwo,
        name: "Reborn:Femme Fatels First",
        category: "Wuxi&Xiang",
        rating: "3.5",
    },
    {
        image: originalsThree,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
    },
    {
        image: originalsFour,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
    {
        image: originalsFive,
        name: "Cold-blooded Undercover Master",
        category: "Games",
        rating: "4",
    },
]

function HomePage() {
    return (
        <div className='bg-white rounded-t-3xl pb-10 relative top-16 w-full'>
            <div className='flex gap-4 px-4 pt-5'>
                {/* {BannerImage.map((item, index) => {
                    return (
                        <div className='h-40 md:h-96 w-[28rem]'>
                            <Image src={item.image} alt='' className='h-full w-full rounded-md' />
                        </div>
                    )
                })} */}
                <div className='h-40 md:h-96 w-full flex gap-4'>
                    <Image src={banner2} alt='' className='h-full w-1/2 rounded-md object-cover' />
                    <Image src={banner2} alt='' className='h-full w-1/2 rounded-md object-cover' />
                </div>
            </div>

            <div>
                <div className='md:pt-16 pt-10 px-4 md:px-8'>
                    <div className='text-start pb-5'>
                        <div className='text-2xl md:text-3xl font-semibold'>New Release</div>
                        <div className='text-xl'>Let's read top stories genre!</div>
                    </div>
                    <div className='flex gap-x-4'>
                        {CartImage.map((item, index) => {
                            return (
                                <div className='h-40 md:h-72 w-72'>
                                    <Image src={item.image} alt='' className='h-full w-full rounded-xl' />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='md:mt-16 mt-10 bg-primary py-10 md:px-8 px-2'>
                    <div className='text-start pb-5'>
                        <div className='text-2xl md:text-3xl font-semibold text-white'>Most Popular</div>
                    </div>

                    <div className='flex flex-col md:flex-row'>
                        <div className='md:border border-gray-600 md:w-[30%] w-[100%] flex md:flex-col justify-center items-center md:p-10 mr-6'>
                            <div className='md:w-full md:h-52 w-60 h-32 md:px-9 object-cover pr-3'>
                                <Image src={heroinImg} alt='' className='h-full w-full' />
                            </div>

                            <div className='text-white text-start md:pt-4'>
                                <div className='md:text-2xl text-lg font-semibold'>The Heroin Queen</div>
                                <div className='text-gray-400 md:text-base text-sm font-normal py-1'>Eastern</div>
                                <Rating size='small' name="read-only" value="3.5" readOnly />
                                <div className='text-gray-400 py-1 hidden md:block'>She was a beauty with pretty appearance beyond comparison. Time-traveling to the Alien world thousands of years ago for a few times, she fought against monsters and evils and saved her country ...</div>
                                <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                            </div>
                        </div>

                        <div className='grid md:grid-cols-4 grid-cols-3 md:gap-8 gap-3 justify-end md:w-[70%] pt-10 md:pt-0'>
                            {popular.map((item, index) => {
                                return (
                                    <div className=''>
                                        <div className='md:h-44 md:w-44 h-28 w-28 object-cover'>
                                            <Image src={item.image} alt='' className='h-full w-full' />
                                        </div>
                                        <div className='text-white text-start pt-1'>
                                            <div className='text-sm font-semibold'>{item?.name}</div>
                                            <div className='text-sm py-1'>{item?.section}</div>
                                            <div className='flex items-center'>
                                                <Rating size='small' name="read-only" value="3.5" readOnly />
                                                <span className='text-xs pl-2'>4.5</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-10 px-4 md:px-8'>
                <div className='text-start pb-5'>
                    <div className='text-2xl md:text-3xl font-semibold'>Latest Update</div>
                </div>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-4'>
                    {latestUpdate.map((item, index) => {
                        return (
                            <div className='flex flex-col md:flex-row items-center bg-gray-200 rounded-md'>
                                <div className='min-h-40 min-w-40 h-40 max-w-40'>
                                    <Image src={item.image} className='h-full w-full object-cover' />
                                </div>
                                <div className='pl-1 md:pl-5'>
                                    <div className='text-lg font-semibold'>{item.name}</div>
                                    <div className='py-2 text-gray-600'>{item.category}</div>
                                    <Rating size='small' name="read-only" value={item.rating} readOnly />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <div className='md:pt-16 pt-10 px-4 md:px-8'>
                    <div className='text-start md:pb-5 pb-4'>
                        <div className='text-2xl md:text-3xl font-semibold'>Featured Book</div>
                        <div className='text-sm md:text-xl'>Let's read top stories genre!</div>
                    </div>
                    <div className='flex gap-x-4'>
                        {CartImage.map((item, index) => {
                            return (
                                <div>
                                    <div className='h-40 w-44 md:h-56 md:w-56'>
                                        <Image src={item.image} alt='' className='h-full w-full rounded-xl' />
                                    </div>
                                    <div className='pl-1'>
                                        <div className='text-lg font-semibold'>{item.name}</div>
                                        <div className='py-2 text-gray-600'>{item.category}</div>
                                        <Rating size='small' name="read-only" value={item.rating} readOnly />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='md:py-10 md:mt-10 pt-10 px-4 md:px-28 bg-gray-800'>
                <div className='text-start pb-5'>
                    <div className='text-2xl md:text-3xl font-semibold text-gray-100'>Originals Work</div>
                </div>
                <div className='flex gap-x-5'>
                    {OriginalsImage.map((item, index) => {
                        return (
                            <div className='h-40 md:h-64 w-72'>
                                <Image src={item.image} alt='' className='h-full w-full rounded' />
                                {item.name.length > 10 ?
                                    <div className='font-semibold text-gray-200'>comic - {item.name.slice(0, 10)}...</div> :
                                    <div className='font-semibold text-gray-200'>comic - {item.name}</div>}
                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-end'>
                    <button className='border mt-12 px-10 py-2 text-white slideBtn sliderRight'>Become a genre</button>
                </div>
            </div>

            <div className='md:py-10 px-4'>
                <div className='text-2xl md:text-3xl font-semibold pb-6'>Originals By Genre</div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    {OriginalsImage.map((item, index) => {
                        return (
                            <div className='flex border'>
                                <div className='h-40 md:h-20 w-20'>
                                    <Image src={item.image} alt='' className='h-full w-full rounded' />
                                </div>
                                <div className='pl-3'>
                                    <div>Drama</div>
                                    <div className='font-semibold'>comic - {item.name}</div>
                                    <div>SOY MEDIA/Hansol</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomePage
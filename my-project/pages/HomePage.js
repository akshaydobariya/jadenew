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


const BannerImage = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    // { image: banner4 },
    // { image: banner5 },
]

const CartImage = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    { image: banner4 },
    { image: banner5 },
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

function HomePage() {
    return (
        <div>
            <div className='flex gap-4 px-4 pt-3'>
                {BannerImage.map((item, index) => {
                    return (
                        <div className='h-96 w-[28rem]'>
                            <Image src={item.image} alt='' className='h-full w-full rounded-md' />
                        </div>
                    )
                })}
            </div>

            <div>
                <div className='pt-16 px-8'>
                    <div className='text-start pb-5'>
                        <div className='text-3xl font-semibold'>New Release</div>
                        <div className='text-xl'>Let's read top stories genre!</div>
                    </div>
                    <div className='flex gap-x-4'>
                        {CartImage.map((item, index) => {
                            return (
                                <div className='h-72 w-72'>
                                    <Image src={item.image} alt='' className='h-full w-full rounded-xl' />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='mt-16 bg-primary py-10 px-8
                '>
                    <div className='text-start pb-5'>
                        <div className='text-3xl font-semibold text-white'>Most Popular</div>
                    </div>

                    <div className='flex'>
                        <div className='border border-gray-600 w-[30%] flex flex-col justify-center p-10 mr-6'>
                            <div className='w-full h-52 px-9'>
                                <Image src={heroinImg} alt='' className='h-full w-full' />
                            </div>

                            <div className='text-white text-start pt-4'>
                                <div className='text-2xl font-semibold'>The Heroin Queen</div>
                                <div className='text-gray-400 text-base font-normal py-1'>Eastern</div>
                                <Rating size='small' name="read-only" value="3.5" readOnly />
                                <div className='text-gray-400 py-1'>She was a beauty with pretty appearance beyond comparison. Time-traveling to the Alien world thousands of years ago for a few times, she fought against monsters and evils and saved her country ...</div>
                            </div>
                        </div>

                        <div className='grid grid-cols-4 gap-8 justify-end w-[70%]'>
                            {popular.map((item, index) => {
                                return (
                                    <div className=''>
                                        <div className='h-44 w-44 object-cover'>
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

            <div className='pt-10 px-8'>
                <div className='text-start pb-5'>
                    <div className='text-3xl font-semibold'>Latest Update</div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {latestUpdate.map((item, index) => {
                        return (
                            <div className='flex items-center bg-gray-200 rounded-md'>
                                <div className='min-h-40 min-w-40 h-40 max-w-40'>
                                    <Image src={item.image} className='h-full w-full object-cover' />
                                </div>
                                <div className='pl-5'>
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
                <div>abc</div>
                <div>abc</div>
                <div>abc</div>
            </div>
        </div>
    )
}

export default HomePage
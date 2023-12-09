'use client'
import banner1 from '../public/assets/Images/Banner/banner-one.jpg'
import banner2 from '../public/assets/Images/Banner/banner-two.jpg'
import banner3 from '../public/assets/Images/Banner/banner-three.jpg'
import banner4 from '../public/assets/Images/Banner/banner-four.jpg'
import banner5 from '../public/assets/Images/Banner/banner-five.jpg'
import Image from 'next/image'
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
import Slider from 'react-slick'
import Originals from './Originals'
import FeatureBook from './FeatureBook'
import OriginByGenre from './OriginByGenre'
import LatestUpdate from './LatestUpdate'
import MostPopular from './MostPopular'
import NewRelease from './NewRelease'

const BannerImage = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    // { image: banner4 },
    // { image: banner5 },
]

const NewReleaseData = [
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
    {
        image: banner3,
        name: "Return of Ultra",
        category: "Urban",
        rating: "5",
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
        name: "Cold-blooded Master",
        category: "Games",
        rating: "4",
    },
    // {
    //     image: originalsFive,
    //     name: "Cold-blooded Undercover Master",
    //     category: "Games",
    //     rating: "4",
    // },
    // {
    //     image: originalsTwo,
    //     name: "Reborn:Femme Fatels First",
    //     category: "Wuxi&Xiang",
    //     rating: "3.5",
    // },
    // {
    //     image: originalsThree,
    //     name: "Return of Ultra",
    //     category: "Urban",
    //     rating: "5",
    // },

]

function HomePage() {

    return (
        <div className='bg-white pt-20 pb-10'>
            {/* <div className='flex gap-4 px-4 pt-5'> */}
            {/* {BannerImage.map((item, index) => {
                    return (
                        <div className='h-40 md:h-96 w-[28rem]'>
                            <Image src={item.image} alt='' className='h-full w-full rounded-md' />
                        </div>
                    )
                })} */}
            <div className='grid grid-cols-2 gap-1'>
                <div className='h-36 md:h-[200px] w-full md:pl-[7.5rem]'>
                    <Image src={banner1} alt='' className='h-full w-full rounded-md object-cover' />
                </div>
                <div className='h-36 md:h-[200px] w-full'>
                    <Image src={banner2} alt='' className='h-full w-full rounded-md object-cover' />
                </div>
                <div className='h-36 md:h-[200px] w-full'>
                    <Image src={banner3} alt='' className='h-full w-full rounded-md object-cover' />
                </div>
                <div className='h-36 w-full md:h-[200px] md:w-[500px]'>
                    <Image src={banner4} alt='' className='h-full w-full rounded-md object-cover' />
                </div>
            </div>
            {/* </div> */}

            <section>
                <NewRelease NewReleaseData={NewReleaseData} />
            </section>

            <section>
                <MostPopular popular={popular} />
            </section>

            <section>
                <LatestUpdate latestUpdate={latestUpdate} />
            </section>

            <section>
                <FeatureBook CartImage={CartImage} />
            </section>

            <section className='container'>
                <Originals OriginalsImage={OriginalsImage} />
            </section>

            <section>
                <OriginByGenre OriginalsImage={OriginalsImage} />
            </section>
        </div>
    )
}

export default HomePage
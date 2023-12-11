import Image from 'next/image';
import React from 'react'
import Slider from 'react-slick'

function Originals(props) {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <div className=''>
            <div className='md:py-10 md:mt-10 py-8 px-4 md:px-28 bg-gray-800'>
                <div className='text-start pb-5'>
                    <div className='text-2xl md:text-3xl font-semibold text-gray-100'>Originals Work</div>
                </div>
                <div className='flex'>
                    {/* <Slider {...settings} className='w-full'> */}
                    {/* {props.OriginalsImage.map((item, index) => {
                            return (
                                <div className='OriginalCard'>
                                    <div>
                                        <div key={index} className='img-container h-40 md:h-64 w-52 px-2'>
                                            <Image src={item.image} alt='' className='img-container-img h-full w-full rounded object-cover' />
                                        </div>
                                        <div>
                                            {item.name.length > 10 ?
                                                <div className='font-semibold text-gray-200 pt-1 2xl:pt-2'>comic - {item.name.slice(0, 10)}...</div> :
                                                <div className='font-semibold text-gray-200 pt-1'>comic - {item.name}</div>}
                                        </div>
                                    </div>
                                    <div class="card-details">
                                        <h2>Iron Man</h2>
                                        <p>Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics. </p>
                                    </div>
                                </div>
                            )
                        })} */}
                    {props?.OriginalsImage?.map((item, index) => {
                        return (
                            <div class="card cursor-pointer">
                                <div class="img-container">
                                    <Image src={item.image} />
                                </div>
                                <div class="card-details">
                                    <div className='text-lg py-3 text-red-500'>{item.name}</div>
                                    <p>Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics.</p>
                                </div>
                            </div>
                        )
                    })}
                    {/* </Slider> */}
                </div>
                {/* <div className='flex justify-end'>
                    <button className='border 2xl:mt-14 mt-12 px-10 py-2 text-white slideBtn sliderRight'>Become a Author</button>
                </div> */}
            </div>
        </div >
    )
}

export default Originals
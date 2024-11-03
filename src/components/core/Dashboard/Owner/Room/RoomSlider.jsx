import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const RoomSlider = ({images}) => {

    const swiperRef = useRef(null);

    const handleSwiperInit = (swiper) => {
        swiperRef.current = swiper;
        updateNavigationVisibility(swiper);
    };

    const updateNavigationVisibility = (swiper) => {
        const nextButton = swiper.navigation.nextEl;
        const prevButton = swiper.navigation.prevEl;

        // Hide the 'next' button at the last slide
        if (swiper.isEnd) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }

        // Hide the 'prev' button at the first slide
        if (swiper.isBeginning) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
        }
    };

  return (
    <>
        {
            images?.length ? (
                <Swiper 
                    // slidesPerView={3}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    onInit={handleSwiperInit}
                    onSlideChange={(swiper) => updateNavigationVisibility(swiper)}
                    breakpoints={{
                        // when window width is >= 320px (mobile)
                        320: {
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px (tablet)
                        768: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 1024px (desktop and above)
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {
                        images?.map((image, index) => (
                            <SwiperSlide key={index} className='border-none bg-white'>
                                <img
                                src={image}
                                alt={`Internal Error`}
                                className="w-full h-full object-contain"
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p className='text-center'>Internal Error</p>
            )
        }
    </>
  )
}

export default RoomSlider
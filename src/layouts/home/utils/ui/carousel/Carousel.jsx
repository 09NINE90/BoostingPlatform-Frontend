import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation, Autoplay} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import RightArrow from 'src/assets/icons/RightArrow.jsx'
import LeftArrow from 'src/assets/icons/LeftArrow.jsx'
import CarouselSkeleton from "./CarouselSkeleton.jsx";

const Carousel = ({carouselItems, isLoading}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);

    if (isLoading) {
        return (
            <CarouselSkeleton/>
        )
    }

    if (carouselItems.length === 0) {
        return null;
    }

    const isLoopEnabled = carouselItems.length > 2;

    return (
        <div className="w-full max-w-[80vw] mx-auto px-4 mt-6 md-10 relative h-[300px] min-h-[300px]">
            <div
                ref={prevRef}
                className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
            >
                <LeftArrow/>
            </div>
            <div
                ref={nextRef}
                className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
            >
                <RightArrow/>
            </div>

            <Swiper
                onInit={() => setSwiperReady(true)}
                effect="coverflow"
                grabCursor
                centeredSlides
                loop={isLoopEnabled}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: -10,
                    depth: 50,
                    modifier: 5,
                }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={
                    swiperReady ? {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    } : false
                }
                modules={[EffectCoverflow, Navigation, Autoplay]}
                className="h-[300px] relative"
            >
                {carouselItems.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className="!w-[500px] !h-[300px] relative overflow-hidden shadow-lg group"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item?.title}
                            className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        />

                        <div
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A0022] via-[#0A0022b3] to-transparent z-10"/>

                        <div className="relative z-20 flex flex-col h-full justify-end">
                            <h3 className="ml-3 text-white text-xl kanit-bold">{item?.title}</h3>
                            <p className="ml-3 text-white/90 kanit-light text-l mb-3">{item?.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
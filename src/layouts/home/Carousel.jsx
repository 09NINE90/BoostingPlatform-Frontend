import React, {useEffect, useRef, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import RightArrow from 'src/assets/right_arrow.svg'
import LeftArrow from 'src/assets/left_arrow.svg'
import {getCarouselItemsApi} from "src/services/offerApi.jsx";


const Carousel = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carouselItemsApi = await getCarouselItemsApi();
                setCarouselItems(carouselItemsApi);
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full max-w-[80vw] mx-auto px-4 mt-6 md-10 relative h-[300px]">
            <div
                ref={prevRef}
                className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full  shadow-lg cursor-pointer"
            >
                <img src={LeftArrow} alt="Right Arrow" />
            </div>
            <div
                ref={nextRef}
                className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full  shadow-lg cursor-pointer"
            >
                <img src={RightArrow} alt="Right Arrow" />
            </div>

            <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                loop
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: -10,
                    depth: 50,
                    modifier: 5,
                }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="h-[300px] relative"
            >
                {carouselItems.map((item) => (
                    <SwiperSlide
                        key={Math.random()}
                        className="!w-[500px] !h-[300px] relative rounded-2xl overflow-hidden shadow-lg group"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item?.title}
                            className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        />

                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A0022] via-[#0A0022b3] to-transparent z-10" />

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

import { ReactNode } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import 'swiper/css';

interface SliderProps {
    settings: SwiperProps;
    children: ReactNode;
}

const Carousel = ({ settings, children }: SliderProps) => {
    return(
        <Swiper {...settings}>
            {children}
        </Swiper>
    )
}

export default Carousel;
import cablePhoto from './img/image 5.png';
import style from './Home.module.css';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import Carousel from '../../assets/components/Carousel/Carousel';
import CardHome from '../../assets/components/CardHome/CardHome';

export function Home() {
    const settingsCategory = {
        slidesPerView: 1
    }

    const settingsFeatured = {
        slidesPerView: 2,
    }

    interface ApiResponse {
        category: string,
        created_at: string,
        description: string,
        name: string,
        price: string,
        rating: number,
        reviews: [{
            date: string,
            description: string,
            rating: number,
            user: string
        }],
    }

    const [headphones, setHeadphones] = useState<ApiResponse[]>([]);
    const [headsets, setHeadsets] = useState<ApiResponse[]>([]);

    useEffect(() => {
        api.get('./').then((response) => {
            const allProducts: ApiResponse[] = response.data;

            const filteredHeadphones = allProducts.filter(
                ((product: ApiResponse) => product.category === "Headphones")
            )
            setHeadphones(filteredHeadphones);

            const filteredHeadsets = allProducts.filter(
                ((product: ApiResponse) => product.category === "Headsets")
            )
            setHeadsets(filteredHeadsets);
        })
    },[]);
    console.log(headphones, headsets);

    return(
        <>
            <section className={style.container}>
                <h1 className={style.title}>What are you looking for today?</h1>
                <Link to={'/search'}>
                    <input type="search" 
                    placeholder="Search headphoone"
                    className={style.inputSearch}/>
                </Link>
            </section>
            <section className={style.carouselSection}>
                <div>   
                    <button className={style.buttonCategory}>Headphones</button>
                    <button className={style.buttonCategory}>Headsets</button>
                    <Carousel settings={settingsCategory}>
                            {headphones.map((item) => (
                                <SwiperSlide>
                                    <CardHome title={item.name}/>
                                </SwiperSlide>
                            ))}
                    </Carousel>
                </div>
                <div>
                    <div className={style.divSeeAll}>
                        <p>Featured Products</p>
                        <Link to={"/allProducts"} className={style.seeAll}>
                            <p>See All</p>
                        </Link>
                    </div>
                    <div>
                        <Carousel settings={settingsFeatured}>
                            {headphones.map((item) => (
                                <SwiperSlide>
                                    <div className={style.divFeaturedProducts}>
                                        <img src={cablePhoto}/>
                                        <h2 className={style.productTitle}>{item.name}</h2>
                                        <span className={style.productPrice}>{item.price}</span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    )
}
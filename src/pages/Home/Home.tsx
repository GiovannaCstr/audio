import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { ApiContext } from '../../context/ApiContext';
import style from './Home.module.css';
import Carousel from '../../assets/components/Carousel/Carousel';
import CardHome from './CardHome/CardHome';
import FeaturedProducts from '../../assets/components/FeaturedProducts/FeaturedProducts';

export function Home() {
    const settingsCategory = {
        slidesPerView: 1
    }

    const settingsFeatured = {
        slidesPerView: 2,
    }

    return(
        <ApiContext.Consumer>
            {({ headphones, headsets}) => (
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
                                    {headsets.map((item) => (
                                        <SwiperSlide>
                                            <FeaturedProducts
                                                name={item.name}
                                                price={item.price}
                                                id={item.id}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </ApiContext.Consumer>
    )
}
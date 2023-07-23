import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { ApiContext } from '../../context/ApiContext';
import Carousel from '../../assets/components/Carousel/Carousel';
import CardHome from './CardHome/CardHome';
import FeaturedProducts from '../../assets/components/FeaturedProducts/FeaturedProducts';
import ButtonCategory from '../../assets/components/ButtonCategory/ButtonCategory';
import style from './Home.module.css';
import menuIcon from './img/menuIcon.svg';
import audioIcon from './img/audioLogo.svg';
import userIcon from './img/userImage.png';
import searchIcon from './img/search.svg';

export function Home() {
    const [change, setChange] = useState<boolean>(true);
    const [isActiveHeadphones, setIsActiveHeadphones] = useState<boolean>(true);
    const [isActiveHeadsets, setIsActiveHeadsets] = useState<boolean>(false);

    useEffect(() => {
        setIsActiveHeadsets(!change);
        setIsActiveHeadphones(change);
    }, [change]);

    const settingsCategory = {
        slidesPerView: 1,
        spaceBetween: 50
    }

    const settingsFeatured = {
        slidesPerView: 2,
        spaceBetween: 15
    }

    return(
        <ApiContext.Consumer>
            {({ headphones, headsets}) => (
                <>
                    <header className={style.header}>
                        <img src={menuIcon}/>
                        <div className={style.divIconAudio}>
                            <img src={audioIcon}/>
                            <h1 className={style.logo}>Audio</h1>
                        </div>
                        <img src={userIcon}/>
                    </header>
                    <section className={style.container}>
                        <p className={style.userName}>Hi, Andrea</p>
                        <h1 className={style.title}>What are you looking for today?</h1>
                        <Link to={'/search'}>
                            <div>
                                <input type="search" 
                                    placeholder="Search headphoone"
                                    className={style.inputSearch}
                                />
                                <img src={searchIcon} className={style.searchIcon}/>
                            </div>
                        </Link>
                    </section>
                    <section className={style.carouselSection}>
                        <div>
                            <ButtonCategory
                                onClick={() => setChange(true)}
                                isActive={isActiveHeadphones}
                                label={"Headphones"}
                            />
                            <ButtonCategory
                                onClick={() => setChange(false)}
                                isActive={isActiveHeadsets}
                                label={"Headsets"}
                            />   
                            {change ? 
                                <Carousel settings={settingsCategory}>
                                    {headphones.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <CardHome 
                                                title={item.name}
                                                id={item.id}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Carousel> : 
                                <Carousel settings={settingsCategory}>
                                    {headsets.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <CardHome 
                                                title={item.name}
                                                id={item.id}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Carousel>
                            }
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
                                        <SwiperSlide key={item.id}>
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
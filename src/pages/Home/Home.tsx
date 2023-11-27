import style from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { SwiperSlide } from 'swiper/react';
import { ApiContext } from '../../context/ApiContext';
import { auth } from '../../services/firebase';
import Carousel from '../../assets/components/Carousel/Carousel';
import CardHome from './CardHome/CardHome';
import FeaturedProducts from '../../assets/components/FeaturedProducts/FeaturedProducts';
import ButtonCategory from '../../assets/components/ButtonCategory/ButtonCategory';
import AnimatedDiv from '../../assets/components/AnimatedDiv/AnimatedDiv';
import audioIcon from './img/audioLogo.svg';
import userIcon from './img/userImage.png';
import searchIcon from './img/search.svg';
import wishlistIcon from './img/wishlist.svg';
import notificationsIcon from './img/bell.svg';
import helpIcon from './img/help-circle.svg';


export function Home() {
    const [change, setChange] = useState<boolean>(true);
    const [isActiveHeadphones, setIsActiveHeadphones] = useState<boolean>(true);
    const [isActiveHeadsets, setIsActiveHeadsets] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const {headphones, headsets} = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsActiveHeadsets(!change);
        setIsActiveHeadphones(change);
    }, [change]);

    const handleLogOut = () => {
        try {
            auth.signOut();
            setMenuOpen(false);
            navigate("/");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const settingsCategory = {
        slidesPerView: 1,
        spaceBetween: 50,
        breakpoints:{
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            }
        }
    }

    const settingsFeatured = {
        slidesPerView: 2,
        spaceBetween: 15,
        breakpoints:{
            768: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    }

    return(
        <AnimatedDiv>
            <header className={style.header}>
                <div  className={`${style.buttonMenu} ${menuOpen ? style.active : style.buttonMenu}`} onClick={() => setMenuOpen(!menuOpen)}></div>
                <div className={style.divIconAudio}>
                    <img src={audioIcon}/>
                    <h1 className={style.logo}>Audio</h1>
                </div>
                <img src={userIcon}/>
            </header>
            
            <div className={`${style.sideBar} ${menuOpen ? style.sideBarOpen : style.sideBar}`}>
                <button className={style.buttonSideBar}>
                    Notifications
                    <img src={notificationsIcon}/>
                </button>
                <button className={style.buttonSideBar}>
                    Wishlist
                    <img src={wishlistIcon}/>
                </button>
                <button className={style.buttonSideBar}>
                    Help
                    <img src={helpIcon}/>
                </button>
                <button onClick={handleLogOut} className={style.buttonSideBar}>
                    Logout
                </button>
            </div>
            
            <div className={style.principalContent}>
                <section className={style.container}>
                    <p className={style.userName}>Hi, Andrea</p>
                    <h1 className={style.title}>What are you looking for today?</h1>
                    <Link to={'/search'}>
                        <div>
                            <input type="search" 
                                placeholder="Search headphone"
                                className={style.inputSearch}
                            />
                            <img src={searchIcon} className={style.searchIcon}/>
                        </div>
                    </Link>
                </section>
                <div className={style.divResponsiveBanner}>
                    <div className={style.allOurProducts}>
                        <p className={style.bannerSlogan}>All our products</p>                
                    </div>
                    <div className={style.toAllPeople}>
                        <p className={style.bannerSlogan}>To all people</p>                
                    </div>
                    <div className={style.inAllSizes}>
                        <p className={style.bannerSlogan}>In all sizes</p>                
                    </div>
                </div>
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
            </div>
        </AnimatedDiv>
    )
}
        
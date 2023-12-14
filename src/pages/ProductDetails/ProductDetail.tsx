import style from './ProductDetail.module.css';
import { useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ApiContext } from '../../context/ApiContext';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { SwiperSlide } from 'swiper/react';
import BackBar from '../../assets/components/BackBar/BackBar';
import Carousel from '../../assets/components/Carousel/Carousel';
import FeaturedProducts from '../../assets/components/FeaturedProducts/FeaturedProducts';
import productImage1 from './img/productImage.png';
import productImage2 from './img/productImage(2).png';
import userImage from './img/userImage.png';
import Stars from '../../assets/components/Stars/Stars';
import SideBar from '../../assets/components/SideBar/SideBar';

export function ProductDetail() {
  const parameters = useParams();
  const [change, setChange] = useState<boolean>(true);
  const [isActiveOverview, setIsActiveOverview] = useState<boolean>(true);
  const [isActiveFeatures, setIsActiveFeatures] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { items } = useContext(ApiContext);
  const { addProduct, addQuantity, products } = useContext(ShoppingCartContext);

  const settingsImages = {
    slidesPerView: 1.1,
    breakpoints:{
      768: {
          slidesPerView: 2,
          spaceBetween: 30
      }
    }
  }

  const settingsFeaturedProducts = {
    slidesPerView: 2,
    spaceBetween: 30,
    breakpoints:{
      1024: {
          slidesPerView: 4,
          spaceBetween: 30
      }
    }
  }

  const selectedItem = items.find((item) => item.id === Number(parameters.id));
  const { name, price, reviews, description } = selectedItem || {};

  function addToCart() {
    if(selectedItem){
      if(!products.find((product) => product.id === Number(selectedItem?.id))){
        addProduct(selectedItem); 
      } else {
        addQuantity(selectedItem.id);
      }
    }
  }

  function overviewClick() {
    setIsActiveOverview(true);
    setIsActiveFeatures(false);
    setChange(true);
  }

  function featuresClick() {
    setIsActiveFeatures(true);
    setIsActiveOverview(false);
    setChange(false);
  }

  const isDesktopSize = useMediaQuery({query: '(min-width: 1024px)'});

  return (
    <>
      <div className={style.divBackBar}>
        <BackBar>
          {isDesktopSize && <SideBar closeSideBar={() => setSideBarOpen(false)}/>}
        </BackBar>
      </div>
      <main className={style.divMain}>
        <div className={style.divTitle}> 
            <div>
              <span className={style.price}>{price}</span>
              <h1 className={style.title}>{name}</h1>
              <div>
                <button className={`${style.buttonSection} ${isActiveOverview ? style.active : ''}`} onClick={overviewClick}>Overview</button>
                <button className={`${style.buttonSection} ${isActiveFeatures ? style.active : ''}`} onClick={featuresClick}>Features</button>
              </div>
            </div>
        </div>
          {change ? 
            <section>
              <div className={style.divTitle}>
                {isDesktopSize ? 
                  <div className={style.sectionImages}>
                    <img src={productImage1}/>
                    <img src={productImage2}/>
                  </div>
                  : 
                  <div>
                    <Carousel settings={settingsImages}>
                      <SwiperSlide>
                        <img src={productImage1}/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={productImage2}/>
                      </SwiperSlide>
                    </Carousel>
                  </div>
                }
                <div>
                <p className={style.review}>Reviews ({reviews?.length})</p>
                  {reviews?.map((review) => (
                    <div className={style.divReview}>
                      <div>
                        <img src={userImage}/>
                      </div>
                      <div>
                        <h2 className={style.user}>{review.user}</h2>
                        <Stars review={review.rating}/>
                        <p className={style.description}>{review.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.divAnotherProduct}>
                <div className={style.divSeeAll}>
                  <p className={style.anotherProduct}>Another Product</p>
                  <Link to={"/allProducts"}  className={style.seeAll}>
                    <p>See All</p>
                  </Link>
                </div>
                  
                <div className={style.divCarousel}>
                  <Carousel settings={settingsFeaturedProducts}>
                    {items.map((item) => (
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
            :  
          <section>
            <div className={style.divDetails}>
              <h2 className={style.subtitle}>Highly Detailed Audio</h2>
              <p className={style.text}>{description}</p>
              <p className={style.text}>{description}</p>
            </div>
          </section>
        }
        <div className={style.divTitle}>
          <button className={style.buttonAddToCart} onClick={addToCart}>Add to Cart</button>
        </div>  
      </main>
    </>
  ) 
}
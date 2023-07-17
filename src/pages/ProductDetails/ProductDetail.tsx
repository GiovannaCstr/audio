import { useParams, Link } from 'react-router-dom';
import { ApiContext } from '../../context/ApiContext';
import { useContext, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import BackBar from '../../assets/components/BackBar/BackBar';
import Carousel from '../../assets/components/Carousel/Carousel';
import FeaturedProducts from '../../assets/components/FeaturedProducts/FeaturedProducts';
import productImage1 from './img/productImage.png';
import productImage2 from './img/productImage(2).png';
import userImage from './img/userImage.png';
import style from './ProductDetail.module.css';

export function ProductDetail() {
  const [change, setChange] = useState<boolean>(true);

  const settingsImages = {
    slidesPerView: 1.1,
  }

  const settingsFeaturedProducts = {
    slidesPerView: 2,
  }

  const parameters = useParams();
  const { items } = useContext(ApiContext);
  
  const selectedItem = items.find((item) => item.id === Number(parameters.id));

  return (
    <main className={style.divMain}>
      <BackBar/>
      <section>
        <span className={style.price}>{selectedItem?.price}</span>
        <h1 className={style.title}>{selectedItem?.name}</h1>
        <div>
          <button className={style.buttonSection} onClick={() => setChange(true)}>Overview</button>
          <button className={style.buttonSection} onClick={() => setChange(false)}>Features</button>
        </div>
        {change ? 
        <>
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
          <p className={style.review}>Reviews (3)</p>
          <div>
            {selectedItem?.reviews.map((review, index) => (
              <div  className={style.divReview}>
                <div>
                  <img src={userImage}/>
                </div>
                <div>
                  <h2 className={style.user}>{review.user}</h2>
                  <span>{review.rating}</span>
                  <p className={style.description}>{review.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={style.divSeeAll}>
            <p className={style.anotherProduct}>Another Product</p>
            <Link to={"/allProducts"}  className={style.seeAll}>
              <p>See All</p>
            </Link>
          </div>
          <div className={style.divCarousel}>
            <Carousel settings={settingsFeaturedProducts}>
              {items.map((item) => (
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
        </> : 
        <>
          <div>
            <h2>{selectedItem?.description}</h2>
            <p>The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other speakers. </p>
            <p>The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other speakers. </p>
          </div>
        </>
      }  
      <button className={style.buttonAddToCart}>Add to Cart</button>
      </section>
    </main>
  )
}
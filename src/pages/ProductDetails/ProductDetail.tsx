import { useParams, Link } from 'react-router-dom';
import { ApiContext } from '../../context/ApiContext';
import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
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
  const { addProduct, addQuantity, products } = useContext(ShoppingCartContext);

  const settingsImages = {
    slidesPerView: 1.1,
  }

  const settingsFeaturedProducts = {
    slidesPerView: 2,
  }

  const parameters = useParams();
  const { items } = useContext(ApiContext);
  
  const selectedItem = items.find((item) => item.id === Number(parameters.id));

  function addToCart() {
    if(selectedItem){
      if(!products.find((product) => product.id === Number(selectedItem?.id))){
        addProduct(selectedItem); 
      } else {
        addQuantity(selectedItem.id);
      }
      
    }
  }

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
          <p className={style.review}>Reviews ({selectedItem?.reviews.length})</p>
          <div>
            {selectedItem?.reviews.map((review) => (
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
            <h2 className={style.subtitle}>Highly Detailed Audio</h2>
            <p className={style.text}>{selectedItem?.description}</p>
            <p className={style.text}>{selectedItem?.description}</p>
          </div>
        </>
      }  
      <button className={style.buttonAddToCart} onClick={addToCart}>Add to Cart</button>
      </section>
    </main>
  )
}
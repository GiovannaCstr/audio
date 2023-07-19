import { Link } from 'react-router-dom';
import style from './CardProducts.module.css';
import headset from './img/image 5.png';
import star from './img/star.png';
import verticalMenu from './img/more-vertical.svg';
import { ReactNode } from 'react';

interface CardProps {
    name: string;
    price: string;
    rating: number;
    reviews: number;
    className?: string;
    id: number;
}

const CardProducts = ({ name, price, rating, className, reviews, id  }: CardProps) => {
    return (
        <Link to={`/productDetail/${id}`} className={style.link}>
            <div className={`${style.cardProducts} ${className}`}>
                <img src={headset} className={style.imageProduct}/>
                <div>
                    <h1 className={style.title}>{name}</h1>
                    <span className={style.price}>USD {price}</span>
                    <div className={style.divRating}>
                        <div className={style.divRating}>
                            <p className={style.divStar}>
                                <img src={star} className={style.rating}/>
                                {rating}
                            </p>
                            <p>{reviews} reviews</p>
                        </div>
                        <img src={verticalMenu} alt="" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProducts;
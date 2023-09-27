import { Link } from 'react-router-dom';
import style from './CardProducts.module.css';
import headset from './img/image 5.png';
import star from './img/star.png';
import verticalMenu from './img/more-vertical.svg';

interface ICardProps {
    name: string;
    price: string;
    rating: number;
    reviews: number;
    className?: string;
    id: number;
}

const CardProducts = ({ name, price, rating, className, reviews, id  }: ICardProps) => {
    return (
        <Link to={`/productDetail/${id}`} className={style.link}>
            <div className={`${style.cardProducts} ${className}`}>
                <img src={headset} className={style.imageProduct}/>
                <div className={style.divInfos}>
                    <h1 className={style.title}>{name}</h1>
                    <span className={style.price}>{price}</span>
                    <div className={style.divRating}>
                        <div className={style.divRating}>
                            <p className={style.divStar}>
                                <img src={star} className={style.rating}/>
                                {rating}
                            </p>
                        </div>
                        <p>{reviews} reviews</p>
                        <img src={verticalMenu} alt="" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProducts;
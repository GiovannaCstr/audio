import style from './CardProducts.module.css';
import headset from './img/image 5.png';
import star from './img/star.png';
import verticalMenu from './img/more-vertical.svg';

interface CardProps {
    name: string;
    price: string;
    rating: number;
    className?: string;
}

const CardProducts = ({ name, price, rating, className  }: CardProps) => {
    return (
        <div className={`${style.cardProducts} ${className}`}>
            <img src={headset} className={style.imageProduct}/>
            <div>
                <h1 className={style.title}>{name}</h1>
                <span className={style.price}>USD {price}</span>
                <div className={style.divRating}>
                    <div className={style.divRating}>
                        <p>
                            <img src={star} className={style.rating}/>
                            {rating}
                        </p>
                        <p>reviews</p>
                    </div>
                    <img src={verticalMenu} alt="" />
                </div>
            </div>
        </div>
    )
}

export default CardProducts;
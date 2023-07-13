import style from './CardProducts.module.css';
import headset from '../img/image 5.png';

interface cardProps {
    title: string,
    price: string,
    rating: number,
    reviews: number
}

const CardHome = ({title, price, rating, reviews}: cardProps) => {
    return (
        <div className={style.cardHome}>
            <img/>
            <div>
                <h1 className={style.title}>{title}</h1>
                <span>USD {price}</span>
            
                <div>
                    <p><img src={headset}/>{rating}</p>
                    <p>{reviews} reviews</p>
                </div>
            </div>
        </div>
    )
}

export default CardHome;
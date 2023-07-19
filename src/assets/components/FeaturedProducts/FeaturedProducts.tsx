import { Link } from 'react-router-dom';
import style from './FeaturedProducts.module.css';
import cablePhoto from './img/image 5.png';

interface CardProps {
    name: string;
    price: string;
    id: number;
}

const FeaturedProducts = ({ name, price, id }: CardProps) => {
    return(
        <Link to={`/productDetail/${id}`} className={style.link}>
            <div className={style.divFeaturedProducts}>
                <img src={cablePhoto}/>
                <h2 className={style.productTitle}>{name}</h2>
                <span className={style.productPrice}>{price}</span>
            </div>
        </Link>
    )
}

export default FeaturedProducts;
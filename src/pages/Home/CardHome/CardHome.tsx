import style from './CardHome.module.css';
import { Link } from 'react-router-dom';
import arrow from './img/greenarrow.svg';
import foto from './img/image 5.png';

interface cardProps {
    title: string
    id: number
}

const CardHome = ({title, id}: cardProps) => {
    return (
        <div className={style.cardHome}>
            <div className={style.divPhoto}>
                <h1 className={style.title}>{title}</h1>
                <Link to={`/productDetail/${id}`} className={style.link}>
                    <p className={style.shopNowLink}>
                        Shop now 
                        <img src={arrow}/>
                    </p>
                </Link>
            </div>
            <div>
                <img src={foto}/>
            </div>
        </div>
    )
}

export default CardHome;
import style from './CardHome.module.css';
import arrow from './img/greenarrow.svg';
import foto from './img/image 5.png';

interface cardProps {
    title: string
}

const CardHome = ({title}: cardProps) => {
    return (
        <div className={style.cardHome}>
            <div>
                <h1 className={style.title}>{title}</h1>
                <p className={style.shopNowLink}>Shop now <img src={arrow}/></p>
            </div>
            <div>
                <img src={foto}/>
            </div>
        </div>
    )
}

export default CardHome;
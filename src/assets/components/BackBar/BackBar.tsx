import backIcon from './img/back.svg';
import shoppingCart from './img/shopping-cart.svg';
import style from './BackBar.module.css';
import { ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface BackBar {
    children?: ReactNode
}

const BackBar = ({children}:BackBar) => {
    const navigate = useNavigate();

    return (
        <header className={style.header}>
            <button className={style.icons}
            onClick={() => navigate(-1)}>
                    <img src={backIcon}/>
            </button>
                {children}
            <Link to={'/shoppingCart'}>
                <button className={style.icons}>
                    <img src={shoppingCart}/>  
                </button>
            </Link>
        </header>
    )
}

export default BackBar;
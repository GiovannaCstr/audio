import backIcon from './img/back.svg';
import shoppingCart from './img/shopping-cart.svg';
import style from './BackBar.module.css';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface BackBar {
    children?: ReactNode
}

const BackBar = ({children}:BackBar) => {
    const navigate = useNavigate();

    return (
        <header className={style.header}>
            <button className={style.searchIcons}
            onClick={() => navigate(-1)}>
                    <img src={backIcon}/>
            </button>
                {children}
            <button className={style.searchIcons}>
                <img src={shoppingCart}/>  
            </button>
        </header>
    )
}

export default BackBar;
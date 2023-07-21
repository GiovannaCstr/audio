import backIcon from './img/back.svg';
import shoppingCart from './img/shopping-cart.svg';
import style from './BackBar.module.css';
import { ReactNode, useContext } from 'react';
import { ShoppingCartContext } from '../../../context/ShoppingCartContext';
import { useNavigate, Link } from 'react-router-dom';

interface BackBar {
    children?: ReactNode
}

const BackBar = ({children}:BackBar) => {
    const navigate = useNavigate();
    const { totalProducts } = useContext(ShoppingCartContext);

    return (
        <header className={style.header}>
            <button className={style.icons}
            onClick={() => navigate(-1)}>
                    <img src={backIcon}/>
            </button>
                {children}
            <Link to={'/shoppingCart'} className={style.link}>
                <div>
                    <button className={style.iconCart}>
                        <img src={shoppingCart}/>  
                    </button>
                    {totalProducts == 0 ?
                        <span className={style.numberOfProducts}></span>                      
                    :   <div className={style.backgroundNumber}>
                            <span className={style.numberOfProducts}>{totalProducts}</span>
                        </div> 
                    }
                    
                </div>                
            </Link>
        </header>
    )
}

export default BackBar;
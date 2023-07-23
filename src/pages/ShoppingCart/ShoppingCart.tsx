import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import trash from './img/trash.svg';
import backIcon from './img/back.svg';
import productImage from './img/prductImage.png';
import arrow from './img/arrow.svg';
import emptyCart from './img/shopping-cart-empty.png';
import style from './ShoppingCart.module.css';

export function ShoppingCart() {
    const navigate = useNavigate();

    const { 
        products, 
        totalPrice,
        totalProducts,
        removeProduct, 
        clearAllProducts, 
        addQuantity, 
        removeQuantity
    } = useContext(ShoppingCartContext);
   

    return (
        <main className={style.main}>
            <header className={style.header}>
                <button className={style.icons}
                onClick={() => navigate(-1)}>
                        <img src={backIcon}/>
                </button>
                    <h1 className={style.title}>Shopping Cart</h1>
                <button className={style.icons} onClick={clearAllProducts}>
                    <img src={trash}/>  
                </button>
            </header>
            <section>
            {products.length <= 0 ? 
                <div className={style.divEmptyCart}>
                    <p className={style.noProducts}>Your shopping cart is empty</p>
                    <img src={emptyCart} className={style.emptyCart}/>
                </div> :
            products.map((product) => (
                <div className={style.divProduct}>
                    <img src={productImage} className={style.productImage}/>
                    <div className={style.divInfos}>
                        <h2 className={style.productName}>{product.name}</h2>
                        <span className={style.price}>{product.price}</span>
                        <div className={style.divAddProduct}>
                            <div>
                                <button className={style.quantityButton} onClick={() => removeQuantity(product.id)}>-</button>
                                <span className={style.quantity}>{product.quantity}</span>
                                <button className={style.quantityButton} onClick={() => addQuantity(product.id)}>+</button>
                            </div>
                            <button className={style.trashButton} 
                            onClick={() => removeProduct(product.id)}>
                                <img src={trash}/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
                <div className={style.divProceedToCheckout}>
                    <div className={style.divTotalPrice}>
                        <p>Total {totalProducts} Items</p>
                        <span>$ {totalPrice?.toFixed(2)}</span>
                    </div>
                    <button className={style.buttonChceckout}>
                        Proceed to Checkout
                        <img src={arrow}/>
                    </button>
                </div>
            </section>
        </main>
    )
}
import backIcon from './img/back.svg';
import shoppingCart from './img/shopping-cart.svg';

export function Search() {
    return (
        <>
            <header>
                <button>
                    <img src={backIcon}/>
                </button>
                <h1>Search</h1>
                <button>
                    <img src={shoppingCart}/>  
                </button>
            </header>
            <section>
                <input type="search" 
                    placeholder="Search headphoone"
                />
                <h2>Popular product</h2>

            </section>
        </>
    )
}
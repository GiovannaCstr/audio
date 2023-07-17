import { useState } from 'react'
import { ApiContext } from '../../context/ApiContext';
import { BottomSheet } from 'react-spring-bottom-sheet-updated';
import 'react-spring-bottom-sheet-updated/dist/style.css'
import BackBar from '../../assets/components/BackBar/BackBar';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import iconFilter from './img/filter.svg';
import style from './AllProducts.module.css';

export function AllProducts() {
    const [open, setOpen] = useState<boolean>(false);


    return (
      <ApiContext.Consumer>
        {({items}) => (
          <main className={style.divMain}>
            <BackBar/>
            <h2 className={style.featuredProducts}>Featured products</h2>
            <h1 className={style.seeAllProducts}>See all products</h1> 
            <button onClick={() => setOpen(true)}
            className={style.buttonFilter}>
              <img src={iconFilter}/>
              Filter
            </button>
            <div className={style.divCarousel}>
              {items.map((item) => (
                <CardProducts
                key={item.id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                className={`${style.cardProducts}`}
              />
              ))}
            </div>
            <BottomSheet open={open}>My awesome content here</BottomSheet>
          </main>
        )}
      </ApiContext.Consumer>
    )
}



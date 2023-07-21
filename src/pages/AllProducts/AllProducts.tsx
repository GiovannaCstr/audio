import { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext';
import { BottomSheet } from 'react-spring-bottom-sheet-updated';
import 'react-spring-bottom-sheet-updated/dist/style.css'
import BackBar from '../../assets/components/BackBar/BackBar';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import ButtonCategory from '../../assets/components/ButtonCategory/ButtonCategory';
import iconFilter from './img/filter.svg';
import iconClose from './img/closeIcon.svg';
import style from './AllProducts.module.css';

export function AllProducts() {
    const [open, setOpen] = useState<boolean>(false);
    const [apply, setApplyFilter] = useState<boolean>(false);
    const { items, headphones, headsets } = useContext(ApiContext);
    const [filteredItems, setFilteredItems] = useState([...items]);

    const [isActiveHeadphones, setIsActiveHeadphones] = useState<boolean>(false);
    const [isActiveHeadsets, setIsActiveHeadsets] = useState<boolean>(false);


    let sorted = [...filteredItems];
    let sortedArray = [...sorted];

    function sortByCategory(category: string) {
      if(category == "Headphones"){
        setFilteredItems([...headphones]);
        setIsActiveHeadphones(true);
        setIsActiveHeadsets(false);
      } else if (category == "Headsets"){
        setFilteredItems([...headsets]);
        setIsActiveHeadphones(false);
        setIsActiveHeadsets(true);
      } else {
        setFilteredItems([...items]);
        setIsActiveHeadphones(false);
        setIsActiveHeadsets(false);
      }
      console.log(category);
    }

    function sortByPopularity() {
      sorted = items.sort((item) => item.reviews.length);
      console.log(sorted);
    }

    function sortByNewest() {
      sorted = items.sort((item) => Number(item.created_at));
      console.log(sorted);
    }

    function sortByOldest() {
      sortedArray = sorted.reverse();
      console.log(sortedArray);
    }

    function sortByHighPrice() {
      sorted = items.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
      console.log(sorted)
    }

    function sortByLowPrice() {
      sorted = items.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
      console.log(sorted)
    }

    function sortByReview() {
      sorted = items.sort((item) => item.rating);
      console.log(sorted)
    }
    
    return (
      <ApiContext.Consumer>
        {({items}) => (
          <main className={style.divMain}>
            <section className={style.sectionTitle}>
              <BackBar/>
              <h2 className={style.featuredProducts}>Featured products</h2>
              <h1 className={style.seeAllProducts}>See all products</h1> 
              <button onClick={() => setOpen(true)}
              className={style.buttonFilter}>
                <img src={iconFilter}/>
                Filter
              </button>
            </section>
            <div className={style.divCarousel}>
              {apply ? 
                sorted.map((item) => (
                  <CardProducts
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    rating={item.rating}
                    reviews={item.reviews.length}
                    className={`${style.cardProducts}`}
                  />
                ))
              : items.map((item) => (
                  <CardProducts
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    rating={item.rating}
                    reviews={item.reviews.length}
                    className={`${style.cardProducts}`}
                  />
                ))
              }
            </div>
            <BottomSheet open={open}>
              <div className={style.bottomSheetBody}>
                <div className={style.bottomSheetHeader}>
                  <h2>Filter</h2>
                  <button className={style.bottomSheetClose}
                  onClick={() => setOpen(false)}>
                    <img src={iconClose}/>
                  </button>
                </div>
                <h3 className={style.title}>Category</h3>
                <div>
                    <ButtonCategory
                      onClick={() => sortByCategory("Headphones")}
                      isActive={isActiveHeadphones}
                      label={"Headphones"}
                    />
                    <ButtonCategory
                      onClick={() => sortByCategory("Headsets")}
                      isActive={isActiveHeadsets}
                      label={"Headsets"}
                    />
                </div>
                <h3 className={style.title}>Sort By</h3>
                  <button className={style.sortBy} onClick={sortByPopularity}>Popularity</button>
                  <button className={style.sortBy} onClick={sortByNewest}>Newest</button>
                  <button className={style.sortBy} onClick={sortByOldest}>Oldest</button>
                  <button className={style.sortBy} onClick={sortByHighPrice}>High Price</button>
                  <button className={style.sortBy} onClick={sortByLowPrice}>Low Price</button>
                  <button className={style.sortBy} onClick={sortByReview}>Review</button>
                  
                  <button className={style.applyFilter} onClick={() => setApplyFilter(true)}>Apply Filter</button>
              </div>
            </BottomSheet>
          </main>
        )}
      </ApiContext.Consumer>
    )
}



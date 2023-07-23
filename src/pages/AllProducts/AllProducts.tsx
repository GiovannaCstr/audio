import { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext';
import { BottomSheet } from 'react-spring-bottom-sheet-updated';
import 'react-spring-bottom-sheet-updated/dist/style.css'
import style from './AllProducts.module.css';
import BackBar from '../../assets/components/BackBar/BackBar';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import ButtonCategory from '../../assets/components/ButtonCategory/ButtonCategory';
import iconFilter from './img/filter.svg';
import iconClose from './img/closeIcon.svg';

export function AllProducts() {
  const { items, headphones, headsets } = useContext(ApiContext);
  const [open, setOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState([...items]);
  const [sortBy, setSortBy] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleApllyFilter = () => {
    let filtered = items;

    if (selectedCategory !== "All") {
      filtered = selectedCategory === "Headphones" ? headphones : headsets;
    }
    
    if(sortBy === "Popularity") {
      filtered = filtered.sort((item) => item.reviews.length);
      console.log(filtered);
    } else if (sortBy === "Newest") {
      filtered = filtered.reverse();
      console.log(filtered);
    } else if (sortBy === "Oldest") {
      filtered = filtered.sort((item) => Number(item.created_at));
      console.log(filtered);
    } else if (sortBy === "High Price") {
      filtered = filtered.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
      console.log(filtered);
    } else if (sortBy === "Low Price") {
      filtered = filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
      console.log(filtered);
    } else if (sortBy === "Review") {
      filtered = filtered.sort((item1, item2) => item2.rating - item1.rating);
      console.log(filtered);
    }

    setFilteredItems(filtered);
  }   

  return (
    <main className={style.divMain}>
      <section className={style.sectionTitle}>
        <BackBar/>
        <h2 className={style.featuredProducts}>Featured products</h2>
        <h1 className={style.seeAllProducts}>See all products</h1> 
        <button 
          onClick={() => setOpen(true)}
          className={style.buttonFilter}>
          <img src={iconFilter}/>
          Filter
        </button>
      </section>
      <div className={style.divCarousel}>
        {filteredItems.map((item) => (
          <CardProducts
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            rating={item.rating}
            reviews={item.reviews.length}
            className={`${style.cardProducts}`}
          />
        ))}
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
                       onClick={() => setSelectedCategory("Headphones")}
                      isActive={selectedCategory === "Headphones"}
                      label={"Headphones"}
                    />
                    <ButtonCategory
                      onClick={() => setSelectedCategory("Headsets")}
                      isActive={selectedCategory === "Headsets"}
                      label={"Headsets"}
                    />
                </div>
                <h3 className={style.title}>Sort By</h3>
                  <button className={style.sortBy} onClick={() => setSortBy("Popularity")}>Popularity</button>
                  <button className={style.sortBy} onClick={() => setSortBy("Newest")}>Newest</button>
                  <button className={style.sortBy} onClick={() => setSortBy("Oldest")}>Oldest</button>
                  <button className={style.sortBy} onClick={() => setSortBy("High Price")}>High Price</button>
                  <button className={style.sortBy} onClick={() => setSortBy("Low Price")}>Low Price</button>
                  <button className={style.sortBy} onClick={() => setSortBy("Review")}>Review</button>
                  
                <button className={style.applyFilter} onClick={handleApllyFilter}>Apply Filter</button>
        </div>
      </BottomSheet>
    </main>
  )
}
     
    

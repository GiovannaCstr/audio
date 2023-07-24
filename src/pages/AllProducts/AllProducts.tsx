import style from './AllProducts.module.css';
import { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext';
import { BottomSheet } from 'react-spring-bottom-sheet-updated';
import 'react-spring-bottom-sheet-updated/dist/style.css'
import BackBar from '../../assets/components/BackBar/BackBar';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import ButtonCategory from '../../assets/components/ButtonCategory/ButtonCategory';
import iconFilter from './img/filter.svg';
import iconClose from './img/closeIcon.svg';
import clearFilters from './img/clearFiltersIcon.png';

export function AllProducts() {
  const { items, headphones, headsets } = useContext(ApiContext);
  const [open, setOpen] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState([...items]);
  const [sortBy, setSortBy] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSortBy("");
    setFilteredItems([...items]);
  }

  const handleApllyFilter = () => {
    let filtered = items;

    if (selectedCategory !== "All") {
      filtered = selectedCategory === "Headphones" ? headphones : headsets;
    }
    
    if(sortBy === "Popularity") {
      filtered = filtered.sort((item) => item.reviews.length);
    } else if (sortBy === "Newest") {
      filtered = filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "Oldest") {
      filtered = filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === "High Price") {
      filtered = filtered.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
    } else if (sortBy === "Low Price") {
      filtered = filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    } else if (sortBy === "Review") {
      filtered = filtered.sort((item1, item2) => item2.rating - item1.rating);
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
              <div className={style.divClearFilters}>
                <button 
                  onClick={handleClearFilters}
                  className={style.clearFilters}
                >
                  <img src={clearFilters} className={style.clearFiltersIcon}/>
                  Clear filters
                </button>
                <button className={style.bottomSheetClose}
                  onClick={() => setOpen(false)}>
                  <img src={iconClose}/>
                </button>
              </div>
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
                  <button className={`${style.sortBy} ${sortBy === "Popularity" ? style.active : ""}`} onClick={() => setSortBy("Popularity")}>Popularity</button>
                  <button className={`${style.sortBy} ${sortBy === "Newest" ? style.active : ""}`} onClick={() => setSortBy("Newest")}>Newest</button>
                  <button className={`${style.sortBy} ${sortBy === "Oldest" ? style.active : ""}`} onClick={() => setSortBy("Oldest")}>Oldest</button>
                  <button className={`${style.sortBy} ${sortBy === "High Price" ? style.active : ""}`} onClick={() => setSortBy("High Price")}>High Price</button>
                  <button className={`${style.sortBy} ${sortBy === "Low Price" ? style.active : ""}`} onClick={() => setSortBy("Low Price")}>Low Price</button>
                  <button className={`${style.sortBy} ${sortBy === "Review" ? style.active : ""}`} onClick={() => setSortBy("Review")}>Review</button>
                  
                <button className={style.applyFilter} onClick={handleApllyFilter}>Apply Filter</button>
        </div>
      </BottomSheet>
    </main>
  )
}
     
    

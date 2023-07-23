import { ApiContext } from '../../context/ApiContext';
import { useContext, useState } from 'react';
import style from './Search.module.css';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import BackBar from '../../assets/components/BackBar/BackBar';
import searchIcon from './img/search.svg';
import { motion } from "framer-motion";

export function Search() {
    const [search, setSearch] = useState<string>("");
    const { items } = useContext(ApiContext);
        
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <motion.div 
            className={style.containerSearch}
            initial={{ x: window.innerWidth }}
            animate={{ x: 0 }}
            exit={{ x: -window.innerWidth }}
            transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <BackBar>
                <h1 className={style.searchTitle}>Search</h1>
            </BackBar>
            <section>
                <div>
                    <input type="search" 
                        placeholder="Search headphone"
                        value={search}
                        onChange={(e) => setSearch( e.target.value)}
                        className={style.searchBar}
                    />
                    <img src={searchIcon} className={style.searchIcon}/>
                </div>
                <h2 className={style.products}>Popular product</h2>
                {search === "" ? 
                    <p className={style.notFoundProduct}>Type to search for a product</p> 
                :
                    filteredItems.map((item) => (
                        <CardProducts
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            rating={item.rating}
                            reviews={item.reviews.length}
                        />
                    ))
                }
            </section>
        </motion.div>
    )
}
        



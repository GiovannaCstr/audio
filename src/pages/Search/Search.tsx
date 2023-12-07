import style from './Search.module.css';
import { ApiContext } from '../../context/ApiContext';
import { useContext, useState } from 'react';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import BackBar from '../../assets/components/BackBar/BackBar';
import searchIcon from './img/search.svg';
import AnimatedDiv from '../../assets/components/AnimatedDiv/AnimatedDiv';

export function Search() {
    const [search, setSearch] = useState<string>("");
    const { items } = useContext(ApiContext);
        
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AnimatedDiv>
            <div className={style.containerSearch}>
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
                    <div className={style.containerProducts}>  
                        {filteredItems.map((item) => (
                            <CardProducts
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                rating={item.rating}
                                reviews={item.reviews.length}
                            /> 
                        ))}
                    </div>
                    }
                </section>
            </div>
        </AnimatedDiv>
    )
}
        



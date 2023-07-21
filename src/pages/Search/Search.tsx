import { ApiContext } from '../../context/ApiContext';
import { useState } from 'react';
import CardProducts from '../../assets/components/CardProducts/CardProducts';
import BackBar from '../../assets/components/BackBar/BackBar';
import searchIcon from './img/search.svg';
import style from './Search.module.css';


export function Search() {
    const [search, setSearch] = useState<string>("");

    return (
        <ApiContext.Consumer> 
            {({items}) => {
                const filteredItems = items.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
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
                            filteredItems.map((item) => (
                                <CardProducts
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    rating={item.rating}
                                    reviews={item.reviews.length}
                                />
                            ))
                        }
                    </section>
                </div>
                )
            }
        }
        </ApiContext.Consumer>
    )
}


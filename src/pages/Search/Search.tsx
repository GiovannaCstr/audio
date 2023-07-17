import { ApiContext } from '../../context/ApiContext';
import { useState } from 'react';
import CardProducts from './CardProducts/CardProducts';
import style from './Search.module.css';
import BackBar from '../../assets/components/BackBar/BackBar';


export function Search() {
    const [search, setSearch] = useState<string>("");

    return (
        <ApiContext.Consumer> 
            {({items}) => {
                const filteredItems = items.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
      
            console.log(search);
            console.log(filteredItems);

            return (
                <div className={style.containerSearch}>
                    <BackBar>
                        <h1 className={style.searchTitle}>Search</h1>
                    </BackBar>
                    <section>
                        <input type="search" 
                            placeholder="Search headphone"
                            value={search}
                            onChange={(e) => setSearch( e.target.value)}
                            className={style.searchBar}
                        />
                        <h2 className={style.products}>Popular product</h2>
                        {search === "" ? 
                            <p className={style.notFoundProduct}>Enter to search for a product</p> 
                        :
                            filteredItems.map((item) => (
                                <CardProducts
                                    key={item.id}
                                    name={item.name}
                                    price={item.price}
                                    rating={item.rating}
                                    
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


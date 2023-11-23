import { ReactElement, createContext, useState, useEffect } from "react"; 
import { api } from "../services/api"; 

export interface IApiResponse {
    category: string,
    created_at: string,
    description: string,
    name: string,
    price: string,
    rating: number,
    reviews: [{
        date: string,
        description: string,
        rating: number,
        user: string
    }],
    id: number,
}

interface ProductsContext {
    items: IApiResponse[];
    headphones: IApiResponse[];
    headsets: IApiResponse[];
}

interface ProductsProviderProps {
    children: ReactElement
}

export const ApiContext = createContext<ProductsContext>({items: [], headphones: [], headsets: []});

export const ProductsProvider = ({children} : ProductsProviderProps) => {
    const [items, setItems] = useState<IApiResponse[]>([]);
    const [headphones, setHeadphones] = useState<IApiResponse[]>([]);
    const [headsets, setHeadsets] = useState<IApiResponse[]>([]);

    useEffect(() => {
        api.get('./products').then((response) => {
            const allProducts: IApiResponse[] = response.data;
            setItems(allProducts);
            
            const filteredHeadphones = allProducts.filter(
                ((product: IApiResponse) => product.category === "Headphones")
            )
            setHeadphones(filteredHeadphones);

            const filteredHeadsets = allProducts.filter(
                ((product: IApiResponse) => product.category === "Headsets")
            )
            setHeadsets(filteredHeadsets);
        })
    },[]);

    return (
        <ApiContext.Provider value={{ items, headsets, headphones }}>
            {children}
        </ApiContext.Provider>
    )
}
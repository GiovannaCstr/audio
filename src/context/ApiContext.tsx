import { ReactElement, createContext, useState, useEffect } from "react"; 
import { api } from "../services/api"; 

interface ApiResponse {
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
    items: ApiResponse[];
    headphones: ApiResponse[];
    headsets: ApiResponse[];
}

interface ProductsProviderProps {
    children: ReactElement
}

export const ApiContext = createContext<ProductsContext>({items: [], headphones: [], headsets: []});

export const ProductsProvider = ({children} : ProductsProviderProps) => {
    const [items, setItems] = useState<ApiResponse[]>([]);
    const [headphones, setHeadphones] = useState<ApiResponse[]>([]);
    const [headsets, setHeadsets] = useState<ApiResponse[]>([]);

    useEffect(() => {
        api.get('./').then((response) => {
            const allProducts: ApiResponse[] = response.data;
            setItems(allProducts);
            
            const filteredHeadphones = allProducts.filter(
                ((product: ApiResponse) => product.category === "Headphones")
            )
            setHeadphones(filteredHeadphones);

            const filteredHeadsets = allProducts.filter(
                ((product: ApiResponse) => product.category === "Headsets")
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
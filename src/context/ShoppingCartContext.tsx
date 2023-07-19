import { ReactElement, createContext, useState } from "react";

interface Product {
    id: number;
    name: string;
    price: string;
    quantity?: number;
}

interface ProductsContext {
    products: Product[],
    addProduct: (products: Product) => void;
    removeProduct: (id: number) => void;
    clearAllProducts: () => void;
    addQuantity: (id: number) => void;
    removeQuantity: (id: number) => void;
}

interface ShoppingCartProps {
    children: ReactElement;
}

export const ShoppingCartContext = createContext<ProductsContext>({} as ProductsContext);

export function ShoppingCartProvider({ children }: ShoppingCartProps) {
    const [products, setProducts] = useState<Product[]>([]);

    function addProduct(product: Product) {
        setProducts([...products, product]);
        product.quantity = 1;
    }

    function addQuantity(id: number) {
        const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, quantity: (product.quantity || 1) + 1 } : product);
        setProducts(updatedProducts);
    }

    function removeQuantity(id: number) {
        const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, quantity: (product.quantity || 1) - 1 } : product);
        setProducts(updatedProducts);
    }

    function removeProduct (id: number) {
        setProducts(products.filter((product) => product.id !== Number(id)));
    }

    function clearAllProducts() {
        setProducts([]);
    }

    console.log(products)

    return (
        <ShoppingCartContext.Provider value={{ products, addProduct, removeProduct, clearAllProducts, addQuantity, removeQuantity }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
import React, { createContext, useContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // Fetch products from the API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
                const filteredCategories = data.filter(
                    (product) =>
                        product.category === "men's clothing" || product.category === "women's clothing"
                );
                setProducts(filteredCategories);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);


    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
        setCartCount(savedCart.length);
    }, []);

    const addToCart = (item) => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
        const existingProduct = savedCart.find(product => product.id === item.id);

        if (existingProduct) {
            const updatedCart = savedCart.map(product =>
                product.id === item.id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartCount(updatedCart.length);
        } else {
            const updatedCart = [...savedCart, { ...item, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartCount(updatedCart.length);
        }
    };
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });



    useEffect(() => {
        const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);
    return (
        <ProductContext.Provider value={{ products, cartCount, addToCart, cartItems, setCartItems }}>
            {children}
        </ProductContext.Provider>
    );
};

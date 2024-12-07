import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProductContext } from "../contexts/ProductContext";

const RelatedProducts = () => {
    const { products, cartItems, setCartItems } = useProductContext();

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            // Update the quantity of the existing product
            const updatedCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
            toast.success("Product quantity updated in cart!");
        } else {
            // Add new product to cart
            const updatedCart = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(updatedCart);
            toast.success("Product added to cart!");
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    // Assuming you want to display products that are not the current product (e.g., related)
    return (
        <div className="more-products mb-150">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 text-center">
                        <div className="section-title">
                            <h3><span className="orange-text">Related</span> Products</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {products.slice(0, 3).map((relatedProduct) => (
                        <div key={relatedProduct.id} className="col-lg-4 col-md-6 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <Link to={`/shop/${relatedProduct.id}`}>
                                        <img src={relatedProduct.image} alt={relatedProduct.name} />
                                    </Link>
                                </div>
                                <h3>{relatedProduct.name}</h3>
                                <p className="product-price"><span>Per Kg</span> ${relatedProduct.price} </p>
                                {/* Add to Cart button */}
                                <Link onClick={() => handleAddToCart(products)} className="cart-btn">
                                            <i className="fas fa-shopping-cart"></i> Add to Cart
                                        </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;

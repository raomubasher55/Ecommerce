import react, { useState, useEffect, createContext, useContext, Children } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    let products = localStorage.getItem('cart');
    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart');
        if(existingCartItem){
            setCart(JSON.parse(existingCartItem))
        }
    }, [])
    
    return (
        <CartContext.Provider value={{cart ,setCart}} >
            {children}
        </CartContext.Provider>
    );
};

const useCart =()=>{
    return useContext(CartContext);
} 

export {useCart , CartProvider}
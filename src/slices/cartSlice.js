import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    totalItems: localStorage.getItem("totalItems") 
        ? JSON.parse(localStorage.getItem("totalItems")) 
        : 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const room = action.payload;
            const index = state.cart.findIndex((item) => item._id === room._id);

            if(index >= 0){
                // If the course is already in the cart, do not modify the quantity
                toast.error("Room already in cart");
                return;
            }

            // If the course is not in the cart, add it to the cart
            state.cart.push(room);
            // Update the total quantity and price
            state.totalItems++;
            state.total += room.price;
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            // show toast
            toast.success("Room added to cart");
        },
        removeFromCart: (state, action) => {
            const roomId = action.payload;
            const index = state.cart.findIndex((item) => item._id === roomId);
        
            if(index >= 0){
                // If the room is found  in the cart, remove it
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1);

                // Update to localStorage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                // show toast
                toast.success("Room removed from cart");
            }
        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    },
});

export const { addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;
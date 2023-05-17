export let initState = {
    cartItems: JSON.parse(localStorage.getItem('orders')),
    removeCartItems: localStorage.removeItem('orders')
}


export function reducer(state, action) {
    switch (action.type) {
        case "SET_CART_ITEMS":
            localStorage.setItem("orders", JSON.stringify(action.payload));
            return { ...state, cartItems: action.payload };
        case "REMOVE_CART_ITEMS":
            return { ...state, cartItems: action.payload };
        default:
            return state;
    }
}
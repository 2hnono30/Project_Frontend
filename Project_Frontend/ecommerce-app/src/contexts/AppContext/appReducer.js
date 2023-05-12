export let initState = {
    cartItems : JSON.parse(localStorage.getItem('orders'))
}


export function reducer (state,action) {
    switch (action.type) {
        case "SET_CART_ITEMS":
            localStorage.setItem("orders",JSON.stringify(action.payload))
            return {...state,cartItems: action.payload};
        default:
            return state;
    }
}
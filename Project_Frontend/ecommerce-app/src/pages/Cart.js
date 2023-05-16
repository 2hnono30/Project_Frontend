import React, { useContext, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { currencyFormat } from "../components/Utils/Utils";
import { useId } from "react";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AppContext from "../contexts/AppContext";

const Cart = () => {

  const [appState, appDispatch] = useContext(AppContext);

  const confirm = useConfirm();

  let initOrderValue = appState.cartItems;
  if (!initOrderValue) {
    initOrderValue = [];
  }


  const [state, setState] = useState({
    orderLists: initOrderValue
  })
  const onChange = (event) => {
    event.preventDefault();
    let order = orderLists[event.target.id];
    order.quantity = Number(event.target.value);
    setState({ ...state })
    initOrderValue[event.target.id].quantity = Number(event.target.value);
    appDispatch({type: "SET_CART_ITEMS", payload: initOrderValue})
  }
  let total = 0;
  initOrderValue.forEach(element => {
    total += (element.product.price * element.quantity);
  });



  const onDelete = (value) => {
    confirm({ confirmationButtonProps: { autoFocus: true } })
      .then(() => {
        initOrderValue = initOrderValue.filter((item, index) => index != value);
        // console.log(initOrderValue);
        appDispatch({type: "SET_CART_ITEMS", payload: initOrderValue})
        setState({ orderLists: initOrderValue });
        toast.success("Product removed from cart successfully ");
      })
  }
  
  const { orderLists } = state;
  const id = useId();
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <div class1="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              {orderLists?.length == 0 ?
                <div className="d-flex justify-content-center fw-lighter">
                  <p>There are no products in the cart</p>
                </div> :
                <>
                  <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                    <h4 className="cart-col-1">Product</h4>
                    <h4 className="cart-col-2">Price</h4>
                    <h4 className="cart-col-3">Quantity</h4>
                    <h4 className="cart-col-4">Total</h4>
                  </div>
                  {(
                    orderLists.map((order, index) => <CartItem key={`${id}-${index}`} order={order} index={index} onChange={onChange} onDelete={onDelete} />)
                  )}
                </>
              }

            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal : {currencyFormat(total)}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className={`${initOrderValue.length || 'd-none'} button`}>
                    Payment Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const CartItem = (props) => {
  const { order, index, onChange, onDelete } = props;
  return (
    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center" >
      <div className="cart-col-1 gap-15 d-flex align-items-center">
        <div className="w-25">
          <img src={watch} className="img-fluid" alt="product image" />
        </div>
        <div className="w-75">
          <p>{order.product.name}</p>
          <p>{order.product.description}</p>
        </div>
      </div>
      <div className="cart-col-2">
        <h5 className="price">{currencyFormat(order.product.price)} </h5>
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-15">
        <div>
          <input
            className="form-control"
            type="number"
            name="quantity"
            defaultValue={order.quantity}
            onChange={onChange}
            min={1}
            max={10}
            id={index}
          />
        </div>
        <div>
          <AiFillDelete className="removeProCart text-danger " onClick={(e) => onDelete(index)} />
        </div>
      </div>
      <div className="cart-col-4">
        <h5 className="price">{currencyFormat(order.product.price * order.quantity)}</h5>
      </div>
    </div>
  )
}

export default Cart;

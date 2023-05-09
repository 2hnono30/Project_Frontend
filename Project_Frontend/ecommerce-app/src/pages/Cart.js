import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { currencyFormat } from "../components/Utils/Utils";
import { useId } from "react";


const Cart = () => {

  let location = useLocation();
  let initOrderValue = JSON.parse(localStorage.getItem('orders'));
  if (!initOrderValue) {
    initOrderValue = [];
  }

  const [state, setState] = useState({
    orderLists: initOrderValue
  })

  // console.log(initOrderValue);

  const { orderLists } = state;
  const id = useId();
  console.log(orderLists);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <div class1="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {(
                orderLists.map((order, index) => <CartItem key={`${id}-${index}`} order={order} index={index} />)
              )}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ 1000</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
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
  const { order, setState, index ,state } = props;
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
            name=""
            min={1}
            max={10}
            id=""
          />
        </div>
        <div>
          <AiFillDelete className="removeProCart text-danger " />
        </div>
      </div>
      <div className="cart-col-4">
        <h5 className="price">{currencyFormat(order.product.price * order.quantity)}</h5>
      </div>
    </div>
  )
}

export default Cart;

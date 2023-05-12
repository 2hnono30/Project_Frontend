import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../../images/watch.jpg";
import { useId } from "react";
import { currencyFormat } from "../../components/Utils/Utils";
import { useConfirm } from "material-ui-confirm";
import AppContext from "../../contexts/AppContext";
import CustomerInformation from "./CustomerInformation";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import { createCustomerInformation } from "../../Services/Checkout/CheckoutService";

const Checkout = () => {
  const [appState, appDispatch] = useContext(AppContext);

  const confirm = useConfirm();
  const refFrom = useRef();
  let initOrderValue = appState.cartItems;
  if (!initOrderValue) {
    initOrderValue = [];
  }
  const [state, setState] = useState({
    orderLists: initOrderValue
  })

  let subTotal = 0;
  initOrderValue.forEach(element => {
    subTotal += (element.product.price * element.quantity);
  });
  const { orderLists } = state;
  const id = useId();
  const [customer, setCustomer] = useState(
    {
      id: null,
      fullName: '',
      email: '',
      phone: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      note: ''
    });
  const onSubmit = (values) => {
    try {
      console.log(values)
      let totalAmount = subTotal + 10;
      console.log(totalAmount);
      const data = {
        orderItems: orderLists.map(e => {
          return {
            productId: e.id,
            quantity: e.quantity
          }

        }),
        customer: values
      }
      console.log(data);
      // createCustomerInformation(values, totalAmount, cartItems).then(e => {
      //   toast.success('CheckOut success');
      //   // fetchData();
      //   // setIsShow(false);
      // })
    } catch {
      console.log("error checkout");
    }
  }
  
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Developers App</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /&nbsp;
                    <li
                      className="breadcrumb-ite total-price active"
                      aria-current="page"
                    >
                      Information And Payment
                    </li>
                  </ol>
                </nav>
                {/* <h4 className="title total">Contact Information</h4>
                <p className="user-details total">
                  Navdeep Dahiya (monud0232@gmail.com)
                </p> */}
                <CustomerInformation
                  customer={customer}
                  onSubmit={onSubmit}
                  refFrom={refFrom}
                />
              </div>
            </div>
            <div className="col-5">
              {(
                orderLists.map((order, index) => <CartItem key={`${id}-${index}`}
                  order={order}
                  index={index}
                  total={subTotal} />)
              )}
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">{currencyFormat(subTotal)}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 10</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">{currencyFormat(subTotal + 10)}</h5>
              </div>
              <div className="d-flex justify-content-end py-4">
                <Button className='button' onClick={() => {
                  if (refFrom.current) {
                    console.log('temp')
                    refFrom.current.handleSubmit()
                  }
                }} >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const CartItem = (props) => {
  const { order, index, onChange, onDelete, total } = props;
  return (
    <div className="border-bottom py-4">
      <div className="d-flex gap-10 mb-2 align-align-items-center">
        <div className="w-75 d-flex gap-10">
          <div className="w-25 position-relative">
            <span
              style={{ top: "-10px", right: "2px" }}
              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
            >
              {order.quantity}
            </span>
            <img className="img-fluid" src={watch} alt="product" />
          </div>
          <div>
            <h5 className="total-price">{currencyFormat(order.product.price)}</h5>
            <p className="total-price">{order.product.name}</p>
          </div>
        </div>
        <div className="flex-grow-1">
          <h5 className="total">{currencyFormat(order.product.price * order.quantity)}</h5>
        </div>
      </div>
    </div>
  )
}

export default Checkout;

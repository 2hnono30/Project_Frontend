import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import NoProduct from "../images/NoProduct.jpg";
import { ProductService } from "../Services/Product/ProductService";
// import { CategoryService } from "../Services/Categories/CategoryService";
import { currencyFormat } from "./Utils/Utils";

const ProductCard = (props) => {

  const { grid, sort } = props;
  const { id } = useParams();

  let location = useLocation();

  const [state, setState] = useState({
    products: [],
    errorMessage: ''
  });

  useEffect(function ProductList() {
    if (location.pathname == "/product") {
      try {
        setState({ ...state });
        async function fetchAllProducts() {
          let resProduct = await ProductService.getProductListBySort(sort,"");
          setState({
            ...state,
            products: resProduct.data.content,
          })
        }
        fetchAllProducts();
      } catch (error) {
        setState({ ...state, errorMessage: error.message });
      }
    } else if (location.pathname.includes("category")) {
      try {
        setState({ ...state });
        async function fetchProductListByCategoryIdAndSort() {
          let resSort = await ProductService.getProductListBySort(sort,id);
          setState({
            ...state,
            products: resSort.data.content,
          })
        }
        fetchProductListByCategoryIdAndSort();
      } catch (error) {
        setState({ ...state, errorMessage: error.message });
      }
    } else {
      try {
        setState({ ...state });
        async function fetchFeature() {
          let resProduct = await ProductService.getFeatureProducts();
          setState({
            ...state,
            products: resProduct.data.content,
          })
        }
        fetchFeature();
      } catch (error) {
        setState({ ...state, errorMessage: error.message });
      }
    }
  }, [id , sort])

  const { products, errorMessage } = state;
  return (
    <>
      {(
        products.map(product => {
          return (
            <div key={product.id}
              className={location.pathname.includes("product") ? `gr-${grid}` : "col-3"
              }
            >
              <Link
                to={`${location.pathname == "/"
                  ? ("/product/" + product.id)
                  : location.pathname == ("/product/" + product.id)
                    ? ("/product/" + product.id)
                    : location.pathname == ("/product/category/" + id) ? ("/product/" + product.id) : product.id
                  }`}
                className="product-card position-relative"
              >
                <div className="product-image">
                  <img
                    src={product.avatar || NoProduct}
                    //  src={watch}
                    className="img-fluid"
                    alt="product image" />
                  <img
                    src={product.avatar || NoProduct}
                    //  src={watch2} 
                    className="img-fluid"
                    alt="product image" />
                </div>
                <div className="product-details">
                  <h6 className="brand">{product.nameBrand}</h6>
                  <h5 className="product-title">
                    {product.name}
                  </h5>
                  {/* <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  edit={false}
                  activeColor="#ffd700"
                /> */}
                  <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui
                    blanditiis praesentium voluptatum deleniti atque corrupti quos
                    dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt...
                  </p>
                  <p className="price">{currencyFormat(product.price)}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img src={prodcompare} alt="compare" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={view} alt="view" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          )
        }))}
    </>
  );
};

export default ProductCard;
import React, { useState, useEffect } from "react";
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from 'react-rating-stars-component';
import ProductCard from "../components/ProductCard";
import { Form, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import gr from "../images/gr.svg";
import gr2 from "../images/gr2.svg";
import gr3 from "../images/gr3.svg";
import gr4 from "../images/gr4.svg";
import Categories from "../components/Categories";
import { ProductService } from "../Services/Product/ProductService";
import Pagging from './../components/Pagging';
const OurStore = () => {

  const { id } = useParams();
  const PAGE = 4;

  const [grid, setGrid] = useState(4);

  const [sort, setSort] = useState("name,asc");

  const [state, setState] = useState({
    totalProduct: [],
  });

  let location = useLocation();

  const search = location.state?.search;


  const [product, setProduct] = useState({
    products: [],
    errorMessage: ''
  });
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 9,
    page: 1,
    sort: '',
  });
  const [totalPages, setTotalPages] = useState(0);

  const getProductWithTotalPage = (paginationModel, search) => {
    try {
      setProduct({ ...product });
      async function fetchAllProducts() {
        let resTotalPage = await ProductService.getAllProductWithTotalPage(paginationModel, id, sort, search);
        // console.log(resTotalPage);

        setProduct({
          ...product,
          products: resTotalPage.data.content,
        });
        setTotalPages(resTotalPage.data.totalPages);
        setState({...state,totalProduct:resTotalPage.data.totalElements})
      }
      fetchAllProducts();
    } catch (error) {
      setProduct({ ...product, errorMessage: error.message });
    }
  }

  const onPageChange = (number) => {
    setPaginationModel({ ...paginationModel, page: number });
  }

  const callApi = (page) => {
    try {
      setProduct({ ...product });
      async function fetchAllProducts() {
        let resProduct = await ProductService.getProductListBySort(sort, id, page);
        setProduct({
          ...product,
          products: resProduct.data.content,
        });
      }
      fetchAllProducts();
    } catch (error) {
      setProduct({ ...product, errorMessage: error.message });
    }
  }

  useEffect(function ProductList() {
    if (search) {
      getProductWithTotalPage(paginationModel,search);
      // console.log(search);
    }
    else {
      if (location.pathname == "/product" || location.pathname.includes("category")) {
        getProductWithTotalPage(paginationModel);
      } else {
        callApi(PAGE);
      }
    }
  }, [id, sort, search, paginationModel])


  const { products, errorMessage } = product;
  const { totalProduct } = state;
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store " />
      <div className='store-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-3'>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Shop By Categories</h3>
                <Categories />
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Filter By</h3>
                <div>
                  <h5 className='sub-title'> Availablity</h5>
                  <div className='form-check'>
                    <input className='form-check-input'
                      type="checkbox"
                      value=""
                      id="" />
                    <label className='form-check-label' htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input'
                      type="checkbox"
                      value=""
                      id="" />
                    <label className='form-check-label' htmlFor="">
                      Out of Stock (0)
                    </label>
                  </div>
                  <h5 className='sub-title'> Price</h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From" />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="To" />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                  <h5 className='sub-title'> Colors</h5>
                  <div>
                    <div>
                      <ul className='colors ps-0'>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                  <h5 className='sub-title'> Size</h5>
                  <div>
                    <div className='form-check'>
                      <input className='form-check-input'
                        type="checkbox"
                        value=""
                        id="color-1" />
                      <label className='form-check-label' htmlFor="color-1">
                        S (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input className='form-check-input'
                        type="checkbox"
                        value=""
                        id="color-2" />
                      <label className='form-check-label' htmlFor="color-2">
                        M (2)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Product Tags</h3>
                <div>
                  <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Headphone
                    </span>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Laptop
                    </span>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Mobile
                    </span>
                    <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                      Wire
                    </span>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Random Product</h3>
                <div>
                  <div className='random-products mb-3 d-flex'>
                    <div className='w-50'>
                      <img src="images/watch.jpg"
                        className='img-fluid' alt="watch" />
                    </div>
                    <div className='w-50'>
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                  <div className='random-products d-flex'>
                    <div className='w-50'>
                      <img src="images/watch.jpg"
                        className='img-fluid' alt="watch" />
                    </div>
                    <div className='w-50'>
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value)
                      }}
                      name=""
                      // defaultValue={"manual"}
                      className="form-control form-select"
                      id="sortSelect"
                    >
                      <option value="manual">Featured</option>
                      <option value="best-selling">Best selling</option>
                      <option value="name,asc">Alphabetically, A-Z</option>
                      <option value="name,desc">
                        Alphabetically, Z-A
                      </option>
                      <option value="price,asc">Price, low to high</option>
                      <option value="price,desc">Price, high to low</option>
                      <option value="createdAt,asc">Date, old to new</option>
                      <option value="createdAt,desc">Date, new to old</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">{totalProduct} Products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src={gr4}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src={gr3}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src={gr2}
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src={gr}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <ProductCard grid={grid} sort={sort} productList={products} />
                <div className="d-flex justify-content-center">
                  <Pagging currentPage={paginationModel.page}
                    totalPages={totalPages}
                    onPageChange={onPageChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
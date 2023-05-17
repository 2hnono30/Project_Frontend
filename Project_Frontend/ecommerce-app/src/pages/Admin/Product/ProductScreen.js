import React, { useEffect, useState } from "react";
import ProductCreateUpdate from './ProductCreateUpdate';
import Button from "react-bootstrap/Button";
import { Container, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { createProduct, deleteProduct, getAllProduct, updateProduct } from "./ProductService";
import { findCategory } from "../Category/CategoryService";
import { findBrand } from "../Brand/BrandService";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";



const ProductScreen = () => {
  const [products, setProducts] = useState([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
    sort: '',
    search: ''
  })
  const [search, setSearch] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [product, setProduct] = useState({ name: '', id: null, price: '', avatar: '', categoryId: '', brandId: '', images: [], avatarId: '' });
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [loading, setLoading] = useState(false)
  const confirm = useConfirm();

  const fetchData = () => {
    setLoading(true);
    findCategory().then(data => setCategories(data.data.content))
    findBrand().then(data => setBrands(data.data.content))
    getAllProduct(paginationModel).then(data => {
      setProducts(data.data.content);
      setTotalPages(data.data.totalElements);
      setLoading(false)
    })
  }

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 70
    },
    {
      field: 'fileUrl', headerName: 'Avatar', width: 250, height: 150, renderCell: (params) => {
        return (<img src={params.row.avatar} className="image-table" style={{ height: '20vh' }} alt="avatar" />)
      }
    },
    {
      field: 'name', headerName: 'Name', width: 200
    },
    {
      field: 'price', headerName: 'Price', width: 100
    },
    {
      field: 'marketPrice', headerName: 'Market Price', width: 100
    },
    {
      field: 'nameCategory', headerName: 'Category', width: 150
    },
    {
      field: 'nameBrand', headerName: 'Brand', width: 150
    },
    {
      field: 'warranty', headerName: 'warranty', width: 100
    },

    {
      field: 'actions', headerName: 'Actions', width: 140, renderCell: (params) => {
        return (
          <Stack>
            <Button
              onClick={(e) => onEdit(params.row)}
              variant="contained"
            >
              <EditIcon />
            </Button>
            <Button
              onClick={(e) => onDelete(params.row)}
              variant="contained"
            >
              <DeleteIcon />
            </Button>
          </Stack>
        );
      }
    }
  ]
  const onSubmit = (values) => {

    if (!values.id) {
      createProduct(values).then(e => {
        toast.success('Created');
        fetchData();
        setIsShow(false);
      })
    } else {
      updateProduct(values).then(e => {
        console.log(values);
        toast.success('Updated');
        fetchData();
        setIsShow(false);
      })
    }
  }
  const onEdit = (values) => {
    console.log(values);
    setIsShow(true);
    setProduct(values)
  }
  const onDelete = (value) => {
    confirm({ confirmationButtonProps: { autoFocus: true } })
      .then(() => {
        deleteProduct(value.id).then(() => {
          fetchData();
          toast.success("Deleted");
        });

      })
  }
  const onCreate = () => {
    setProduct({
      name: '', id: null, images: []
    })
    setIsShow(true)
  }
  useEffect(() => {
    fetchData();

  }, [paginationModel])

  const onSearch = () => {
    setPaginationModel({ ...paginationModel, search })
  }



  return <Paper className={'container'} style={{ height: '100vh', padding: '2rem 4rem' }}>
    <h3>Product</h3>
    <ProductCreateUpdate show={isShow}
      onHide={() => setIsShow(false)}
      product={product} products={products} categories={categories} brands={brands}
      onSubmit={onSubmit} />
    <div>
      <Button className="col-2" style={{ marginTop: 25, marginBottom: 25 }} onClick={() => onCreate()}>Create Product</Button>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={() => onSearch()}>
          Button
        </Button>
      </InputGroup>
    </div>

    <div>
      <DataGrid
        rowHeight={150}
        style={{ height: '70vh' }}
        rows={products}
        rowCount={totalPages}
        loading={loading}
        pagination
        page={paginationModel.page - 1}
        pageSize={paginationModel.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPaginationModel(old => ({ ...old, page: newPage + 1 }))
        }}
        onPageSizeChange={(newPageSize) => setPaginationModel(old => ({ ...old, pageSize: newPageSize }))}
        columns={columns}
      />
    </div>
  </Paper>;
}

export default ProductScreen
import React, { useEffect, useState, useMemo } from 'react'
import { getAllOrder } from './OrderService';
import { Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Stack } from "react-bootstrap";


import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CustomToolbar from "../../../components/CustomToolbar";
import Button from "react-bootstrap/Button";

const OrderScreen = () => {
  const slots = useMemo(
    () => ({
      toolbar: () => (
        <CustomToolbar
        />
      ),
      noRowsOverlay: () => (
        <Stack
          fontSize={18}
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          Không tìm thấy kết quả
        </Stack>
      ),
    }),
    []
  );

  const apiRef = useGridApiRef();
  const [orders, setOrders] = useState([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
    sort: '',
    search: ''
  })
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  // const [categories, setCategories] = useState();
  // const [brands, setBrands] = useState();
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true);
    // findCategory().then(data => setCategories(data.data.content))
    // findBrand().then(data => setBrands(data.data.content))
    getAllOrder(paginationModel).then(data => {
      setOrders(data.data.content);
      setTotalPages(data.data.totalElements);
      setLoading(false)
    })
  }

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 200
    },
    {
      field: 'customerName', headerName: 'Name', width: 200
    },
    {
      field: 'phone', headerName: 'Phone', width: 100
    },
    {
      field: 'totalAmount', headerName: 'Price', width: 150
    },
    {
      field: 'provinceName', headerName: 'Province', width: 100
    },
    {
      field: 'districtName', headerName: 'District', width: 100
    },
    {
      field: 'wardName', headerName: 'Ward', width: 100
    },
    {
      field: 'address', headerName: 'Address', width: 100
    },
    {
      field: 'status', headerName: 'Status', width: 150
    },





  ]




  useEffect(() => {
    fetchData();

  }, [paginationModel])

  const onSearch = () => {
    setPaginationModel({ ...paginationModel, search })
  }



  return <Paper className={'container'} style={{ height: '100vh', padding: '2rem 4rem' }}>
    <h3>Order</h3>

    <div>


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
        apiRef={apiRef}
        slots={slots}
        rowHeight={150}
        style={{ height: '70vh' }}
        rows={orders}
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

export default OrderScreen
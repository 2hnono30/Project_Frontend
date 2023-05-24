import React, { useEffect, useState, useMemo } from 'react'
import { getAllOrder } from './OrderService';
import { Paper, Fab } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, useGridApiRef, gridClasses } from "@mui/x-data-grid";
import { Stack } from "react-bootstrap";
import { grey, green } from '@mui/material/colors';


import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CustomToolbar from "../../../components/CustomToolbar";
import Button from "react-bootstrap/Button";
import OrderActions from './OrderActions';

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
          No results were found
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
  const [rowId, setRowId] = useState(null);
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true);
    getAllOrder(paginationModel).then(data => {
      setOrders(data.data.content);
      setTotalPages(data.data.totalElements);
      setLoading(false)
    })
  }

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 50
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
      field: 'status', headerName: 'Status', width: 150,
      type: 'singleSelect',
      valueOptions: ['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'],
      editable: true,
      renderCell: params => {
        if (params.value == "PENDING") {
          return <div
            className='d-flex justify-content-center'
            style={{
              width: 100,
              height: 20,
              color: '#ffea00',
              borderRadius: 20,
              border: "1px solid",
            }}
          >
            {params.value}
          </div >
        } else if (params.value == "PAID") {
          return <div
            className='d-flex justify-content-center'
            style={{
              width: 100,
              height: 20,
              color: '#00e676',
              borderRadius: 20,
              border: "1px solid",
            }}
          >
            {params.value}
          </div >
        } else if (params.value == "SHIPPED") {
          return <div
            className='d-flex justify-content-center'
            style={{
              width: 100,
              height: 20,
              color: '#448aff',
              borderRadius: 20,
              border: "1px solid",
            }}
          >
            {params.value}
          </div >
        } else if (params.value == "CANCELLED") {
          return <div
            className='d-flex justify-content-center'
            style={{
              width: 100,
              height: 20,
              color: '#ff8a80',
              borderRadius: 20,
              border: "1px solid",
            }}
          >
            {params.value}
          </div >
        }
      }
    },
    {
      field: 'actions', headerName: 'actions', type: 'actions', renderCell: params => {
        return <OrderActions params={params} rowId={rowId} setRowId={setRowId} />
      }
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
        <Button id="button-addon2" onClick={() => onSearch()}>
          Button
        </Button>
      </InputGroup>
    </div>

    <div>
      <DataGrid
        apiRef={apiRef}
        slots={slots}
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
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </div>
  </Paper>;
}

export default OrderScreen
import React, {useEffect, useState} from "react";

import CustomerCreateUpdate from './CustomerCreateUpdate';
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from "./CustomerService";
import Button from "react-bootstrap/Button";
import { Container, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

import {getAllProvinces} from './LocationRegionService'

const CustomerScreen = () => {

    const [customers, setCustomers] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 1,
        sort: '',
    })
    const [isShow, setIsShow] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [customer, setCustomer] = useState({ name: '', id: null, phone: '', email: '', image: '', locationRegion: {} });
    const [loading, setLoading] = useState(false)
    const confirm = useConfirm();
    const fetchData = () => {
        setLoading(true);
        getAllCustomers(paginationModel).then(data => {
            setCustomers(data.data.content);
            setTotalPages(data.data.totalElements);
            setLoading(false)
        })
    }

    

    

    

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 70
        },
        {
            field: 'name', headerName: 'Full Name', width: 200
        },
        {
            field: 'email', headerName: 'Email', width: 200
        },
        {
            field: 'phone', headerName: 'Phone', width: 100
        },
        {
            field: 'avatar', headerName: 'avatar', width: 200
        },
        {
            field: 'province', headerName: 'Province', width: 200
        },
        {
            field: 'district', headerName: 'District', width: 200
        },
        {
            field: 'ward', headerName: 'Ward', width: 200
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
            createCustomer(values).then(e => {
                toast.success('Created');
                fetchData();
                setIsShow(false);
            })
        } else {
            updateCustomer(values).then(e => {
                toast.success('Updated');
                fetchData();
                setIsShow(false);
            })
        }
    }
    const onEdit = (values) => {
        setIsShow(true);
        setCustomer(values)
    }
    const onDelete = (value) => {
        confirm({ confirmationButtonProps: { autoFocus: true } })
            .then(() => {
                deleteCustomer(value.id).then(() => {
                    fetchData();
                    toast.success("Deleted");
                });

            })
    }
    const onCreate = () => {
        setCustomer({
            id: null,
            name: '',
            email: '',
            phone: '',
            avatar: '',
            locationRegion: {}
        })
        setIsShow(true)
    }
    useEffect(() => {
        fetchData();
    }, [paginationModel])


    return <Paper className={'container'} style={{ height: '100vh', padding: '2rem 4rem' }}>
        <h3>Customer</h3>
        <CustomerCreateUpdate 
            show={isShow}
            onHide={() => setIsShow(false)}
            customer={customer} 
            customers={customers}
            onSubmit={onSubmit} 
        />
        <Button style={{ marginTop: 25, marginBottom: 25 }} onClick={() => onCreate()}>Create Customer</Button>
        <div>
            <DataGrid
                style={{ height: '70vh' }}
                rows={customers}
                rowCount={totalPages}
                loading={loading}
                pagination
                page={paginationModel.page - 1}
                pageSize={paginationModel.pageSize}
                paginatio nMode="server"
                onPageChange={(newPage) => {
                    setPaginationModel(old => ({ ...old, page: newPage + 1 }))
                }}
                onPageSizeChange={(newPageSize) => setPaginationModel(old => ({ ...old, pageSize: newPageSize }))}
                columns={columns}
            />
        </div>
    </Paper>;
}

export default CustomerScreen
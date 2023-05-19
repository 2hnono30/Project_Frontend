import React, { useEffect, useState } from "react";
import { createBrand, deleteBrand, getAllBrand, updateBrand, restoreBrand } from "./BrandService";
import BrandCreateUpdate from "./BrandCreateUpdate";
import Button from "react-bootstrap/Button";
import { Container, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { ReactImageZoom } from 'react-image-zoom';
import { height } from "@mui/system";
import UndoIcon from '@mui/icons-material/Undo';
import RestoreIcon from '@mui/icons-material/Restore';
import { set } from "immutable";

const BrandScreen = ({ closeMenu }) => {
    const [brands, setBrands] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 1,
        sort: '',
        deleted: false,
    })
    const [isShow, setIsShow] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [brand, setBrand] = useState({ name: '', id: null, avatar: '', imageId: '' });
    const [loading, setLoading] = useState(false)
    const confirm = useConfirm();
    const fetchData = () => {
        setLoading(true);
        getAllBrand(paginationModel).then(data => {
            setBrands(data.data.content);
            setTotalPages(data.data.totalElements);
            setLoading(false)
        })
    }
    const findIndex = (id) => {
        for(let i = 0; i < brands.length; i++){
            if(id === brands[i].id){
                return i;
            }
        }
        return -1;
    }
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 70, height: 70, renderCell: (index) => {
                return (<span>{findIndex(index.row.id) + 1}</span>) 
            }
        },
        {
            field: 'fileUrl', headerName: 'Avatar', width: 250, height: 150, renderCell: (params) => {
                return (<img src={params.row.fileUrl} className="image-table" style={{ height: '20vh' }} alt="avatar" />)
            }
        },
        {
            field: 'name', headerName: 'Name', width: 500
        },
        {
            field: 'actions', headerName: 'Actions', width: 140, renderCell: (params) => {
                return (
                    <Stack>
                        {!paginationModel.deleted ?
                            (<><Button
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
                            </>
                            ) :
                            (<Button
                                onClick={(e) => onRestore(params.row)}
                                variant="contained"
                            >
                                <RestoreIcon />
                            </Button>)}
                    </Stack>
                );
            }
        }
    ]
    const onSubmit = (values) => {
        if (!values.id) {
            createBrand(values).then(e => {
                toast.success('Created');
                fetchData();
                setIsShow(false);
            })
        } else {
            updateBrand(values).then(e => {
                toast.success('Updated');
                fetchData();
                setIsShow(false);
            })
        }
    }
    const onEdit = (values) => {
        setIsShow(true);
        setBrand(values)
    }
    const onDelete = (value) => {
        confirm({ confirmationButtonProps: { autoFocus: true } })
            .then(() => {
                deleteBrand(value.id).then(() => {
                    fetchData();
                    toast.success("Deleted");
                });

            })
    }
    const onRestore = (value) => {
        confirm({ confirmationButtonProps: { autoFocus: true } })
            .then(() => {
                restoreBrand(value.id).then(() => {
                    fetchData();
                    toast.success("Restore");
                });

            })
    }
    const onCreate = () => {
        setBrand({
            name: '', id: null
        })
        setIsShow(true)
    }
    const onRecovery = () => {
        setLoading(true);
        setPaginationModel({ ...paginationModel, deleted: true })
        getAllBrand(paginationModel).then(data => {
            setBrands(data.data.content);
            setTotalPages(data.data.totalElements);
            setLoading(false)
        })
    }
    const onBack = () => {
        setLoading(true);
        setPaginationModel({ ...paginationModel, deleted: false })
        getAllBrand(paginationModel).then(data => {
            setBrands(data.data.content);
            setTotalPages(data.data.totalElements);
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchData();
    }, [paginationModel, isShow])

    return <Paper className={'container'} style={{ height: '100vh', padding: '2rem 4rem' }}>
        <h3>Brand</h3>
        <BrandCreateUpdate show={isShow}
            onHide={() => setIsShow(false)}
            brand={brand} brands={brands}
            onSubmit={onSubmit} />
        <Button style={{ marginTop: 25, marginBottom: 25 }} onClick={() => onCreate()}>Create Brand</Button>
        <Button className={!paginationModel.deleted || "d-none"} style={{ marginTop: 25, marginBottom: 25, marginLeft: 25 }} onClick={() => onRecovery()}><RestoreIcon />recovery</Button>
        <Button className={paginationModel.deleted || "d-none"} style={{ marginTop: 25, marginBottom: 25, marginLeft: 25 }} onClick={() => onBack()}><UndoIcon />Back</Button>
        <div>
            <DataGrid
                style={{ height: '70vh' }}
                rows={brands}
                rowCount={totalPages}
                // rowHeight={200}
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
export default BrandScreen;
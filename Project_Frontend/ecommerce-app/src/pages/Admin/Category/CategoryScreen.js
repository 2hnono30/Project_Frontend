import React, {useEffect, useState} from "react";
import {createCategory, deleteCategory, getAllCategory, updateCategory} from "./CategoryService";
import CategoryCreateUpdate from "./CategoryCreateUpdate";
import Button from "react-bootstrap/Button";
import {Container, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {DataGrid} from "@mui/x-data-grid";
import {Stack} from "react-bootstrap";
import {toast} from "react-toastify";
import { useConfirm } from "material-ui-confirm";


const CategoryScreen = () => {

    const [categories, setCategories] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 1,
        sort: '',
    })
    const [isShow, setIsShow] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState({name: '', id: null});
    const [loading, setLoading] = useState(false)
    const confirm = useConfirm();
    const fetchData = () => {
        setLoading(true);
        getAllCategory(paginationModel).then(data => {
            setCategories(data.data.content);
            setTotalPages(data.data.totalElements);
            setLoading(false)
        })
    }
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 70
        },
        {
            field: 'name', headerName: 'Name', width: 500
        },
        {
            field: 'actions', headerName: 'Actions', width: 140, renderCell: (params) => {
                return (
                    <Stack>
                        <Button
                            onClick={(e) => onEdit(params.row)}
                            variant="contained"
                        >
                            <EditIcon/>
                        </Button>
                        <Button
                            onClick={(e) => onDelete(params.row)}
                            variant="contained"
                        >
                            <DeleteIcon/>
                        </Button>
                    </Stack>
                );
            }
        }
    ]
    const onSubmit = (values) => {
        if (!values.id) {
            createCategory(values).then(e => {
                toast.success('Created');
                fetchData();
                setIsShow(false);
            })
        } else {
            updateCategory(values).then(e => {
                toast.success('Updated');
                fetchData();
                setIsShow(false);
            })
        }
    }
    const onEdit = (values) => {
        setIsShow(true);
        setCategory(values)
    }
    const onDelete = (value) => {
        confirm({ confirmationButtonProps: { autoFocus: true } })
            .then(() => {
                deleteCategory(value.id).then(() => {
                    fetchData();
                    toast.success("Deleted");
                });

            })
    }
    const onCreate = () => {
        setCategory({
            name: '', id: null
        })
        setIsShow(true)
    }
    useEffect(() => {
        fetchData();
    }, [paginationModel])


    return <Paper className={'container'} style={{height: '100vh', padding: '2rem 4rem'}}>
        <h3>Category</h3>
        <CategoryCreateUpdate show={isShow}
                              onHide={() => setIsShow(false)}
                              category={category} categories={categories}
                              onSubmit={onSubmit}/>
        <Button style={{marginTop: 25, marginBottom: 25}} onClick={() => onCreate()}>Create Category</Button>
        <div>
                <DataGrid
                    style={{height: '70vh'}}
                    rows={categories}
                    rowCount={totalPages}
                    loading={loading}
                    pagination
                    page={paginationModel.page - 1}
                    pageSize={paginationModel.pageSize}
                    paginationMode="server"
                    onPageChange={(newPage) => {
                        setPaginationModel(old => ({...old, page: newPage + 1}))
                    }}
                    onPageSizeChange={(newPageSize) => setPaginationModel(old => ({...old, pageSize: newPageSize}))}
                    columns={columns}
                />
        </div>
    </Paper>;
}

export default CategoryScreen;
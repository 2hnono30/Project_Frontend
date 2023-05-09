import React, { useEffect, useState } from "react";
import { getAllCategory } from "./CategoryService";
import Table from 'react-bootstrap/Table';
import Pagging from "../../../components/Pagging";
import CategoryCreateUpdate from "./CategoryCreateUpdate";
import Button from "react-bootstrap/Button";



const CategoryScreen = ({ closeMenu }) => {

    const [categories, setCategories] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 1,
        sort: '',
    })
    const [isShow, setIsShow] = useState(false);
    const [isDesc, setIsDesc] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState({});
    const fetchData = () => {
        getAllCategory(paginationModel).then(data => {
            setCategories(data.data.content);
            setTotalPages(data.data.totalPages);
        })
    }
    const onPageChange = (number) => {
        setPaginationModel({ ...paginationModel, page: number });
    }

    const handleSort = (field) => {
        let sort;
        if (!isDesc) {
            sort = field + ',desc';
        } else {
            sort = field + ',asc';
        }
        setPaginationModel({
            ...paginationModel,
            sort: sort
        })
        setIsDesc((prevState) => !prevState);
    }
    const renderItem = (cate) => {
        return <tr key={cate.id}>
            <td>{cate.id}</td>
            <td>{cate.name}</td>
        </tr>
    }

    useEffect(() => {
        fetchData();
    }, [paginationModel])


    return <div className={'container'}  >
        <h3>Category</h3>
        <CategoryCreateUpdate show={isShow} onHide={() => setIsShow(false)} />
        <Button onClick={() => setIsShow(true)}>Create Category</Button>
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => {
                            handleSort('id')
                        }}>Id</th>
                        <th onClick={() => {
                            handleSort('name')
                        }}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(e => renderItem(e))}
                </tbody>
            </Table>
            <Pagging currentPage={paginationModel.page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    </div>;
}

export default CategoryScreen;
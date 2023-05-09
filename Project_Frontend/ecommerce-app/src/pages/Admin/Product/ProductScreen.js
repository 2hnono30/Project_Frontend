import React from 'react'
import ProductCreateUpdate from './ProductCreateUpdate';

const ProductScreen = () => {



  return <div className={'container'}  >
    <h3>Product</h3>
    {/* <ProductCreateUpdate show={isShow} onHide={() => setIsShow(false)} />
    <Button onClick={() => setIsShow(true)}>Create Product</Button>
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
    </div> */}
  </div>;
}

export default ProductScreen
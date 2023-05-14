import Pagination from 'react-bootstrap/Pagination';

function Pagging(props) {
    const {totalPages, currentPage, onPageChange} = props;
    const items = [];
    // console.log(currentPage);
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item onClick={() => {onPageChange(number)}} key={number} active={number === currentPage}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <Pagination>{items}</Pagination>
    );
}

export default Pagging;
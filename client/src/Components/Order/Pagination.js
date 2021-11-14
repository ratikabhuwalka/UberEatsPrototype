// import React,{useState, useEffect} from 'react'
// import { Pagination } from 'react-bootstrap';

// export default function PaginationPage({orders, setCurrentOrderList, itemsPerPage}) {

//     const [active, setActive] = useState(1);
//     const [items, setItems] = useState([]);
//     useEffect(() => {
//         const elements = []
//         for (let number = 1; number <= Math.ceil(orders.length*(1.0)/itemsPerPage); number++) {
//             elements.push(
//                 <Pagination.Item key={number} active={number === active} onClick={()=> handlePageClick(number)}>
//                     {number}
//                 </Pagination.Item>,
//             );
//         }
//         setItems(elements)
        
//     }, [])

//     const handlePageClick = (number) => {
//         setActive(number)
//         let initialIndex = (number-1) * itemsPerPage;
//         setCurrentOrderList(orders.slice(initialIndex, Math.min(initialIndex+itemsPerPage, orders.length)))
//     }

//     return (
//         <div>
//             <Pagination size="sm">{items}</Pagination>
//             <br />
//         </div>
//     )
// }


import React from 'react'

function Paginate({ postPerPage, totalPost, paginate }) {
    console.log("props", postPerPage,totalPost,paginate)
    const page_no = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        page_no.push(i);
    }

    return (
        <div>
            <nav>
                <ul className='pagination'>
                    {page_no.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)}  className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Paginate

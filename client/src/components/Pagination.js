import React from 'react';

export const Pagination = ({ rowsPerPage, totalRows, paginate, selectPerPage }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++){
        pageNumbers.push(i);
    }

    const execFunc = () => {
        const optionState = document.getElementById('selectPag');
        const selectedValue = optionState.options[optionState.selectedIndex].value;

        selectPerPage(selectedValue);
    };

    return(
        <nav>
            <div className="form-inline ml-auto float-right">
                Строк на странице:
                <select id="selectPag" className="custom-select" onChange={execFunc} style={{marginLeft:10, marginRight: 10}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="999">Все</option>
                </select>
                <ul className="pagination" style={{marginBottom: 0}}>
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a href="#" className="page-link" onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
};
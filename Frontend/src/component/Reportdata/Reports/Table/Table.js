import React from 'react'

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const Table = (props) => {
  const themeval = localStorage.getItem('themetype')
    return (

        <DataTableExtensions
        {...props.Tabledta}>
        <DataTable
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          theme={themeval}
          highlightOnHover
        />
      </DataTableExtensions>

    )

}

export default Table


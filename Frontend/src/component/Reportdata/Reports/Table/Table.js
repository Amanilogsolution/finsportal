import React from 'react'

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import customStyles from '../../../customTableStyle'
const Table = (props) => {
    return (

        <DataTableExtensions
        {...props.Tabledta}>
        <DataTable
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          dense
          customStyles={customStyles}
          highlightOnHover
        />
      </DataTableExtensions>

    )

}

export default Table


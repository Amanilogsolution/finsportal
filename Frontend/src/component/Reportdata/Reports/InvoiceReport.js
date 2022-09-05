import React, { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


const InvoiceReport = (props) => {
  const [data, setData] = useState([])

  const columns = [
    {
      name: 'Country Name',
      selector: 'consignee',
      sortable: true
    },
  
    {
      name: 'Invoice NO',
      selector: 'invoice_no',
      sortable: true
    },
  
    {
      name: 'Invoice Date',
      selector: 'Joindate',
      sortable: true
    },
    {
      name: 'Invoice Amount',
      selector: 'invoice_amt',
      sortable: true
    },
    {
        name: 'Branch',
        selector: 'location_name',
        sortable: true
      }
  ]
  

  useEffect(() => {
    async function fetchdata() {
        setData(props.displaydata)
    }
    fetchdata()
  }, [])

  const tableData = {
    columns, data
  }

  return (
    <div>
        <div>
            <h4 className='text-center'>InvoiceReport</h4>
                      <DataTableExtensions
                        {...tableData}
                      >
                        <DataTable
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                        />
                      </DataTableExtensions>


            </div>
          </div>
  )

}

export default InvoiceReport

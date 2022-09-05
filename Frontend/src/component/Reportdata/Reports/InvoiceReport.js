import React, { useEffect, useState } from 'react'
// import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
// import Footer from "../../Footer/Footer";
// import { Totalcity } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


const InvoiceReport = () => {
  const [data, setData] = useState([])

  const columns = [
    {
      name: 'Country Name',
      selector: 'country_name',
      sortable: true
    },
  
    {
      name: 'State Code',
      selector: 'state_name',
      sortable: true
    },
  
    {
      name: 'City Name',
      selector: 'city_name',
      sortable: true
    },
    {
      name: 'City ID',
      selector: 'city_id',
      sortable: true
    },
  
   
  
  ]
  

  useEffect(() => {
    async function fetchdata() {
    
    }
    fetchdata()
  }, [])

  const tableData = {
    columns, data
  }

  return (
    <div>
        <div>
            <h4>InvoiceReport</h4>
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

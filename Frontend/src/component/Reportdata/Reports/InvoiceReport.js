import React, { useEffect, useState } from 'react'
import Table from './Table/Table'


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
                <h4>InvoiceReport</h4>
                <Table Tabledta={tableData} />
            </div>
        </div>
    )

}

export default InvoiceReport

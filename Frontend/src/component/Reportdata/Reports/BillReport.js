import React, { useEffect, useState } from 'react'
import Table from './Table/Table'



const BillReport = (props) => {
    const [data, setData] = useState([])

    const columns = [
        {
            name: 'Vourcher No',
            selector: 'vourcher_no',
            sortable: true
        },
        {
            name: 'Voucher Date',
            selector: 'voudate',
            sortable: true
        },
        {
            name: 'Bill No',
            selector: 'bill_no',
            sortable: true
        },
        {
            name: 'Bill Date',
            selector: 'billdate',
            sortable: true
        },
        {
            name: 'Vendor',
            selector: 'vend_name',
            sortable: true
        },
        {
            name: 'Amount',
            selector: 'total_bill_amt',
            sortable: true
        },
        {
            name: 'Location',
            selector: 'location',
            sortable: true
        },
        {
            name: 'Remarks',
            selector: 'remarks',
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

                <h4 className='text-center'>Bill Report <span className='text-danger'>({props.name})</span></h4>
                <Table Tabledta={tableData} />
            </div>
        </div>
    )

}

export default BillReport

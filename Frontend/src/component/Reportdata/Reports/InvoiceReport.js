import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import InvoicePreview from '../Preview/InvoicePreview';


const InvoiceReport = (props) => {
    const [data, setData] = useState([])
    const [sno, setSno] = useState()
    const [tooglecomponent, setTooglecomponent] = useState(false)
console.log('PropsSatadd',props)
    const columns = [
        {
            name: 'Vendor Name',
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
        },
        {
            name: "Actions",
            sortable: false,

            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => { e.preventDefault(); localStorage.setItem('preview', row.invoice_no); setSno(row.sno);setTooglecomponent(true) }} className="btn btn-success ml-2"
                    data-toggle="modal" data-target="#exampleModalCenter" >Preview Invoice </button>

            ]
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

                <h4 className='text-center'>Invoice Report <span className='text-danger'>({props.name})</span></h4>
                <Table Tabledta={tableData} />

                {
                    tooglecomponent ? <InvoicePreview /> : null
                }


            </div>
        </div>
    )

}

export default InvoiceReport

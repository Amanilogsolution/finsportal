import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import POPreview from '../Preview/POPreview';




const POReport = (props) => {
    const [data, setData] = useState([])
    const [tooglecomponent, setTooglecomponent] = useState(false)


    const columns = [
        {
            name: 'PO Number',
            selector: 'po_number',
            sortable: true
        },
        {
            name: 'PO Location',
            selector: 'po_location',
            sortable: true
        },
        {
            name: 'Date',
            selector: 'po_date',
            sortable: true
        },
        {
            name: 'Vendor ID',
            selector: 'vendor_id',
            sortable: true
        },
        {
            name: "Actions",
            sortable: false,

            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => { e.preventDefault(); localStorage.setItem('preview', row.po_number); setTooglecomponent(true) }} className="btn btn-success ml-2"
                    data-toggle="modal" data-target="#exampleModalCenter" >PO Preview </button>

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

                <h4 className='text-center'>PO Report <span className='text-danger'>({props.name})</span></h4>
                <Table Tabledta={tableData} />
                {
                    tooglecomponent ? <POPreview /> : null
                }
            </div>
        </div>
    )

}

export default POReport
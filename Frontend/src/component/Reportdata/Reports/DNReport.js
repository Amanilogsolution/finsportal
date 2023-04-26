import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import POPreview from '../Preview/POPreview/POPreview';




const DNReport = (props) => {
    const [data, setData] = useState([])
    const [tooglecomponent, setTooglecomponent] = useState(false)


    const columns = [
        {
            name: 'DN Number',
            selector: 'dn_no',
            sortable: true
        },
        {
            name: 'Bill Number',
            selector: 'bill_no',
            sortable: true
        },
        {
            name: 'Date',
            selector: 'Joindate',
            sortable: true
        },
        {
            name: 'Voucher No',
            selector: 'voucher_no',
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
            console.log(props.displaydata)
        }
        fetchdata()
    }, [])

    const tableData = {
        columns, data
    }

    return (
        <div>

            <div>

                <h4 className='text-center'>DN Report <span className='text-danger'>({props.name})</span></h4>
                <Table Tabledta={tableData} />
                {
                    tooglecomponent ? <POPreview /> : null
                }
            </div>
        </div>
    )

}

export default DNReport
import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import DnPreview from '../Preview/DNPreview/DnPreview'



const DNReport = (props) => {
    const [data, setData] = useState([])
    const [dnSno, setDnSno] = useState('')
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
                <button id='previewbtn' type="button" onClick={(e) => { e.preventDefault();setDnSno(row.sno);setTooglecomponent(true) }} className="btn btn-success ml-2"
                    data-toggle="modal" data-target="#DNPreviewModal" >DN Preview </button>
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
                    tooglecomponent ? <DnPreview dnSno={dnSno}/> : null
                }
            </div>
        </div>
    )

}

export default DNReport
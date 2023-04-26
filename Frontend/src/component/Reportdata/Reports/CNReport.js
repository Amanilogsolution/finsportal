import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
// import CNPreview from '../Preview/POPreview/POPreview';
import CnPreview from '../Preview/CNPreview/CnPreview'



const CNReport = (props) => {
    const [data, setData] = useState([])
    const [cnNum,setCnNum] = useState('')
    const [tooglecomponent, setTooglecomponent] = useState(false)


    const columns = [
        {
            name: 'CN Number',
            selector: 'cn_no',
            sortable: true
        },
        {
            name: 'Invoice Number',
            selector: 'inv_no',
            sortable: true
        },
        {
            name: 'Date',
            selector: 'Joindate',
            sortable: true
        },
        {
            name: 'Customer ID',
            selector: 'cust_id',
            sortable: true
        },
        {
            name: "Actions",
            sortable: false,

            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => { e.preventDefault();setCnNum(row.po_number); setTooglecomponent(true) }} className="btn btn-success ml-2"
                    data-toggle="modal" data-target="#CNPreviewModal" >CN Preview </button>

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

                <h4 className='text-center'>CN Report <span className='text-danger'>({props.name})</span></h4>
                <Table Tabledta={tableData} />
                {
                    tooglecomponent ? <CnPreview cnNum={cnNum}/> : null
                }
            </div>
        </div>
    )

}

export default CNReport
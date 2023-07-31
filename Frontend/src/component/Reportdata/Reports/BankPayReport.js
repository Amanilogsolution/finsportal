import React, { useState, useEffect } from 'react'
import Table from './Table/Table'
import BankPayRepPreview from '../Preview/BankPayRepPreview/BankPayRepPreview';
import {showOrganisation} from '../../../api/index'


const BankPayReport = (props) => {
    const [bankPayId, setBankPayId] = useState('')
    const [orgdata, setOrgdata] = useState([])
    const [tooglecomponent, setTooglecomponent] = useState(false)


    const columns = [
        {
            name: 'Payment id',
            selector: 'bank_payment_id',
            sortable: true
        },
        {
            name: 'Cheq Ref No',
            selector: 'cheq_ref_no',
            sortable: true
        },
        {
            name: 'Payment Date',
            selector: 'bankPaymentDate',
            sortable: true
        },
        {
            name: 'Cheq Amt',
            selector: 'cheq_amt',
            sortable: true
        },
        {
            name: 'Cheq Date',
            selector: 'cheqDate',
            sortable: true
        },
        {
            name: "Actions",
            sortable: false,

            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => { e.preventDefault(); setBankPayId(row.bank_payment_id); setTooglecomponent(true) }} className="btn btn-success ml-2"
                    data-toggle="modal" data-target="#BankPayPreview" >Payment Preview </button>
            ]
        }

    ]

    const tableData = {
        columns, data: props.displaydata
    }


    useEffect(() => {
        const fetchData = async () => {
            const orgData = await showOrganisation(localStorage.getItem('Organisation'))
            setOrgdata(orgData)
        }
        fetchData()
        console.log(props)
    }, [])
    return (
        <div>

            <div>

                <h4 className='text-center'>Bank Payment <span className='text-danger'>({props.name})</span></h4>
                <Table Tabledta={tableData} />
                {
                    tooglecomponent ? <BankPayRepPreview bankPayId={bankPayId} orgdata={orgdata}/> : null
                }
            </div>
        </div>
    )

}

export default BankPayReport
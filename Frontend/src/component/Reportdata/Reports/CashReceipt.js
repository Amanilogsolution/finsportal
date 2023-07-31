import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import { showOrganisation } from '../../../api';
import CashReceiptRepPreview from '../Preview/CashReceiptRepPreview/CashReceiptRepPreview'

const CashReceiptReport = (props) => {
    const [data, setData] = useState([])
    const [cashRecpId, setCashRecpId] = useState('')
    const [orgData, setOrgdata] = useState([])
    const [tooglecomponent, setTooglecomponent] = useState(false)

    const columns = [
        {
            name: 'Cash Receipt id',
            selector: 'cash_receipt_id',
            sortable: true
        },
        {
            name: 'Cash Receipt Date',
            selector: 'cashReceiptDate',
            sortable: true
        },
        {
            name: 'Cheque/Ref No',
            selector: 'ref_no',
            sortable: true
        },
        {
            name: 'Cheque/Ref Date',
            selector: 'refDate',
            sortable: true
        },

        {
            name: 'Amount',
            selector: 'amt',
            sortable: true
        },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => {
                    e.preventDefault();
                    setCashRecpId(row.cash_receipt_id); setTooglecomponent(true)
                }} className="btn btn-success"
                    data-toggle="modal" data-target="#CashRecepPreview" >Preview</button>
            ]
        }
    ]

    useEffect(() => {
        async function fetchdata() {
            const orgData = await showOrganisation(localStorage.getItem('Organisation'))
            setOrgdata(orgData)
        }
        fetchdata()
    }, [])

    const tableData = {
        columns, data: props.displaydata

    }

    return (
        <div>
            <div>
                <h4 className='text-center'>Cash Receipt Report <span className='text-danger'>{props.name && (props.name)}</span></h4>
                <Table Tabledta={tableData} />
                {
                        tooglecomponent ? <CashReceiptRepPreview cashRecpId={cashRecpId} orgdata={orgData} /> : null
                    }
            </div>
        </div>
    )

}

export default CashReceiptReport;

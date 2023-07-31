import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import { showOrganisation } from '../../../api';
import CashPaymentReportPreview from '../Preview/CashPaymentReportPreview/CashPaymentReportPreview';

const CashPaymentReport = (props) => {
    const [cashPayId, setCashPayId] = useState('')
    const [orgData, setOrgdata] = useState([])
    const [tooglecomponent, setTooglecomponent] = useState(false)

    const columns = [
        {
            name: 'Cash Payment Id',
            selector: 'cash_payment_id',
            sortable: true
        },
        {
            name: 'Cash Payment Date',
            selector: 'cashPaymentDate',
            sortable: true
        },
        {
            name: 'Cheque/Ref No',
            selector: 'pymt_no',
            sortable: true
        },
        {
            name: 'Cheque/Ref Date',
            selector: 'pymtDate',
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
                    setCashPayId(row.cash_payment_id); setTooglecomponent(true)
                }} className="btn btn-success"
                    data-toggle="modal" data-target="#CashPayPreview" >Preview</button>
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
                <h4 className='text-center'>Cash Payment Report <span className='text-danger'>{props.name && (props.name)}</span></h4>
                <Table Tabledta={tableData} />
                {
                        tooglecomponent ? <CashPaymentReportPreview cashPayId={cashPayId} orgdata={orgData} /> : null
                    }
            </div>
        </div>
    )

}

export default CashPaymentReport;

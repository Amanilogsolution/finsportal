import React from 'react'

const SubAddCashReceipt = ({ CashSubdata, handleDeleteRemove, handleChangeRowData, handleBlurMethod, setCurrentindex, activeEmp }) => {
    return (
        CashSubdata.map((rowdata, index) => (
            <tr key={index}>
                <td className='p-0'>
                    <button type="button" style={{ height: '50px' }} id={`chartofacct-${index}`} className="btn border col overflow-hidden p-0" data-toggle="modal" data-target="#chartofaccountmodal"
                        onClick={() => {
                            setCurrentindex(index);
                            setTimeout(() => { document.getElementById('searchChartofAcct').focus() }, 700)
                        }}>

                        {rowdata.achead.length > 0 ? rowdata.achead : "Select Value"}
                    </button>
                </td>
                <td className='p-0'>
                    <button type="button" id={`location-${index}`} className="btn border col p-0" style={{ height: '50px' }} data-toggle="modal" data-target="#locationmodal"
                        onClick={(e) => {
                            e.preventDefault(); setCurrentindex(index);
                            setTimeout(() => { document.getElementById('searchLocation').focus() }, 700)
                        }}>
                        {rowdata.costCenter.length > 0 ? rowdata.costCenterName : "Select Cost Center"}
                    </button>
                </td>
                <td className='p-0'> <input type="text" className="form-control px-1" name='refNo' id={`refNo-${index}`} value={rowdata.refNo} onChange={(e) => handleChangeRowData(e, index)} /> </td>
                <td className='p-0'> <input type="date" className="form-control px-1" name='refDate' id={`refDate-${index}`} value={rowdata.refDate} onChange={(e) => handleChangeRowData(e, index)} /> </td>
                <td className='p-0'> <input type="number" className="form-control px-1" name='refAmt' id={`refAmt-${index}`} min={0} defaultValue={rowdata.refAmt}
                    onChange={(e) => handleChangeRowData(e, index)} 
                    // onChange={(e)=>{console.log(e.target.value==''|| e.target.value)}}
                    onBlur={(e) => { handleBlurMethod(e, index) }} /> </td>
                <td className='p-0'> <input type="number" className="form-control" name='netAmt' min={0} value={rowdata.netAmt} onChange={(e) => handleChangeRowData(e, index)} onBlur={(e) => { handleBlurMethod(e, index) }} /> </td>
                <td className='p-0'>
                    <select className="form-control" name='payType' onChange={(e) => handleChangeRowData(e, index)} onBlur={(e) => { handleBlurMethod(e, index) }} >
                        <option value='' hidden>Select Pay Type</option>
                        <option value='p'>Partial</option>
                        <option value='f'>Full</option>
                    </select>
                </td>
                <td className='p-0'> <input type="number" className="form-control" name='recAmt' min={0} id={`recAmt-${index}`} value={rowdata.recAmt} onChange={(e) => handleChangeRowData(e, index)} onBlur={(e) => { handleBlurMethod(e, index) }} /> </td>
                <td className='p-0'> <input type="number" className="form-control" name='balAmt' value={rowdata.balAmt} disabled /> </td>
                <td className='p-0'> <input type="number" className="form-control" value={rowdata.glcode} disabled /> </td>
                <td className='p-0'>
                    <select className="form-control" name='subCostCenter' onBlur={(e) => { handleBlurMethod(e, index) }}>
                        <option hidden value=''>Select Sub CostCenter</option>
                        {
                            activeEmp.map((emp, index) =>
                                <option key={index} value={`${emp.emp_id}^${emp.emp_name}`}>{emp.emp_name}</option>)
                        }
                    </select>

                </td>
                <td className='px-0 py-1'>
                    <div className='d-flex justify-content-center align-items-center rounded-circle text-primary cursor-pointer border border-primary' style={{ height: '25px', width: '25px' }}
                        onClick={(e) => { handleDeleteRemove(e, index, 'splice') }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </td>
            </tr>
        ))
    )
}

export default SubAddCashReceipt;   
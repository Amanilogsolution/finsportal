import React from 'react'
const SubAddBankRec = ({ Bankrowdata, chartofacctlist, handleDeleteRemove,handleChangeRowData,handleBlurMethod,handleChangeChartofAcct }) => {
    return (
        Bankrowdata.map((rowdata, index) => (
            <tr key={index}>
                <td className='p-0'>
                    <select type="date" className="form-control p-0 m-0" id="check_date" onChange={(e)=>{handleChangeChartofAcct(e,index)}}>
                        <option value='' hidden>{rowdata.achead?rowdata.achead:'Select Glcode'}</option>
                        {chartofacctlist.map((gldata, index) => (
                            <option key={index} value={`${gldata.account_sub_name}^${gldata.account_sub_name_code}`}> {gldata.account_sub_name} </option>))
                        }
                    </select>
                </td>
                <td className='p-0'>  <input type="text" className="form-control " name='costCenter' value={rowdata.costCenter} onChange={(e)=>handleChangeRowData(e,index)}/> </td>
                <td className='p-0'> <input type="text" className="form-control px-1"  name='refNo' value={rowdata.refNo} onChange={(e)=>handleChangeRowData(e,index)}/> </td>
                <td className='p-0'> <input type="date" className="form-control px-1"  name='refDate' value={rowdata.refDate} onChange={(e)=>handleChangeRowData(e,index)}/> </td>
                <td className='p-0'> <input type="number" className="form-control px-1"  name='refAmt' value={rowdata.refAmt} onChange={(e)=>handleChangeRowData(e,index)} onBlur={(e)=>{handleBlurMethod(e,index)}}/> </td>
                <td className='p-0'> <input type="number" className="form-control"  name='deduction' value={rowdata.deduction} onChange={(e)=>handleChangeRowData(e,index)} onBlur={(e)=>{handleBlurMethod(e,index)}}/> </td>
                <td className='p-0'> <input type="number" className="form-control"  name='tds' value={rowdata.tds} onChange={(e)=>handleChangeRowData(e,index)} onBlur={(e)=>{handleBlurMethod(e,index)}}/> </td>
                <td className='p-0'> <input type="number" className="form-control"  name='netAmt' value={rowdata.netAmt} onChange={(e)=>handleChangeRowData(e,index)} onBlur={(e)=>{handleBlurMethod(e,index)}}/> </td>
                <td className='p-0'> <input type="text" className="form-control"  name='payType' value={rowdata.payType} onChange={(e)=>handleChangeRowData(e,index)} onBlur={(e)=>{handleBlurMethod(e,index)}}/> </td>
                <td className='p-0'> <input type="number" className="form-control"  name='recAmt' id={`recAmt-${index}`} value={rowdata.recAmt} onChange={(e)=>handleChangeRowData(e,index)} onBlur={(e)=>{handleBlurMethod(e,index)}}/> </td>
                <td className='p-0'> <input type="number" className="form-control"  name='balAmt' value={rowdata.balAmt} onChange={(e)=>handleChangeRowData(e,index)} disabled/> </td>
                <td className='px-0 py-1'>
                    <div className='d-flex justify-content-center align-items-center rounded-circle text-primary cursor-pointer border border-primary' style={{ height: '25px', width: '25px' }}
                        onClick={(e) => { handleDeleteRemove(e, index,'splice') }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </td>
            </tr>
        ))
    )
}

export default SubAddBankRec;
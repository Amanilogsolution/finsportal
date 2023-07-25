const SubBankPayment = ({ bankPayMinData, handleRemoveDeleteRow, handleChangeMiorData,handleCalculateMinorData, handleChangePayType, setCurrentindex, employeelist }) => {
    return (
        bankPayMinData.map((minordata, index) =>
            <tr key={index}>
                <td className="p-0">
                    <button type="button" style={{ height: '50px' }} className="btn border col overflow-hidden p-0" data-toggle="modal" data-target="#chartofaccountmodal"
                        onClick={() => {
                            setCurrentindex(index);
                            setTimeout(() => {
                                document.getElementById('searchChartofAcct').focus()
                            }, 700)
                        }}>

                        {minordata.achead.length > 0 ? minordata.achead : "Select Value"}
                    </button>
                </td>
                <td className="p-0">
                    <button type="button" id={`location-${index}`} className="btn border col overflow-hidden p-0" style={{ height: '50px' }} data-toggle="modal" data-target="#locationmodal"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentindex(index)
                            setTimeout(() => {
                                document.getElementById('searchLocation').focus()
                            }, 700)
                        }}
                    >
                        {minordata.costCenter.length > 0 ? minordata.costCenterName : "Select Cost Center"}
                    </button>
                </td>
                <td className="p-0"><input type="text" className="form-control " name="refNo" id={`ref_no-${index}`} value={minordata.refNo} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="date" className="form-control " name="refDate" id={`ref_date-${index}`} value={minordata.refDate} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="number" className="form-control " name="refAmt" id={`ref_amt-${index}`} value={minordata.refAmt} onChange={(e) => {handleChangeMiorData(e, index);handleCalculateMinorData('refAmt',index)}} /></td>
                {/* <td className="p-0"><input type="number" className="form-control " name="tds" value={minordata.tds} onChange={(e) => handleChangeMiorData(e, index)} /></td> */}
                {/* <td className="p-0"><input type="number" className="form-control " name="net_amt" value={minordata.net_amt} onChange={(e) => handleChangeMiorData(e, index)} /></td> */}
                <td className="p-0">
                    {/* <input type="text" className="form-control " name="pay_type" value={minordata.pay_type} onChange={(e) => handleChangeMiorData(e, index)} /> */}
                    <select className="form-control" name="pay_type" onChange={(e) => handleChangePayType(e, index)} >
                        <option hidden value={minordata.pay_type}>{minordata.pay_type.lenth > 0 ? minordata.pay_type : 'Select Pay Type'}</option>
                        <option value='partial' >Partial</option>
                        <option value='full' >Full</option>
                    </select>
                </td>
                <td className="p-0"><input type="number" className="form-control " name="amt_paid" id={`amt_paid-${index}`} value={minordata.amt_paid} onChange={(e) => {handleChangeMiorData(e, index);handleCalculateMinorData('amt_paid',index)}} /></td>
                <td className="p-0"><input type="number" className="form-control " name="amt_bal" id={`ref_bal-${index}`} value={minordata.amt_bal} disabled /></td>
                <td className="p-0"><input type="text" className="form-control " name="glcode" defaultValue={minordata.glcode} disabled /></td>
                <td className="p-0">
                    <select type="text" className="form-control " name="sub_cost_center" value={minordata.sub_cost_center} onChange={(e) => handleChangeMiorData(e, index)}>
                        <option hidden value=''>{minordata.sub_cost_center?minordata.sub_cost_center:'Select Employee'}</option>
                        {
                            employeelist.map((emp, index) =>
                                <option key={index} value={[emp.emp_id,emp.emp_name]}>{emp.emp_name}</option>
                            )
                        }
                    </select>
                </td>
                <td className="p-0">
                    <div className='d-flex justify-content-center align-items-center rounded-circle text-primary cursor-pointer border border-primary' style={{ height: '25px', width: '25px' }}
                        onClick={(e) => { handleRemoveDeleteRow(e, 'splice', index) }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </td>

            </tr>)
    )
}
export default SubBankPayment;

const SubBankPayment = ({ bankPayMinData, handleRemoveDeleteRow, handleChangeMiorData, chartofacctlist, handleChnageAcHead,setCurrentindex }) => {
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

                        {/* {JVMinorData[index].accHead.length > 0 ? JVMinorData[index].accHead : "Select Value"} */}
                    </button>
                    {/* <select className="form-control" onChange={(e) => handleChnageAcHead(e, index)}>
                        <option hidden value=''>Select Ac Head</option>
                        {chartofacctlist.map((gldata, index) => (
                            <option key={index} value={`${gldata.account_sub_name}^${gldata.account_sub_name_code}`}> {gldata.account_sub_name} </option>))
                        }
                    </select> */}
                </td>
                <td className="p-0"><input type="text" className="form-control " name="costCenter" value={minordata.costCenter} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="text" className="form-control " name="refNo" value={minordata.refNo} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="date" className="form-control " name="refDate" value={minordata.refDate} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="number" className="form-control " name="refAmt" value={minordata.refAmt} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="number" className="form-control " name="tds" value={minordata.tds} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="number" className="form-control " name="net_amt" value={minordata.net_amt} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="text" className="form-control " name="pay_type" value={minordata.pay_type} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="number" className="form-control " name="amt_paid" value={minordata.amt_paid} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="number" className="form-control " name="amt_bal" value={minordata.amt_bal} onChange={(e) => handleChangeMiorData(e, index)} /></td>
                <td className="p-0"><input type="text" className="form-control " name="glcode" defaultValue={minordata.glcode} disabled /></td>
                <td className="p-0"><input type="text" className="form-control " name="sub_cost_center" value={minordata.sub_cost_center} onChange={(e) => handleChangeMiorData(e, index)} /></td>
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
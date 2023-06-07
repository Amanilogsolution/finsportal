const SubJVoucher = ({ JVMinorData, handleDeleteRemove, handleChangeRowData, handleDrCr, setCurrentIndex, handlePassAmt }) => {
    return (
        <>
            {
                JVMinorData.map((element, index) => (

                    <tr key={index}>
                        <td className="p-0" style={{ width: "180px" }}>
                            <button type="button" style={{ height: '50px' }} className="btn border col overflow-hidden p-0" data-toggle="modal" data-target="#chartofaccountmodal"
                                onClick={() => {
                                    setCurrentIndex(index); 
                                    setTimeout(() => {
                                        document.getElementById('searchChartofAcct').focus()
                                    }, 700)
                                }}>

                                {JVMinorData[index].accHead.length > 0 ? JVMinorData[index].accHead : "Select Value"}
                            </button>
                        </td>

                        <td className="p-0" style={{ width: "180px" }}>
                            <button type="button" id={`location-${index}`} className="btn border col overflow-hidden p-0" style={{ height: '50px' }} data-toggle="modal" data-target="#locationmodal"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentIndex(index)
                                    setTimeout(() => {
                                        document.getElementById('searchLocation').focus()
                                    }, 700)
                                }}
                            >
                                {JVMinorData[index].locationName.length > 0 ? JVMinorData[index].locationName : "Select location"}
                            </button>
                        </td>

                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="text" name='ref_no' id={`ref_no-${index}`} className="form-control" value={element.ref_no} onChange={(e) => { handleChangeRowData(e, index) }} />
                        </td>
                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="date" name='ref_date' id={`ref_date-${index}`} className="form-control" value={element.ref_date} onChange={(e) => { handleChangeRowData(e, index) }} />
                        </td>
                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="number" name='ref_amt' id={`ref_amt-${index}`} className="form-control" value={element.ref_amt} onChange={(e) => { handleChangeRowData(e, index) }} />
                        </td>
                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="number" name='passAmt' id={`passAmt-${index}`} className="form-control " value={element.passAmt} onChange={(e) => { handleChangeRowData(e, index) }} onBlur={(e) => { handlePassAmt(e, index) }} />
                        </td>
                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="text" name='balanceAmt' id={`balanaceAmt-${index}`} className="form-control" defaultValue={element.balanceAmt} disabled />
                        </td>

                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="text" name='dr_cr' className="form-control text-uppercase" id={`drcr-${index}`} onBlur={(e) => { handleDrCr(index, e.target.value) }} />
                        </td>
                        <td className="p-0" style={{ width: "160px" }}>
                            <input type="text" className="form-control text-uppercase" />
                        </td>
                        <td className='px-0 py-1'>
                            <div className='d-flex justify-content-center align-items-center rounded-circle text-primary cursor-pointer border border-primary' style={{ height: '25px', width: '25px' }}
                                onClick={(e) => { handleDeleteRemove(e, 'splice', index) }}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </div>
                        </td>
                    </tr>
                ))}
        </>
    )
}

export default SubJVoucher;































// const SubJVoucher = ({ totalValues, locationstate, handlelocation, handleChangeItem, handlePassAmt, handleDrCr, jvminordata, chartofacctlist }) => {
//     return (
//         <>
//             {
//                 totalValues.map((element, index) => (

//                     <tr key={index}>
//                         <td className="p-0" style={{ width: "180px" }}>
//                             <select id={`location-${index}`} className="form-control ml-0" onChange={(e) => { handlelocation(e, index) }}>
//                                 <option value="" hidden>  Select Location   </option>
//                                 {locationstate.map((item, index) => (
//                                     <option key={index} value={[item.location_name, item.location_id]}>  {item.location_name}  </option>))
//                                 }
//                             </select>
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "180px" }}>
//                             <select id={`item-${index}`} className="form-control ml-0" onChange={(e) => { handleChangeItem(e, index) }} >
//                                 <option value="" hidden> {jvminordata[index].chartofacct.length > 0 ? jvminordata[index].chartofacct : "Select Value"} </option>
//                                 {chartofacctlist.map((items, index) => (
//                                     <option key={index} value={`${items.account_sub_name}^${items.account_sub_name_code}`}> {items.account_sub_name} </option>))
//                                 }
//                             </select>
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="text" id={`achead-${index}`} className="form-control" />
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="text" id={`invno-${index}`} className="form-control" />
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="date" id={`invdate-${index}`} className="form-control" />
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="text" id={`invamount-${index}`} className="form-control" />
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="number" id={`balamt-${index}`} className="form-control " />
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="number" id={`passamt-${index}`} className="form-control" onBlur={() => { handlePassAmt(index) }} />
//                         </td>
//                         <td className="p-1 pt-2" style={{ width: "160px" }}>
//                             <input type="text" id={`drcr-${index}`} className="form-control text-uppercase" onBlur={(e) => { handleDrCr(index, e.target.value) }} />
//                         </td>
//                     </tr>
//                 ))}
//         </>
//     )
// }

// export default SubJVoucher;
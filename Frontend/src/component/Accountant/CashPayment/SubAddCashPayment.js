import React from 'react'

const SubAddCashPayment = ({Cashrowdata,setCurrentindex,handleDeleteRemove,handleChangeRowData}) => {
    // console.log(Cashrowdata)
  return (
    Cashrowdata.map((rowdata, index) => (
        <tr key={index}>
            <td className='p-0'>
                <button type="button" style={{ height: '50px' }} id={`chartofacct-${index}`} className="btn border col overflow-hidden p-0" data-toggle="modal" data-target="#chartofaccountmodal"
                    onClick={() => {
                        setCurrentindex(index);
                        setTimeout(() => {
                            document.getElementById('searchChartofAcct').focus()
                        }, 700)
                    }}>

                    {rowdata.achead.length > 0 ? rowdata.achead : "Select Value"}
                </button>
            </td>
            <td className='p-0'>
                <button type="button" id={`location-${index}`} className="btn border col overflow-hidden p-0" style={{ height: '50px' }} data-toggle="modal" data-target="#locationmodal"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentindex(index)
                        setTimeout(() => {
                            document.getElementById('searchLocation').focus()
                        }, 700)
                    }}
                >
                    {rowdata.costCenter.length > 0 ? rowdata.costCenter : "Select Cost Center"}
                </button>

                {/* <input type="text" className="form-control " name='costCenter' value={rowdata.costCenter} onChange={(e) => handleChangeRowData(e, index)} /> */}
            </td>
            <td className='p-0'> <input type="text" className="form-control px-1" name='invNo' id={`invNo-${index}`} value={rowdata.invNo} 
            onChange={(e) => handleChangeRowData(e, index)} 

            /> </td>
            <td className='p-0'> <input type="date" className="form-control px-1" name='invDate' id={`invDate-${index}`} 
            value={rowdata.invDate} onChange={(e) => handleChangeRowData(e, index)} 

            /> </td>
            <td className='p-0'> <input type="number" className="form-control px-1" name='invAmt' id={`invAmt-${index}`} value={rowdata.invAmt}
             onChange={(e) => handleChangeRowData(e, index)} 
            //  onBlur={(e) => { handleBlurMethod(e, index) }}
              /> 
             </td>
            <td className='p-0'> <input type="number" className="form-control" name='netamt' 
            value={rowdata.netamt} onChange={(e) => handleChangeRowData(e, index)} 
            // onBlur={(e) => { handleBlurMethod(e, index) }} 

            /> </td>
              <td className='p-0'>
                <select className="form-control" name='paytype' 
                onChange={(e) => handleChangeRowData(e, index)}
                //  onBlur={(e) => { handleBlurMethod(e, index) }} 
                >
                    <option value='' hidden>Select Pay Type</option>
                    <option value='p'>Partial</option>
                    <option value='f'>Full</option>
                </select>
            </td>
            <td className='p-0'> <input type="number" className="form-control" name='amtPaid' 
            value={rowdata.amtPaid} onChange={(e) => handleChangeRowData(e, index)} 
            // onBlur={(e) => { handleBlurMethod(e, index) }} 

            /> </td>
            <td className='p-0'> <input type="number" className="form-control" name='amtbal' 
            value={rowdata.amtbal} onChange={(e) => handleChangeRowData(e, index)} disabled
            // onBlur={(e) => { handleBlurMethod(e, index) }} 

            /> </td>
          
            <td className='p-0'> <input type="number" className="form-control" name='glcode' id={`recAmt-${index}`} value={rowdata.glcode} disabled
            // onChange={(e) => handleChangeRowData(e, index)} onBlur={(e) => { handleBlurMethod(e, index) }} 

            /> </td>
            <td className='p-0'> <input type="number" className="form-control" name='balAmt' 
            // value={rowdata.balAmt} onChange={(e) => handleChangeRowData(e, index)} disabled 
            /> </td>
            <td className='px-0 py-1'>
                <div className='d-flex justify-content-center align-items-center rounded-circle text-primary cursor-pointer border border-primary' style={{ height: '25px', width: '25px' }}
                    onClick={(e) => { handleDeleteRemove(e, index, 'splice') }}
                    >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
            </td>
        </tr>
    ))
  )
}

export default SubAddCashPayment
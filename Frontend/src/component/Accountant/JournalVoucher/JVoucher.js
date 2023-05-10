import React, { useState, useEffect } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import LoadingPage from '../../loadingPage/loadingPage';


function JVoucher() {
    const [loading, setLoading] = useState(true)
    const [totalValues, setTotalValues] = useState([1,1])

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])  
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        if (newvalue.length === 1) {
            setTotalValues(newvalue)
        } else {
            newvalue.pop()
            setTotalValues(newvalue)
        }
    }

  return (
    <>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <div className="content-wrapper">
                            <div className="container-fluid">
                                <h3 className="pt-3 pb-2 pl-5"> New Journal Voucher</h3>
                                <div className="card">
                                    <article className="card-body" >
                                        <form autoComplete="off">
                                            <div className="form-row ">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Date <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                <input type="date" className="form-control col-md-10" id="po_no" placeholder=""  />

                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >JV ID <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                <input type="text" className="form-control col-md-10 " id="po_no" placeholder=""  />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Journal Type <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                <input type="checkbox" className="" id="po_no" placeholder=""  />

                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Currency <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="polocation"
                                                        className="form-control col-md-4">
                                                        <option value='' hidden>Select Currency</option>
                                                       
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Account</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Contact</th>
                                                        <th scope="col">Debits</th>
                                                        <th scope="col">Credits</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        totalValues.map((element, index) => (
                                                            <tr key={index}>
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <select id={`location-${index}`} className="form-control ml-0" >
                                                                        <option value='' hidden>Select Location</option>
                                                                        
                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <select id={`item-${index}`} className="form-control ml-0" >
                                                                        <option value='' hidden>Select Item</option>
                             
                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`quantity-${index}`}  className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`rate-${index}`}  className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`amount-${index}`} className="form-control cursor-notallow"  />
                                                                </td>
                                                                
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                            <button className="btn btn-danger" onClick={handleRemove}>Remove</button>
                                        </form>
                                    </article>
                                    <div className='d-flex mb-2'>
                                       <div style={{ width: "40%" }}>
                                                    <div className="form ">
                                                        <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="3" id="remarks" placeholder="Remarks" style={{ resize: "none" }}></textarea>
                                                        </div>
                                                    </div> 
                                        </div>
                                        <div className='rounded py-1 px-2' style={{ width: "55%" }}>
                                            <table className='w-100'>
                                                <tbody>
                                                    <tr>
                                                        <td>SubTotal </td>
                                                        <td id="Subtotal"> <span id="subtotalval">0</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h4 id='subtotalbtn'>Total</h4> </td>
                                                        <td id="Subtotal"> <span id="subtotalval">0</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-danger'>Difference </td>
                                                        <td id="Subtotal"> <span id="subtotalval">0</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="card-footer border-top">
                                        {/* <button id="save" name="save" className="btn btn-danger" onClick={() => { handleSubmit('save') }}>Save</button> */}
                                        {/* <button id="post" name="save" className="btn btn-danger ml-2" onClick={() => { handleSubmit('post') }}>Post</button> */}
                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }} name="clear" className="btn btn-secondary ml-2">Cancel</button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview JV</button>
                                    </div>
                                    {/* <Preview data={poalldetail} Allitems={poitem} /> */}

                                </div>
                            </div>
                        </div>
                        : <LoadingPage />
                }

                <Footer />
            </div>
        </>
  )
}

export default JVoucher

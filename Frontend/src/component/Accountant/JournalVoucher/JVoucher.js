import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveLocationAddress, ActivePurchesItems,Getfincialyearid } from "../../../api/index";

function JVoucher() {
  const [loading, setLoading] = useState(true);
  const [totalValues, setTotalValues] = useState([1, 1]);
  const [locationstate, setLocationstate] = useState([]);
  const [itemlist, setItemlist] = useState([]);
  const [pocount, setPOcount] = useState(0)


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Organisation");
      const locatonstateres = await ActiveLocationAddress(org);
      setLocationstate(locatonstateres);
      const items = await ActivePurchesItems(org);
      setItemlist(items);
      const id = await Getfincialyearid(org)
      const lastno = Number(id[0].jv_count) + 1
      setPOcount(lastno)
      document.getElementById('po_no').value = id[0].jv_ser + id[0].year + String(lastno).padStart(5, '0')
      Todaydate();
    };
    fetchdata();
  }, []);

  const Todaydate = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    document.getElementById("po_date").defaultValue = today;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setTotalValues([...totalValues, 1]);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    var newvalue = [...totalValues];
    if (newvalue.length === 1) {
      setTotalValues(newvalue);
    } else {
      newvalue.pop();
      setTotalValues(newvalue);
    }
  };

  const handleChangeItem = (e)=>{
    e.preventDefault();
      let val = e.target.value;
        let item_arr = val.split('^')
        const itemname = item_arr[0]
        const glcode = item_arr[1]
        console.log(itemname,glcode)
        if(itemname == 'Bill'){
          
          document.getElementById('SelectVendor').style.display = 'block'
        }
  }

  const handleOpenInvoice = (e) =>{
    e.preventDefault()
    document.getElementById('SelectVendor').style.display = 'none'

  }

  return (
    <>
      <div className="wrapper">
        <Header />
        {loading ? (
          <div className="content-wrapper">
            <div className="container-fluid">
              <h3 className="pt-3 pb-2 pl-5"> New Journal Voucher</h3>
              <div className="card">
                <article className="card-body">
                  <form autoComplete="off">
                    <div className="form-row ">
                      <label
                        htmlFor="ac_name"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        JV Date <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="d-flex col-md-4">
                        <input
                          type="date"
                          className="form-control col-md-10"
                          id="po_date"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <label
                        htmlFor="ac_name"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        JV ID <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="d-flex col-md-4">
                        <input
                          type="text"
                          className="form-control col-md-10 "
                          id="po_no"
                          placeholder=""
                        />
                      </div>
                    </div>
                    {/* <div className="form-row mt-2">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Journal Type <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                <input type="checkbox" className="" id="po_no" placeholder=""  />

                                                </div>
                                            </div> */}
                    {/* <div className="form-row mt-2">
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Currency <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="polocation"
                                                        className="form-control col-md-4">
                                                        <option value='' hidden>Select Currency</option>
                                                       
                                                    </select>
                                                </div>
                                            </div> */}
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th scope="col">Location</th>
                          <th scope="col">Items</th>
                          <th scope="col">AcHead</th>
                          <th scope="col">Inv No</th>
                          <th scope="col">Inv Date</th>
                          <th scope="col">Inv Amount</th>
                          <th scope="col">Balance Amount</th>
                          <th scope="col">PassAmt</th>
                          <th scope="col">DR/CR</th>
                        </tr>
                      </thead>
                      <tbody>
              
                        {
                          totalValues.map((element, index) => (
                            
                          <tr key={index}>
                            <td className="p-1 pt-2" style={{ width: "180px" }}>
                              <select
                                id={`location-${index}`}
                                className="form-control ml-0"
                              >
                                <option value="" hidden>
                                  Select Location
                                </option>
                                {locationstate.map((item, index) => (
                                  <option
                                    key={index}
                                    value={item.location_name}
                                  >
                                    {item.location_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="p-1 pt-2" style={{ width: "180px" }}>
                              <select id={`item-${index}`} className="form-control ml-0" onChange={handleChangeItem}>
                                <option value="" hidden>
                                  Select Item
                                </option>
                                {itemlist.map((items, index) => (
                                  <option
                                    key={index}
                                    value={`${items.item_name}^${items.glcode}`}
                                  >
                                    {items.item_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`quantity-${index}`}
                                className="form-control"
                              />
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`rate-${index}`}
                                className="form-control"
                              />
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`amount-${index}`}
                                className="form-control"
                              />
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`amount-${index}`}
                                className="form-control "
                              />
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`amount-${index}`}
                                className="form-control "
                              />
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`amount-${index}`}
                                className="form-control "
                              />
                            </td>
                            <td className="p-1 pt-2" style={{ width: "160px" }}>
                              <input
                                type="number"
                                id={`amount-${index}`}
                                className="form-control "
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={handleAdd}>
                      Add Item
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={handleRemove}>
                      Remove
                    </button>
                  </form>
                </article>
                <div className="d-flex mb-2">
                  <div style={{ width: "40%" }}>
                    <div className="form ">
                      <label
                        htmlFor="remarks"
                        className="col-md-7 col-form-label font-weight-normal"
                      >
                        Remarks
                      </label>
                      <div className="d-flex col-md">
                        <textarea
                          type="text"
                          className="form-control "
                          rows="3"
                          id="remarks"
                          placeholder="Remarks"
                          style={{ resize: "none" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="rounded py-1 px-2" style={{ width: "55%" }}>
                    <table className="w-100">
                      <tbody>
                        <tr>
                          <td>SubTotal </td>
                          <td id="Subtotal">
                            <span id="subtotalval">0</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h4 id="subtotalbtn">Total</h4>
                          </td>
                          <td id="Subtotal"> 
                            <span id="subtotalval">0</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-danger">Difference </td>
                          <td id="Subtotal">
                            <span id="subtotalval">0</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card-footer border-top">
                  {/* <button id="save" name="save" className="btn btn-danger" onClick={() => { handleSubmit('save') }}>Save</button> */}
                  {/* <button id="post" name="save" className="btn btn-danger ml-2" onClick={() => { handleSubmit('post') }}>Post</button> */}
                  <button
                    id="clear"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/home";
                    }}
                    name="clear"
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-2"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Preview JV
                  </button>
                </div>
                {/* <Preview data={poalldetail} Allitems={poitem} /> */}
              </div>
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}

        <Footer />


        <div class="" id="SelectVendor" style={{marginTop:"-50%", backdropFilter:"blur(2px)",width:"100vw",height:"100vh",display:"none"}} tabindex="-1" role="dialog">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Customer / Vendor</h5>
                                        </div>
                                        <div className="modal-body">

                                            
                                        </div>
                                        <div className="modal-footer">
                                          
                                        <button type="button" class="btn btn-primary" onClick={handleOpenInvoice}>Save changes</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>

        
      </div>
    </>
  );
}

export default JVoucher;

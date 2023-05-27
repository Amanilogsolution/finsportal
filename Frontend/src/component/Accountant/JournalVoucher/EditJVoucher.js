import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { GetJV } from "../../../api/index";


function EditJVoucher() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
          const org = localStorage.getItem("Organisation");
          const jvNo = localStorage.getItem("jvNo")
          const data = await GetJV(org,jvNo)
          setData(data)
          console.log(data)
          
    
        
    
          setLoading(true)

        };
        fetchdata();
      }, []);

  return (
    <div className="wrapper position-relative">
    <Header />
    {loading ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <h3 className="pt-3 pb-2 pl-5"> Edit Journal Voucher</h3>
          <div className="card">
            <article className="card-body">
              <form autoComplete="off">
                <div className="form-row ">
                  <label htmlFor="jv_date" className="col-md-2 col-form-label font-weight-normal" > JV Date <span className="text-danger">*</span></label>
                  <div className="d-flex col-md-4"><input type="date" className="form-control col-md-10" id="jv_date" value={data[0]["Jv_date"]}/></div>
                </div>
                <div className="form-row mt-2">
                  <label htmlFor="jv_no" className="col-md-2 col-form-label font-weight-normal">  JV ID <span className="text-danger">*</span></label>
                  <div className="d-flex col-md-4"> <input type="text" className="form-control col-md-10 " id="jv_no" disabled  value={data[0]["jv_no"]} /></div>
                </div>
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Location</th>
                      <th scope="col">Items</th>
                      <th scope="col">AcHead</th>
                      <th scope="col">Ref No</th>
                      <th scope="col">Ref Date</th>
                      <th scope="col">Ref Amount</th>
                      <th scope="col">Balance Amount</th>
                      <th scope="col">PassAmt</th>
                      <th scope="col">DR/CR</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                        data.map((element, index) => (

                        <tr key={index}>
                          <td className="p-1 pt-2" style={{ width: "180px" }}>
                            <select id={`location-${index}`} className="form-control ml-0" >
                              <option value="" hidden>{element.location}</option>
                              
                            </select>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "180px" }}>
                            <select id={`item-${index}`} className="form-control ml-0" >
                              <option value="" hidden>{element.charge_code}  </option>
                             
                            </select>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="text" id={`achead-${index}`} className="form-control" value={element.account_head}/>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="text" id={`invno-${index}`} className="form-control" value={element.Ref_date} />
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="date" id={`invdate-${index}`} className="form-control" value={element.ref_date}/>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="text" id={`invamount-${index}`} className="form-control" value={element.amt}/>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="number" id={`balamt-${index}`} className="form-control " value={element.amt_bal}/>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="number" id={`passamt-${index}`} className="form-control"  value={element.amt_receive}/>
                          </td>
                          <td className="p-1 pt-2" style={{ width: "160px" }}>
                            <input type="text" id={`drcr-${index}`} className="form-control text-uppercase" value={element.dr_cr} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                &nbsp;
                <div className="d-flex mb-2 justify-content-between">
                  <div style={{ width: "40%" }}>
                    <div className="form ">
                      <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
                      <div className="d-flex col-md">
                        <textarea type="text" className="form-control " rows="3"
                          id="remarks" placeholder="Remarks" value={data[0]["narration"]} style={{ resize: "none" }}></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="rounded py-1 px-2" style={{ width: "50%", background: '#eee' }}>
                    <table className="w-100">
                      <tbody>
                        <tr>
                          <td>Total CR</td>
                          <td id="Subtotal"> <span id="totalcrval">0</span> </td>
                        </tr>
                        <tr>
                          <td> Total DR</td>
                          <td id="Subtotal"> <span id="totaldrval">0</span> </td>
                        </tr>
                        <tr>
                          <td className="text-danger">Difference </td>
                          <td id="Subtotal"> <span id="difference">0</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </article>

            <div className="card-footer border-top">
              <button id="save" name="save" className="btn btn-danger" >Edit</button>
              <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
              <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#JvPreviewModal"  > Preview JV </button>
            </div>

          </div>
        </div>
      </div>
    ) : (
      <LoadingPage />
    )}

    <Footer />
  
  </div>

  )
}

export default EditJVoucher

import React, { useEffect,useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {showBank,updateBank} from '../../../api'

const EditBank = () => {
    const [data,setData] = useState({})
    const[type,setType] = useState()

    useEffect( async()=>{
        const result = await showBank(localStorage.getItem('BankSno'));
        setData(result)
        if(result.ac_type == 'Saving'){
            document.getElementById('Saving').checked = true

            setType('Saving')
        }
        else if(result.ac_type == 'Current'){
            document.getElementById('Current').checked = true
            setType('Fixed')
        }
        else{}
    },[])

    const handleClick = async(e) => {
        e.preventDefault();
        const account_code = document.getElementById('account_code').value;
        const account_no = document.getElementById('account_no').value;
        const address_line1 = document.getElementById('address_line1').value;
        const address_line2 = document.getElementById('address_line2').value;
        // const branch = document.getElementById('branch').value;
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const pincode = document.getElementById('pincode').value;
        const ifsc_code = document.getElementById('ifsc_code').value;
        // const glcode = document.getElementById('glcode').value;
        const bank_name = document.getElementById('bank_name').value;
        const acname = document.getElementById('acname').value;
        // const company_id = document.getElementById('company_id').value;
        const description = document.getElementById('description').value;

        const result = await updateBank(localStorage.getItem('BankSno'),account_code,account_no,type,bank_name,address_line1,address_line2,state,city,pincode,ifsc_code,acname,description);
        if(result){
            window.location.href = '/TotalBank'
        }

    }

 
    const handleChangesubcode = (e) => {
        setData({...data,account_code:e.target.value})
    }
    const handleChangebankname = (e) => {
        setData({...data,bank_name:e.target.value})
    }
    const handleChangeacno = (e) => {
        setData({...data,account_no:e.target.value})
    }
    const handleChangeaddrline1 = (e) => {
        setData({...data,address_line1:e.target.value})
    }
    const handleChangeaddrline2 = (e) => {
        setData({...data,address_line2:e.target.value})
    }
    
    const handleChangestate = (e) => {
        setData({...data,state:e.target.value})
    }
    const handleChangecity = (e) => {
        setData({...data,city:e.target.value})
    }
    const handleChangepincode = (e) => {
        setData({...data,pincode:e.target.value})
    }
    const handleChangeifsc = (e) => {
        setData({...data,ifsc_code:e.target.value})
    }
  
    const handleChangeacname = (e) => {
        setData({...data,acname:e.target.value})
    }
  const handleChangeDiscription = (e) => {
    setData({...data,description:e.target.value})
  }



    const handleChange = (e) => {
         let value = e.target.value;
            setType(value)
    }

    return (
        <div>
        <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
            <div className="spinner-border" role="status"> </div>
          </div>
          <Header />
          <Menu />
          <div>
            <div className="content-wrapper">
              <div className="container-fluid">
                <br /> <h3 className="text-left ml-5">Edit Bank</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                          {/* <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Id</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='bank_id' value={data.bank_id} placeholder onChange={(e)=> handleChangebankid(e)}/>
                            </div> */}
                            {/* form-group end.// */}
                          {/* </div> */}
                          <div className="form-row"onChange={handleChange}>
                              <div className="col form-group" >
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Select Account type</label>

                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"  type="radio"
                                    name="taxpreference"
                                    value="Bank"  
                                  />Bank
                                </label>
                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="taxpreference"
                                    value="CreditCard" 
                                  />Credit Card
                                </label>
                              </div>
                            </div>
                            <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='acname'  placeholder value={data.acname} onChange={(e)=>handleChangeacname(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='account_code' value={data.account_code} placeholder onChange={(e)=> handleChangesubcode(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Number</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='account_no' value={data.account_no}  placeholder onChange={(e)=> handleChangeacno(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

  
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='bank_name' value={data.bank_name}  placeholder onChange={(e)=> handleChangebankname(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">IFSC Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='ifsc_code'  placeholder value={data.ifsc_code} onChange={(e)=>handleChangeifsc(e)} />
                            </div>
                            {/* form-group end.// */}
                          </div>

                       

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line1 </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='address_line1' value={data.address_line1}  placeholder onChange={(e)=> handleChangeaddrline1(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line2 </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='address_line2' value={data.address_line2}  placeholder onChange={(e)=>handleChangeaddrline2(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                 
                            {/* form-group end.// */}
                         

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='state'  placeholder value={data.state} onChange={(e)=>handleChangestate(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='city'  placeholder value={data.city} onChange={(e)=>handleChangecity(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='pincode'  placeholder value={data.pincode} onChange={(e)=>handleChangepincode(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          

                          
                            {/* form-group end.// */}
                          
  
                        
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Description</label>
                            <div className="col form-group">
                            <textarea class="form-control col-md-4" id="description" value={data.description}rows="3" onChange={(e)=>handleChangeDiscription(e)}></textarea>
                            </div>
                            {/* form-group end.// */}
                          </div>
    
                          

                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Update</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ShowState"}}>Cancel</button>
                      </div>
                    </div>
                    {/* card.// */}
                  </div>
                  {/* col.//*/}
                </div>
                {/* row.//*/}
              </div>   
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  
}
export default EditBank
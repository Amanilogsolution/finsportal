import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showBank, updateBank,Activecountries, showactivestate, getCity } from '../../../api'

const EditBank = () => {
  const [data, setData] = useState({})
  const [countrylist,setCountrylist]= useState([])
  const [statelist,setStatelist]= useState([])
  const [citylist,setCitylist]= useState([])
  const [type, setType] = useState('')

  useEffect(async () => {
    const result = await showBank(localStorage.getItem('BankSno'), localStorage.getItem('Organisation'));
    setData(result)
    if (result.ac_type === 'Saving') {
      document.getElementById('Saving').checked = true
      setType('Saving')
    }
    else if (result.ac_type === 'Current') {
      document.getElementById('Current').checked = true
      setType('Fixed')
    }
    else{
      setType(result.ac_type)
    }
  
    
    const country= await Activecountries();
    setCountrylist(country)
    const state= await showactivestate(result.country)
    setStatelist(state)
    const city = await getCity(result.state)

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const account_code = document.getElementById('account_code').value;
    const account_no = document.getElementById('account_no').value;
    const address_line1 = document.getElementById('address_line1').value;
    const address_line2 = document.getElementById('address_line2').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const ifsc_code = document.getElementById('ifsc_code').value;
    const bank_name = document.getElementById('bank_name').value;
    const acname = document.getElementById('acname').value;
    const description = document.getElementById('description').value;
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');

    const result = await updateBank(localStorage.getItem('BankSno'), account_code, account_no, type, bank_name, address_line1, address_line2, country,state, city, pincode, ifsc_code, acname, description, org, User_id);
    if (result) {
      window.location.href = '/TotalBank'
    }
    else{
      alert('Server Error');
    }

  }


  const handleChangesubcode = (e) => {
    setData({ ...data, account_code: e.target.value })
  }
  const handleChangebankname = (e) => {
    setData({ ...data, bank_name: e.target.value })
  }
  const handleChangeacno = (e) => {
    setData({ ...data, account_no: e.target.value })
  }
  const handleChangeaddrline1 = (e) => {
    setData({ ...data, address_line1: e.target.value })
  }
  const handleChangeaddrline2 = (e) => {
    setData({ ...data, address_line2: e.target.value })
  }
  

  const handlecountry=async(e)=>{
    const countryname= e.target.value;
    setData({ ...data, country: countryname})
    const states= await showactivestate(countryname);
    setStatelist(states)
  }

  const handleChangestate = (e) => {
    setData({ ...data, state: e.target.value })
  }
  const handleChangecity = (e) => {
    setData({ ...data, city: e.target.value })
  }
  const handleChangepincode = (e) => {
    const no=  e.target.value;
    if(no.length === 7) return false;
    setData({ ...data, pincode:no })
  }
  const handleChangeifsc = (e) => {
    setData({ ...data, ifsc_code: e.target.value })
  }

  const handleChangeacname = (e) => {
    setData({ ...data, acname: e.target.value })
  }
  const handleChangeDiscription = (e) => {
    setData({ ...data, description: e.target.value })
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
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Bank</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row" onChange={handleChange}>
                          <div className="col form-group" >
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Select Account type</label>

                            <label className="form-check form-check-inline">
                              <input
                                className="form-check-input" type="radio"
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
                            <input type="text" className="form-control col-md-4" id='acname'  value={data.acname} onChange={handleChangeacname} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='account_code' value={data.account_code}  onChange={handleChangesubcode} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Number</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='account_no' value={data.account_no}  onChange={handleChangeacno} />
                          </div>
                        </div>



                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='bank_name' value={data.bank_name}  onChange={handleChangebankname} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">IFSC Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='ifsc_code'  value={data.ifsc_code} onChange={handleChangeifsc} />
                          </div>
                        </div>



                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line1 </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='address_line1' value={data.address_line1}  onChange={handleChangeaddrline1} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line2 </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='address_line2' value={data.address_line2}  onChange={handleChangeaddrline2} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="branch" className="col-md-2 col-form-label font-weight-normal">Branch </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='branch' value={data.branch}  onChange={handleChangeaddrline2} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="country" className="col-md-2 col-form-label font-weight-normal">Country </label>
                          <div className="col form-group">
                            <select className="form-control col-md-4" id='country' onChange={handlecountry} >
                            <option value={data.country} hidden>{data.country}</option>
                            {
                              countrylist.map((item,index)=>
                              <option key={index} value={item.country_name}>{item.country_name}</option>)
                            }
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="state" className="col-md-2 col-form-label font-weight-normal">State </label>
                          <div className="col form-group">
                            <select type="text" className="form-control col-md-4" id='state' onChange={handleChangestate} >
                            <option value={data.state} hidden>{data.state}</option>
                            {
                              statelist.map((item,index)=>
                              <option key={index}>{item.state_name}</option>)
                            }
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="city" className="col-md-2 col-form-label font-weight-normal">City</label>
                          <div className="col form-group">
                            <select className="form-control col-md-4" id='city' onChange={handleChangecity} >
                            <option value={data.city} hidden>{data.city}</option>
                            {
                              citylist.map((index,item)=>
                              <option key={index} value={item.city_name}>{item.city_name}</option>)
                            }
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='pincode'  value={data.pincode} onChange={handleChangepincode} />
                          </div>
                        </div>


                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Description</label>
                          <div className="col form-group">
                            <textarea className="form-control col-md-4" id="description" value={data.description} rows="3" onChange={handleChangeDiscription}></textarea>
                          </div>
                        </div>


                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )

}
export default EditBank
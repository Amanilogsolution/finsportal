import React, {useEffect, useState } from "react";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Activecountries,showactivestate, getCity,VendorId,VendInsertAddress} from '../../../api';


 const AddVendAddress =() =>  {
    const[getVendID,setVendId] = useState([]);
    const [billing_address_country, setBilling_address_country] = useState();
    const [selectState,setSelectState] = useState([]);
    const [selectedCountry,setSelectedCountry] = useState([]);
    const [billing_address_city, setBilling_address_city] = useState();
    const [selectCity,setSelectCity] = useState([]);
    const [billing_address_state, setBilling_address_state] = useState();
    const [cust_id,setCust_id] = useState();

    
  useEffect(async() => {
    const result = await Activecountries()
    // console.log(result)
    setSelectedCountry(result)
    const dataId = await VendorId(localStorage.getItem('Organisation'))
    setVendId(dataId)
    console.log(dataId)
  }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        
        const billing_address_gstno = document.getElementById('billing_address_gstno').value;
        const billing_address_attention = document.getElementById('billing_address_attention').value;
        const billing_address_pincode = document.getElementById('billing_address_pincode').value;
        const billing_address_phone = document.getElementById('billing_address_phone').value;
        const billing_address_fax = document.getElementById('billing_address_fax').value;
        const org= localStorage.getItem('Organisation');
        const User_id=localStorage.getItem('User_id');
       
        // console.log(getVendID,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax)
        if(!billing_address_country || !billing_address_city || !billing_address_state || !billing_address_pincode|| !billing_address_phone)
        {
            alert("Please! enter the data.")
        }
        else{
        const result = await VendInsertAddress(cust_id,billing_address_gstno,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,org,User_id)
        console.log(result)
          window.location.href = 'TotalVendAddress'
        }
        
    }


    const handleChangeCID= async(e) => {
        let data = e.target.value;
        setCust_id(data);
    }


    const handleAddressCountry = async(e) => {
        let data = e.target.value;
        setBilling_address_country(data);
        const statesresult = await showactivestate(data)
        // console.log(statesresult)
        setSelectState(statesresult)
      }
      const handleAddressCity = async(e) => {
        let data = e.target.value;
        setBilling_address_city(data);
      }
      const handleChangebillingState = async(e) => {
        let data = e.target.value;
        setBilling_address_state(data);
        const result = await getCity(data)
        setSelectCity(result)
        // console.log(result)
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
                <br /> <h3 className="text-left ml-5">Add Address</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                        <div className="Address mt-3" id="addressdiv">
                          <div
                            className="Address_left"
                            style={{ width: "50%", float: "left" }}
                          >
                            <label>BILLING ADDRESS</label>
                            <div className="form-row">
                              <label
                                htmlFor="inputState"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                               Vendor ID
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="inputState"
                                  className="form-control"
                                  onChange={handleChangeCID}
                                >
                                  <option selected hidden> Select</option>
                                  {
                                getVendID.map((data) => (
                                    <option value={data.vend_id}>{data.vend_id}</option>
                                ))
                                
                              }

                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="billing_address_gstno"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                GST NO.
                              </label>
                              <div className="col form-group">
                                <input type="text"
                                  className="form-control col-md-7"
                                  placeholder
                                  id="billing_address_gstno"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="billing_address_attention"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Attention
                              </label>
                              <div className="col form-group">
                                <input type="text"
                                  className="form-control col-md-7"
                                  placeholder
                                  id="billing_address_attention"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="inputState"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Country / Region
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="inputState"
                                  className="form-control"
                                  onChange={handleAddressCountry}
                                >
                                  <option selected hidden> Select</option>
                                  {
                                selectedCountry.map((data) => (
                                    <option value={data.country_name}>{data.country_name}</option>
                                ))
                                
                              }

                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                State
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="inputState"
                                  className="form-control"
                                  onChange={handleChangebillingState}
                                >
                                  <option selected hidden> Choose</option>
                                  {
                                    selectState.map((data) => (
                                      <option value={data.state_name}>{data.state_name}</option>
                                    ))
                                  }
                                </select>
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="inputState"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                City
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="inputState"
                                  className="form-control"
                                  onChange={handleAddressCity}
                                >
                                  <option selected hidden> Choose</option>
                                  {
                                selectCity.map((data) => (
                                    <option value={data.city_name}>{data.city_name}</option>
                                ))
                                
                              }

                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>

                           
                            <div className="form-row">
                              <label
                                htmlFor="billing_address_pincode"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Zip Code
                              </label>
                              <div className="col form-group">
                                <input
                                  type="number"
                                  className="form-control col-md-7"
                                  placeholder
                                  id="billing_address_pincode"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="billing_address_phone"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Phone
                              </label>
                              <div className="col form-group">
                                <input
                                  type="number"
                                  className="form-control col-md-7"
                                  placeholder
                                  id="billing_address_phone"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="billing_address_fax"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Fax
                              </label>
                              <div className="col form-group">
                                <input
                                  type="text"
                                  className="form-control col-md-7"
                                  placeholder
                                  id="billing_address_fax"
                                />
                              </div>
                            </div>
                          </div>
  
                       
                                  </div>
                       
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Save</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./TotalVendAddress"}}>Cancel</button>
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


export default AddVendAddress

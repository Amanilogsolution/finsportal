import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Totalcountry, showactivestate, getCity, ActiveCustomer, CustInsertAddress, Activecountries } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';


const AddCustAddress = () => {
  const [loading, setLoading] = useState(false)

  const [getCustID, setGetCustId] = useState([]);
  const [billing_address_country, setBilling_address_country] = useState();
  const [selectState, setSelectState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [billing_address_state, setBilling_address_state] = useState();
  const [zipcount, setZipcount] = useState()
  const [phonecount, setPhonecount] = useState()
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Activecountries()
      setSelectedCountry(result)
      const customerlist = await ActiveCustomer(localStorage.getItem('Organisation'))
      setGetCustId(customerlist)
      setLoading(true)
    }
    fetchdata()
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)

    let custid = document.getElementById('custname');
    const custname = custid.options[custid.selectedIndex].text;
    custid = custid.value;
    const gst_no = document.getElementById('gst_no').value;
    const billing_address_attention = document.getElementById('billing_address_attention').value;
    const billing_address_city = document.getElementById('inputcity').value;
    const billing_address_pincode = document.getElementById('billing_address_pincode').value;
    const billing_address_phone = document.getElementById('billing_address_phone').value;
    const billing_address_fax = document.getElementById('billing_address_fax').value;
    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')

    const custnamrchar = custname.substring(0, 3);
    const citychar = billing_address_city.substring(0, 3);
    const custaddid = custnamrchar.toUpperCase() + citychar.toUpperCase() + Math.floor(Math.random() * 100000);


    if (!custname || !billing_address_country || !billing_address_state || !billing_address_city || !billing_address_phone || !billing_address_pincode) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await CustInsertAddress(org, User_id, custid, custname, gst_no, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, custaddid)
      setLoading(true)
      if (result[0] > 0) {
        setAlertObj({ type: 'success', text: 'Data Added', url: '/TotalCustAddress' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
  }



  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    setBilling_address_country(data);
    const statesresult = await showactivestate(data)
    setSelectState(statesresult)
  }

  const handleChangebillingState = async (e) => {
    let data = e.target.value;
    setBilling_address_state(data);
    const result = await getCity(data)
    setSelectCity(result)
  }

  return (
    <div className="wrapper">

      <Header />
      {
        loading ?
          <div className="content-wrapper">
            <div className="container-fluid ">
              <h3 className=" ml-5 py-3">Add Address</h3>
              <div className="card mb-0 mb-2">
                <article className="card-body ">
                  <form autoComplete="off">
                    <div className="Address_left" >
                      <label>BILLING ADDRESS</label>
                      <div className="form-row">
                        <label htmlFor="custname" className="col-md-2 col-form-label font-weight-normal"> Customer ID <span className="text-danger">*</span></label>
                        <div className="col-md-4 form-group">
                          <select id="custname" className="form-control ">
                            <option value='' hidden> Select Customer</option>
                            {
                              getCustID.map((data, index) => (
                                <option key={index} value={data.cust_id} >{data.cust_name}</option>
                              ))

                            }
                          </select>
                        </div>
                        <label htmlFor="gst_no" className="col-md-2 col-form-label text-center font-weight-normal">GST No</label>
                        <div className="col-md-4 form-group">
                          <input type="text" className="form-control col " id="gst_no" />
                        </div>

                      </div>
                      
                      <div className="form-row">
                        <label htmlFor="billing_address_attention" className="col-md-2 col-form-label font-weight-normal" >  Attention/Address </label>
                        <div className="col-md-4 form-group">
                          <input type="text" className="form-control col" id="billing_address_attention" />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="inputState" className="col-md-2 col-form-label font-weight-normal"> Country / Region   <span className="text-danger">*</span></label>
                        <div className="col-md-4 form-group">
                          <select id="inputState" className="form-control" onChange={handleAddressCountry}>
                            <option hidden value=''> Select Country</option>
                            {
                              selectedCountry.map((data, index) => (
                                <option key={index} value={data.country_name}>{data.country_name}</option>
                              ))

                            }

                          </select>
                        </div>
                        <label htmlFor="user_name" className="col-md-2 col-form-label text-center font-weight-normal" > State  <span className="text-danger">*</span> </label>
                        <div className="col-md-4 form-group">
                          <select id="inputState" className="form-control " onChange={handleChangebillingState}>
                            <option hidden value=''> Select state</option>
                            {
                              selectState.map((data, index) => (
                                <option key={index} value={data.state_name}>{data.state_name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                    
                      <div className="form-row">
                        <label htmlFor="inputcity" className="col-md-2 col-form-label font-weight-normal" >  City  <span className="text-danger">*</span></label>
                        <div className="col-md-4 form-group">
                          <select id="inputcity" className="form-control"  >
                            <option hidden value=''> Select City</option>
                            {
                              selectCity.map((data, index) => (
                                <option key={index} value={data.city_name}>{data.city_name}</option>
                              ))
                            }
                          </select>
                        </div>
                        <label htmlFor="billing_address_pincode" className="col-md-2 text-center col-form-label font-weight-normal" > Zip Code <span className="text-danger">*</span> </label>
                        <div className="col-md-4 form-group">
                          <input type="number" className="form-control col" id="billing_address_pincode" value={zipcount}
                            onChange={(e) => {
                              if (e.target.value.length >= 7) return false;
                              setZipcount(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    
                      <div className="form-row">
                        <label htmlFor="billing_address_phone" className="col-md-2 col-form-label font-weight-normal" > Phone <span className="text-danger">*</span></label>
                        <div className="col-md-4 form-group">
                          <input type="number" className="form-control col-md" id="billing_address_phone" value={phonecount}
                            onChange={(e) => {
                              if (e.target.value.length >= 11) return false;
                              setPhonecount(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="billing_address_fax" className="col-md-2 col-form-label font-weight-normal" >  Fax</label>
                        <div className="col-md-4 form-group">
                          <input type="text" className="form-control col" id="billing_address_fax" />
                        </div>
                      </div>
                    </div>
                  </form>
                </article>

                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick} >Add Address</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./TotalCustAddress" }}>Cancel</button>
                </div>
              </div>
            </div>
            {
              alertObj.type ? <AlertsComp data={alertObj} /> : null
            }
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )
}


export default AddCustAddress

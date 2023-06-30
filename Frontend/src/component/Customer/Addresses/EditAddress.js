import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { CustAddress, EditCustAddress, Totalcountry, showactivestate, getCity } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';


const EditAddress = () => {
  const [loading, setLoading] = useState(false)
  const [billing_address_country, setBilling_address_country] = useState();
  const [selectState, setSelectState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [billing_address_city, setBilling_address_city] = useState();
  const [selectCity, setSelectCity] = useState([]);
  const [billing_address_state, setBilling_address_state] = useState();
  const [data, setData] = useState({})
  const [cust_id, setCust_id] = useState()
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const data = await CustAddress(localStorage.getItem('EditAddress'), localStorage.getItem("Organisation"))
      setData(data)
      setBilling_address_country(data.billing_address_country)
      setBilling_address_state(data.billing_address_state)
      setBilling_address_city(data.billing_address_city)
      setCust_id(data.cust_id)
      const result = await Totalcountry()
      setSelectedCountry(result)
      setLoading(true)

    }
    fetchdata()
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)

    const billing_address_attention = document.getElementById('billing_address_attention').value;
    const billing_address_pincode = document.getElementById('billing_address_pincode').value;
    const billing_address_phone = document.getElementById('billing_address_phone').value;
    const billing_address_fax = document.getElementById('billing_address_fax').value;
    const User_id = localStorage.getItem('User_id')

    // if (!billing_address_pincode || !User_id) {

    if (!billing_address_country || !billing_address_state || !billing_address_city || !billing_address_phone || !billing_address_pincode) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await EditCustAddress(localStorage.getItem("Organisation"), localStorage.getItem('EditAddress'), cust_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, User_id)
      setLoading(true)
      if (result === 'Updated') {
        localStorage.removeItem('EditAddress')
        setAlertObj({ type: 'success', text: 'Address Updated', url: '/TotalCustAddress' })
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
  const handleAddressCity = async (e) => {
    let data = e.target.value;
    setBilling_address_city(data);
  }
  const handleChangebillingState = async (e) => {
    let data = e.target.value;
    setBilling_address_state(data);
    const result = await getCity(data)
    setSelectCity(result)
  }

  const handleChangePincode = async (e) => {
    if (e.target.value.length >= 7) return false;
    setData({ ...data, billing_address_pincode: e.target.value })
  }
  const handleChangePhone = async (e) => {
    if (e.target.value.length >= 11) return false;
    setData({ ...data, billing_address_phone: e.target.value })
  }

  return (
    <div className="wrapper">
      <Header />
      {
        loading ?
          <div className="content-wrapper">
            <div className="container-fluid">
              <h3 className="py-3 ml-5">Edit Address</h3>
              <div className="card ">
                <article className="card-body">
                  <form autoComplete="off">
                    <label>BILLING ADDRESS</label>
                    <div className="form-row">
                      <label htmlFor="cust_name" className="col-md-2 col-form-label font-weight-normal" > Customer Name </label>
                      <div className="col-md-4 form-group">
                        <input type="text" className="form-control col cursor-notallow" id="cust_name" defaultValue={data.cust_name} disabled />
                      </div>
                      <label htmlFor="gstno" className="col-md-2 col-form-label text-center font-weight-normal"> GST No:-</label>
                      <div className="col-md-4 form-group">
                        <input type="text" className="form-control col cursor-notallow" id="gstno" defaultValue={data.gst_no} disabled />
                      </div>
                    </div>


                    <div className="form-row">
                      <label htmlFor="billing_address_attention" className="col-md-2 col-form-label font-weight-normal"> Attention</label>
                      <div className="col-md-4 form-group">
                        <input type="text" className='form-control col' id="billing_address_attention" defaultValue={data.billing_address_attention} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="inputState" className="col-md-2 col-form-label font-weight-normal" >  Country / Region <span className='text-danger'>*</span></label>
                      <div className="col-md-4 form-group">
                        <select id="inputState" className='form-control' onChange={handleAddressCountry} >
                          <option value={data.billing_address_country} hidden> {data.billing_address_country}</option>
                          {
                            selectedCountry.map((data, index) => (
                              <option key={index} value={data.country_name}>{data.country_name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <label htmlFor="inputState" className="col-md-2 col-form-label font-weight-normal text-center"> State <span className='text-danger'>*</span></label>
                      <div className="col-md-4 form-group">
                        <select id="inputState" className='form-control' onChange={handleChangebillingState}>
                          <option value={data.billing_address_state} hidden>{data.billing_address_state}</option>
                          {
                            selectState.map((data, index) => (
                              <option key={index} value={data.state_name}>{data.state_name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="inputState" className="col-md-2 col-form-label font-weight-normal" > City <span className='text-danger'>*</span></label>
                      <div className="col-md-4 form-group">
                        <select id="inputState" className='form-control' onChange={handleAddressCity} >
                          <option valu={data.billing_address_city} hidden>{data.billing_address_city}</option>
                          {
                            selectCity.map((data, index) => (
                              <option key={index} value={data.city_name}>{data.city_name}</option>
                            ))
                          }

                        </select>
                      </div>
                      <label htmlFor="billing_address_pincode" className="col-md-2 col-form-label text-center font-weight-normal" > Zip Code <span className='text-danger'>*</span></label>
                      <div className="col-md-4 form-group">
                        <input type="number" className='form-control col' id="billing_address_pincode" value={data.billing_address_pincode} onChange={handleChangePincode} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="billing_address_phone" className="col-md-2 col-form-label font-weight-normal" > Phone <span className='text-danger'>*</span></label>
                      <div className="col-md-4 form-group">
                        <input type="number" className='form-control col' id="billing_address_phone" value={data.billing_address_phone} onChange={handleChangePhone} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="billing_address_fax" className="col-md-2 col-form-label font-weight-normal" >  Fax </label>
                      <div className="col-md-4 form-group">
                        <input type="text" className='form-control col' id="billing_address_fax" defaultValue={data.billing_address_fax} />
                      </div>
                    </div>

                  </form>
                </article>
                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick} >Update Address</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('EditAddress'); window.location.href = "./TotalCustAddress" }}>Cancel</button>
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


export default EditAddress;

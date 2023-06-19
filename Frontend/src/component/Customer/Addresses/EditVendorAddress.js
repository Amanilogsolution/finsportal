import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { VendAddress, EditVendAddress, ActiveVendor, Activecountries, showactivestate, getCity } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';


const EditVendorAddress = () => {
  const [loading, setLoading] = useState(false)
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })
  const [billing_address_country, setBilling_address_country] = useState();
  const [selectState, setSelectState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [billing_address_state, setBilling_address_state] = useState();
  const [data, setData] = useState({})
  const [getvendname, setGetvendname] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation');
      const venddetail = await VendAddress(localStorage.getItem('EditVendorAddresssno'), org)
      setData(venddetail)
      const vendname = await ActiveVendor(org);
      setGetvendname(vendname)

      const result = await Activecountries()
      setSelectedCountry(result)
      setLoading(true)

    }
    fetchdata();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const venddetail = document.getElementById('venddetail');
    const vendname = venddetail.options[venddetail.selectedIndex].text;
    const vendid = venddetail.value;
    const billing_address_gstno = document.getElementById('gstno').value;
    const billing_address_attention = document.getElementById('billing_address_attention').value;
    const city = document.getElementById('billing_address_city').value;
    const billing_address_pincode = document.getElementById('billing_address_pincode').value;
    const billing_address_phone = document.getElementById('billing_address_phone').value;
    const billing_address_fax = document.getElementById('billing_address_fax').value;
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');
    const sno = localStorage.getItem('EditVendorAddresssno')

    if (!vendid) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await EditVendAddress(sno, vendid, vendname, billing_address_gstno, billing_address_attention,
        billing_address_country, city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id)
      setLoading(true)
      if (result === 'Updated') {
        localStorage.removeItem('EditVendorAddresssno');
        setAlertObj({ type: 'success', text: 'Address Updated', url: '/TotalVendAddress' })
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


  const handleChangeCID = async (e) => {
    const venddetail = document.getElementById('venddetail');
    const vendname = venddetail.options[venddetail.selectedIndex].text;
    const vendid = venddetail.value;
    setData({ ...data, vend_id: vendid })
    setData({ ...data, vend_name: vendname })
  }
  const handleChangeAttention = async (e) => {
    setData({ ...data, billing_address_attention: e.target.value })
  }

  const handleChangePincode = async (e) => {
    if (e.target.value.length >= 7) return false
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
          <div className='content-wrapper'>
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Vendor Address</h3>
              <div className="card" >
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="Address" id="addressdiv">
                      <div className="Address_left">
                        <label>BILLING ADDRESS</label>
                        <div className="form-row">
                          <label htmlFor="venddetail" className="col-md-2 col-form-label font-weight-normal" > Vendor Name </label>
                          <div className="col-md-4 form-group">
                            <select id="venddetail" className="form-control" onChange={handleChangeCID} >
                              <option value={data.vend_id} hidden> {data.vend_name}</option>
                              {
                                getvendname.map((item, index) =>
                                  <option key={index} value={item.vend_id}>{item.vend_name}</option>
                                )
                              }
                            </select>
                          </div>
                          <label htmlFor="gstno" className="col-md-2 col-form-label font-weight-normal text-center" > GST </label>
                          <div className="col-md-4 form-group">
                            <input type="text" className="form-control " id="gstno" value={data.gst_no} disabled />
                          </div>
                        </div>


                        <div className="form-row">
                          <label htmlFor="inputState" className="col-md-2 col-form-label font-weight-normal">Attention/Address</label>
                          <div className="col-md-4 form-group">
                            <input type="text" className="form-control " id="billing_address_attention" value={data.billing_address_attention} onChange={handleChangeAttention} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal" > Country </label>
                          <div className="col-md-4 form-group">
                            <select id="inputState" className="form-control" onChange={handleAddressCountry} >
                              <option value={data.billing_address_country} hidden>{data.billing_address_country}</option>
                              {
                                selectedCountry.map((item, index) => (
                                  <option key={index} value={item.country_name}>{item.country_name}</option>
                                ))
                              }
                            </select>
                          </div>
                          <label htmlFor="user_name" className="col-md-2 col-form-label text-center font-weight-normal" >  State </label>
                          <div className="col-md-4 form-group">
                            <select id="inputState" className="form-control" onChange={handleChangebillingState} >
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

                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_city" className="col-md-2 col-form-label font-weight-normal" > City </label>
                          <div className="col-md-4 form-group">
                            <select id="billing_address_city" className="form-control" >
                              <option hidden value={data.billing_address_city}>{data.billing_address_city}</option>
                              {
                                selectCity.map((data, index) => (
                                  <option key={index} value={data.city_name}>{data.city_name}</option>
                                ))
                              }
                            </select>
                          </div>
                          <label htmlFor="billing_address_pincode" className="col-md-2 col-form-label text-center font-weight-normal" > Zip Code </label>
                          <div className="col-md-4 form-group">
                            <input type="number" className="form-control col" id="billing_address_pincode" value={data.billing_address_pincode} onChange={handleChangePincode} />
                          </div>
                        </div>
                       
                        <div className="form-row">
                          <label htmlFor="billing_address_phone" className="col-md-2 col-form-label font-weight-normal" >  Phone</label>
                          <div className="col-md-4 form-group">
                            <input type="number" className="form-control col" id="billing_address_phone" value={data.billing_address_phone} onChange={handleChangePhone} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_fax" className="col-md-2 col-form-label font-weight-normal"> Fax </label>
                          <div className="col-md-4 form-group">
                            <input type="text" className="form-control col" id="billing_address_fax" defaultValue={data.billing_address_fax} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </article>
                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick} >Update</button>
                  <button className="btn btn-secondary ml-3" onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('EditVendorAddresssno');
                    window.location.href = "/TotalVendAddress"
                  }}>Cancel</button>
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


export default EditVendorAddress;

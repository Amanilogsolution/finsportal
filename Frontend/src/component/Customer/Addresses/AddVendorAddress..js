import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Activecountries, showactivestate, getCity, ActiveVendor, VendInsertAddress } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const AddVendAddress = () => {
  const [loading, setLoading] = useState(false)
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })
  const [getVendID, setVendId] = useState([]);
  const [billing_address_country, setBilling_address_country] = useState();
  const [selectState, setSelectState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [billing_address_state, setBilling_address_state] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Activecountries()
      setSelectedCountry(result)
      const dataId = await ActiveVendor(localStorage.getItem('Organisation'))
      setVendId(dataId)
      setLoading(true)

    }
    fetchdata();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const vend = document.getElementById('venddetail');
    const vend_name = vend.options[vend.selectedIndex].text;
    const vendid = vend.value;
    const billing_address_gstno = document.getElementById('billing_address_gstno').value;
    const billing_address_attention = document.getElementById('billing_address_attention').value;
    const billing_address_pincode = document.getElementById('billing_address_pincode').value;
    const billing_address_phone = document.getElementById('billing_address_phone').value;
    const billing_address_fax = document.getElementById('billing_address_fax').value;
    const billing_address_city = document.getElementById('billing_address_city').value;

    const vendnamrchar = vend_name.substring(0, 3);
    const citychar = billing_address_city.substring(0, 3);
    const vendaddid = vendnamrchar.toUpperCase() + citychar.toUpperCase() + Math.floor(Math.random() * 100000);

    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');

    if (!vend || !billing_address_country || !billing_address_city || !billing_address_state || !billing_address_pincode || !billing_address_phone) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await VendInsertAddress(vendid, vend_name, vendaddid, billing_address_gstno, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id)
      setLoading(true)
      if (result[0] > 0) {
        setAlertObj({ type: 'success', text: 'Vendor Address Added', url: '/TotalVendAddress' })
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
          <div className={`content-wrapper `}>
            <div className="container-fluid">
              <br /> <h3 className="ml-5">Add Address</h3>
              <div className={`card mb-2 `}>
                <article className="card-body">
                  <form autoComplete="off">
                    <div className="Address" id="addressdiv">
                      <div className="Address_left" style={{ width: "80%" }}>
                        <label>BILLING ADDRESS</label>
                        <div className="form-row">
                          <label htmlFor="venddetail" className="col-md-2 col-form-label font-weight-normal" >  Vendor Name</label>
                          <div className="col-md-6 form-group">
                            <select id="venddetail" className="form-control">
                              <option value='' hidden> Select</option>
                              {
                                getVendID.map((data, index) => (
                                  <option key={index} value={data.vend_id}>{data.vend_name}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_gstno" className="col-md-2 col-form-label font-weight-normal" >  GST NO.</label>
                          <div className="col form-group">
                            <input type="text"
                              className="form-control col-md-7"
                              id="billing_address_gstno"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_attention" className="col-md-2 col-form-label font-weight-normal" >  Attention </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-7" id="billing_address_attention" />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="inputState" className="col-md-2 col-form-label font-weight-normal" >  Country / Region</label>
                          <div className="col-md-6 form-group">
                            <select id="inputState" className="form-control" onChange={handleAddressCountry}>
                              <option value='' hidden> Select Country</option>
                              {
                                selectedCountry.map((data, index) => (
                                  <option key={index} value={data.country_name}>{data.country_name}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal" >  State </label>
                          <div className="col-md-6 form-group">
                            <select id="inputState" className="form-control" onChange={handleChangebillingState}>
                              <option value='' hidden> Select State</option>
                              {
                                selectState.map((data, index) => (
                                  <option key={index} value={data.state_name}>{data.state_name}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_city" className="col-md-2 col-form-label font-weight-normal"> City</label>
                          <div className="col-md-6 form-group">
                            <select id="billing_address_city" className="form-control" >
                              <option value='' hidden> Select City</option>
                              {
                                selectCity.map((data, index) => (
                                  <option key={index} value={data.city_name}>{data.city_name}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_pincode" className="col-md-2 col-form-label font-weight-normal"> Zip Code </label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-7" id="billing_address_pincode" />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_phone" className="col-md-2 col-form-label font-weight-normal" >  Phone</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-7" id="billing_address_phone" />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_fax" className="col-md-2 col-form-label font-weight-normal">Fax </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-7" id="billing_address_fax" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </article>
                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick} >Save</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./TotalVendAddress" }}>Cancel</button>
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


export default AddVendAddress

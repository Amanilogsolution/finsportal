import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { VendAddress, EditVendAddress, ActiveVendor } from '../../../api';
import { Activecountries } from '../../../api';
import { showactivestate } from '../../../api';
import { getCity } from '../../../api';

const EditVendorAddress = () => {
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
    }
    fetchdata();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

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


    const result = await EditVendAddress(sno, vendid, vendname, billing_address_gstno, billing_address_attention,
      billing_address_country, city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id)
    if (result) {
      alert('Data Updated');
      window.location.href = './TotalVendAddress';
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
    setData({ ...data, billing_address_pincode: e.target.value })
  }
  const handleChangePhone = async (e) => {
    setData({ ...data, billing_address_phone: e.target.value })
  }
  const handleChangeFax = async (e) => {
    setData({ ...data, billing_address_fax: e.target.value })
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
              <br /> <h3 className="text-left ml-5">Edit Vendor Address</h3>
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
                                htmlFor="venddetail"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Vendor Name
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="venddetail"
                                  className="form-control"
                                  onChange={handleChangeCID}
                                >
                                  <option value={data.vend_id} hidden> {data.vend_name}</option>
                                  {
                                    getvendname.map((item, index) =>
                                      <option key={index} value={item.vend_id}>{item.vend_name}</option>
                                    )

                                  }

                                </select>
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="gstno"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                GST
                              </label>
                              <div className="col-md-6 form-group">
                                <input type="text"
                                  className="form-control "
                                  id="gstno"
                                  value={data.gst_no}
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="inputState"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Address
                              </label>
                              <div className="col-md-6 form-group">
                                <input type="text"
                                  className="form-control "
                                  id="billing_address_attention"
                                  value={data.billing_address_attention}
                                  onChange={handleChangeAttention}
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Country
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="inputState"
                                  className="form-control"
                                  onChange={handleAddressCountry}
                                >
                                  <option value={data.billing_address_country} hidden>{data.billing_address_country}</option>
                                  {
                                    selectedCountry.map((item, index) => (
                                      <option key={index} value={item.country_name}>{item.country_name}</option>
                                    ))
                                  }
                                </select>
                              </div>
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
                              <label
                                htmlFor="billing_address_city"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                City
                              </label>
                              <div className="col-md-6 form-group">
                                <select
                                  id="billing_address_city"
                                  className="form-control"
                                >
                                  <option hidden value={data.billing_address_city}>{data.billing_address_city}</option>
                                  {
                                    selectCity.map((data, index) => (
                                      <option key={index} value={data.city_name}>{data.city_name}</option>
                                    ))
                                  }
                                </select>
                              </div>
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
                                  value={data.billing_address_pincode}
                                  onChange={handleChangePincode}
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
                                  value={data.billing_address_phone}
                                  onChange={handleChangePhone}
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
                                  value={data.billing_address_fax}
                                  onChange={handleChangeFax}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { localStorage.remove('EditVendorAddresssno'); window.location.href = "./TotalVendAddress" }}>Cancel</button>
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


export default EditVendorAddress;

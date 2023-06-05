import React, { useState, useEffect } from "react";
import './signup.css'
import logo from '../../images/finsgrowlogo.png'
import { Insertorg, InsertUser, InsertUserLogin, Activecountries, showactivestate, getCity } from '../../api/index'


export default function Signup() {
  const [countrylist, setCountrylist] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [selectCity, setSelectCity] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation');
      const result = await Activecountries();
      setCountrylist(result)
    }
    fetchdata()
  }, [])

  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    const statesresult = await showactivestate(data)
    setSelectState(statesresult)
  }
  const handleChangebillingState = async (e) => {
    let data = e.target.value;
    const result = await getCity(data)
    setSelectCity(result)
  }

  const handleClickstep1 = (e) => {
    e.preventDefault();
    document.getElementById('step1').style.display = "none"
    document.getElementById('step2').style.display = "block"

  }
  const handleClickBack = (e) => {
    e.preventDefault();
    document.getElementById('step1').style.display = "block"
    document.getElementById('step2').style.display = "none"
  }

  const handleCheckbox = () => {
    if (document.getElementById('checkbox').checked == true) {
      document.getElementById('gst').style.display = "block"
    } else {
      document.getElementById('gst').style.display = "none"
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const org_name = document.getElementById('org_name').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    const street = document.getElementById('street').value
    const gst = document.getElementById('gst').value;
    const name = document.getElementById('name').value;
    const mobileno = document.getElementById('mobileno').value;
    const email = document.getElementById('email').value;
    const designation = document.getElementById('designation').value;
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value

    console.log(org_name, country, state, city, zipcode, street, gst, name, mobileno, email, designation, userid, password)

    if (!org_name || !country || !state || !city || !zipcode || !street || !gst || !name || !mobileno || !email || !designation || !userid || !password) {
      alert('All Fields Are Mandatory')
    }
    else {

      // const result = await Insertorg(Organisationname, Location, Currency, Language, gst, Personname, mobileno, email, userid)
      // console.log(result)

      // const user = await InsertUser(Personname,address,userid,password,email,mobileno,userid)
      // const Login = await InsertUserLogin(userid,Personname,address,Organisationname,password)
      // if (user === 'Added' && Login === "Added") {
      //   alert('Data Added')
      // }
    }
  }

  const Step1 = () => {
    return (
      <>
        {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "10px" }}>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#4055b5", borderRadius: "50%", textAlign: "center", color: "white" }}>1</div>
          <div style={{ height: "13px", width: "280px", borderBottom: "1px solid black" }}></div>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#9e9e9e", borderRadius: "50%", textAlign: "center", color: "white" }}>2</div>
        </div> */}
        <div className="container">
          <header className="card-header pb-0" >
            <h4 >Setup your Organisation profile</h4>
          </header>
          <article className="card-body mt-0">
            <form autoComplete="off">
              <div className="form-row">
                <label htmlFor="org_name" className="form-label font-weight-normal">Organisation Name</label>
                <input type="text" id="org_name" className="form-control" />
              </div>
              <div className="form-row ">
                <div className="form-group col mb-0 ">
                  <label htmlFor="country" className="form-label font-weight-normal">Bussiness Location</label>
                  <select type="text" className="form-control " id='country' onChange={handleAddressCountry} >
                    <option hidden value=''>Select Country</option>
                    {
                      countrylist.map((data, index) => (
                        <option key={index} value={data.country_name}>{data.country_name}</option>
                      ))

                    }
                  </select>
                </div>
                <div className="form-group col  mb-0">
                  <label htmlFor="state" className=" form-label font-weight-normal">State</label>
                  <select type="text" className="form-control" id='state' onChange={handleChangebillingState}>
                    <option hidden value=''>Select State</option>
                    {
                      selectState.map((data, index) => (
                        <option key={index} value={data.state_name}>{data.state_name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col mb-0">
                  <label htmlFor="city" className="form-label font-weight-normal">City</label>
                  <select type="text" className="form-control" id='city' >
                    <option hidden value=''>Select City</option>
                    {
                      selectCity.map((data, index) => (
                        <option key={index} value={data.city_name}>{data.city_name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group col mb-0 ">
                  <label htmlFor="zipcode" className=" form-label font-weight-normal">Zip/Postal Code</label>
                  <input type="text" id="zipcode" className="form-control" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col  mb-1">
                  <label htmlFor="street" className=" form-label font-weight-normal">Street</label>
                  <input type="text" id="street" className="form-control" />
                </div>
                <div className="form-group col mb-1">
                  <label htmlFor="language" className="form-label font-weight-normal">Language</label>
                  <input type="text" id="language" className="form-control" defaultValue='English' />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col  mb-0">
                  <label htmlFor="zipcode" className=" form-label font-weight-normal ">Is this Business registered for GST</label>
                  <input className="ml-1" style={{ width: "15px", height: '15px' }} type="checkbox" id="checkbox" onClick={handleCheckbox} />
                </div>
                <div className="form-group col mb-1">
                  <input type="text" style={{ display: "none" }} id="gst" className="form-control" placeholder='GST no.' />
                </div>
              </div>
              <button type="submit" onClick={handleClickstep1} className="signp_btn float-right">Next</button>
            </form>

          </article>

        </div>
      </>
    )
  }
  const Step2 = () => {
    return (
      <>
        {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "10px" }}>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#4055b5", borderRadius: "50%", textAlign: "center", color: "white" }}>1</div>
          <div style={{ height: "13px", width: "280px", borderBottom: "1px solid black" }}></div>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#4055b5", borderRadius: "50%", textAlign: "center", color: "white" }}>2</div>
        </div> */}
        <div className="container">

          <header className="card-header pb-0" >
            <h4>Set up Contact person profile</h4>
          </header>
          <article className="card-body mt-0">
            <form autoComplete="off">
              <div className="form-row ">
                <div className="form-group col mb-0 ">
                  <label htmlFor="name" className="form-label font-weight-normal">Name</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group col  mb-0">
                  <label htmlFor="mobileno" className=" form-label font-weight-normal">Mobile no</label>
                  <input type="number" className="form-control" id="mobileno" />
                </div>
              </div>

              <div className="form-row ">
                <div className="form-group col mb-0 ">
                  <label htmlFor="email" className="form-label font-weight-normal">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group col  mb-0">
                  <label htmlFor="designation" className=" form-label font-weight-normal">Designation</label>
                  <input type="text" className="form-control" id="designation" />
                </div>
              </div>
              <div className="form-row ">
                <div className="form-group col mb-0 ">
                  <label htmlFor="userid" className="form-label font-weight-normal">User Id</label>
                  <input type="text" className="form-control" id="userid" />
                </div>
                <div className="form-group col  mb-0">
                  <label htmlFor="designation" className=" form-label font-weight-normal">Password</label>
                  <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder="Password" id="password" />
                  </div>
                </div>
              </div>
              <button type="cancel" onClick={handleClickBack} className="btn btn-secondary my-3">Back</button>
              <button type="submit" className="btn btn-primary mx-2" onClick={handleClick}>Create</button>
            </form>
          </article>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="signup_page position-relative">
        <div className="innersignup_page bg-white position-absolute d-flex ">
          <div className="signup_form py-4 px-2">
            <header className="header d-flex justify-content-around">
              <img src={logo} alt="Company Logo" />
              <h3 className="signup_tittle font-weight-bold text-center pt-3">Create an Account</h3>
            </header>
            <div id="step1">
              <Step1 />
            </div>
            <div id="step2" style={{ display: "none" }}>
              <Step2 />
            </div>
            <p className="text-center pb-0">Already have an account ? <a href="/signin" >Sign in</a></p>
          </div>
          <div className="signup_image">
            <img src="https://herovired.com/wp-content/uploads/2023/02/finance-management1.webp" alt="Sign up Image" />
          </div>
        </div>

      </div>
    </>
  );
}

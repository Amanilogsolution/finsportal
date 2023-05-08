import React, { useState } from "react";
import './signup.css'
// import logo from '../images/awl_logo.png'
// import { Insertorg,InsertUser,InsertUserLogin } from '../../api/index'


export default function Signup() {
  const handleClick = async (e) => {
    e.preventDefault();
    const Organisationname = document.getElementById('Organisationname').value;
    const Location = document.getElementById('location').value;
    const Currency = document.getElementById('currency').value;
    const Language = document.getElementById('language').value;
    const gst = document.getElementById('gst').value
    const Personname = document.getElementById('personname').value;
    const mobileno = document.getElementById('mobileno').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value


    // const result = await Insertorg(Organisationname, Location, Currency, Language, gst, Personname, mobileno, email, userid)
    // console.log(result)

    // const user = await InsertUser(Personname,address,userid,password,email,mobileno,userid)
    // const Login = await InsertUserLogin(userid,Personname,address,Organisationname,password)
    // if (user === 'Added' && Login === "Added") {
    //   alert('Data Added')
    // }

  }

  const handleClickstep1 = (e) =>{
    e.preventDefault();
    document.getElementById('step1').style.display="none"
    document.getElementById('step2').style.display="block"

  }
  const handleClickBack = (e) =>{
    e.preventDefault();
    document.getElementById('step1').style.display="block"
    document.getElementById('step2').style.display="none"
  }

  const handleCheckbox = () => {
    console.log(document.getElementById('checkbox').checked)
    if(document.getElementById('checkbox').checked == true){
      document.getElementById('gst').style.display="block"
    }else{
      document.getElementById('gst').style.display="none"

    }
  
  }

  const Step1 = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center",marginTop:"10px",marginBottom:"10px" }}>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#4055b5", borderRadius: "50%", textAlign: "center", color: "white" }}>1</div>
          <div style={{ height: "13px", width: "280px", borderBottom: "1px solid black" }}></div>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#9e9e9e", borderRadius: "50%", textAlign: "center", color: "white" }}>2</div>


        </div>
        <div className="container">
          <header className="card-header" >
            <h4>Set up your organiztaion profile</h4>
          </header>
          <article className="card-body">
            <form>
              <div className="row mt-2">
                <div className="form-group">
                  <label>Organiztaion Name</label>
                  <input type="text" id="Organisationname" className="form-control" />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col">
                  <label>Country</label>
                  <input type="text" id="location" className="form-control" />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col">
                  <label for="inputState">Currency</label>
                  <input type="text" id="currency" value="INR-Rupees" className="form-control" disabled />

                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col">
                  <label for="inputState">Language</label>
                  <input type="text" id="language" value="English" className="form-control" disabled />

                </div>
              </div>

              <div className="row mt-3">
                <p className="col-md-11">Is this Business registered for GST</p>
                <input style={{ width: "14px" }} className="col-md-1" type="checkbox" id="checkbox" onClick={handleCheckbox} />
                <input type="text" style={{ width: "97%",display:"none" }} id="gst" class="form-control mx-2" />
              </div>

              <button type="submit" onClick={handleClickstep1} className="btn btn-primary mt-4">Next</button>
            </form>
          </article>

        </div>
      </>
    )
  }
  const Step2 = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center",marginTop:"10px",marginBottom:"10px" }}>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#4055b5", borderRadius: "50%", textAlign: "center", color: "white" }}>1</div>
          <div style={{ height: "13px", width: "280px", borderBottom: "1px solid black" }}></div>
          <div style={{ height: "25px", width: "25px", backgroundColor: "#4055b5", borderRadius: "50%", textAlign: "center", color: "white" }}>2</div>


        </div>
        <div className="container">

          <header className="card-header" >
            <h4>Set up your personal profile</h4>
          </header>
          <article className="card-body">
            <form>
              <div className="row">
                <div className="form-group">
                  <label>Person Name</label>
                  <input type="text" id="personname" className="form-control" />
                </div>
              </div>

              <div className="row mt-1">
                <div className="form-group col-md-6">
                  <label>Mobile</label>
                  <input type="text" className="form-control" id="mobileno" />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputState">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
              </div>

              <div className="row mt-1">
                <div className="form-group col">
                  <label for="inputState">Address</label>
                  <input type="text" className="form-control" id="address" />
                </div>
              </div>

              <div className="row mt-1">
                <div className="form-group col">
                  <label for="inputState">User Id</label>
                  <input type="text" className="form-control" id="userid" />
                </div>
              </div>

              <div className="row mt-1">
                <div className="form-group col-md-6">
                  <label for="inputState">Password</label>
                  <input type="password" className="form-control" id="password" />
                </div>
              </div>

              <button type="submit" onClick={handleClickBack} className="btn btn-secondary my-3">Back</button>
              <button type="submit" className="btn btn-primary mx-2" onClick={handleClick}>Submit</button>
            </form>
          </article>
        </div>
      </>
    )
  }

  return (
    <div >
      <div style={{ display: "flex" }}>
        <div className="brand">
          <img 
        //   src={logo}
           />
        </div>
        <div className="brand2">
          <h4>Register your Account</h4>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="imgdiv">
          <img src="https://images.unsplash.com/photo-1609921141835-710b7fa6e438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        </div>
        <div className="container">
          <div>
            <div id="step1">
              <Step1 />
            </div>
            <div id="step2" style={{display:"none"}}>
              <Step2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

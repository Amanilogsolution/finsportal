import './header.css';
import React, { useState, useEffect } from "react";
import { showOrganisation,TotalOrganistion, UserLogout,LogoutLogs } from '../../api'
import OrgLogo from "../../images/bg1.jpg";
import profileimg from '../../images/profile.png'
import Menu from '../Menu/Menu'

const Header = () => {
  const [show, setShow] = useState(false);
  const [showprofile, setShowprofile] = useState(false);
  const [orgdetails, setOrgDeatils] = useState(false);

  const [data, setData] = useState([])



  useEffect(() => {
    const fetchdata = async () => {
      const organisation = await TotalOrganistion()
      setData(organisation)

      const result1 = await showOrganisation(localStorage.getItem('Organisation'))
      if(result1.org_logo){
      localStorage.setItem('Orglogo',result1.org_logo)
      }else{
        localStorage.removeItem('Orglogo')

      }
      

      const result = await showOrganisation(localStorage.getItem('Organisation Name'))
      console.log(result.org_gst)
      if(!result.org_gst){
        localStorage.setItem('gststatus','false')

      }else{
        localStorage.setItem('gststatus','true')
      }

    }
    fetchdata()

  }, [])

  const handleClick = async () => {
    const result = await UserLogout(localStorage.getItem('User_name'));
    const result1 = await LogoutLogs(localStorage.getItem('User_id'),localStorage.getItem('Organisation'))
    if (result.status === 'Logout') {
      localStorage.clear()
      window.location.href = '/'
    }

  }


  return (
    <div>
    {/* <Menu/> */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/home" className="nav-link">
              Home
            </a>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li> */}
        </ul>


        <ul className="navbar-nav ml-auto" style={{ position: "relative" }}>
          <li className="nav-item" >
            <a
              className="nav-link"
              role="button"
              onClick={() => {
                if (showprofile === true) {
                  setShowprofile(!showprofile);
                  setShow(!show);
                }
                else if (orgdetails === true) {
                  setOrgDeatils(!orgdetails);
                  setShow(!show);

                }
                else {
                  setShow(!show);
                }


              }}
            >
              <b>{localStorage.getItem('Organisation Name')} <i className="fa fa-angle-down" aria-hidden="true"></i></b>
            </a>
          </li>
          <li className="nav-item" >
            <a
              className="nav-link"
              role="button"
              onClick={() => {
                if (showprofile === true) {
                  setShowprofile(!showprofile);
                  setOrgDeatils(!orgdetails);
                }
                else if (show === true) {
                  setShow(!show);
                  setOrgDeatils(!orgdetails);

                }
                else {
                  setOrgDeatils(!orgdetails);
                }

              }}
            >
              <i className="fas fa-cog"></i>
            </a>
          </li>

          {/* <li className="nav-item" >
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search"></i>
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append" >
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    ></button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}

          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell"></i>
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2"></i> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>
          <li className="nav-item" >
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>

          <li className="nav-item profilediv"  >
            <div className="user-panel mr-7">
              <div className="image" onClick={() => {

                if (show === true) {
                  setShow(!show);
                  setShowprofile(!showprofile);
                }
                else if (orgdetails === true) {
                  setOrgDeatils(!orgdetails);
                  setShowprofile(!showprofile);

                }
                else {
                  setShowprofile(!showprofile);
                }

              }}>
                <img src={localStorage.getItem("User_img")|| profileimg} className="img-circle mr-4" alt="User Image" style={{ border: "1px solid black" }} />
              </div>
            </div>
          </li>
          {/*------ Profile end ---------------*/}

        </ul>

        {show ? (
          <>

            <div className="orgcard card" >

              <div className="card-body">
                <i className="fa fa-times" aria-hidden="true" style={{ display: "flex", flexDirection: "row-reverse" }} onClick={() => { setShow(!show); }}></i>
                <img className="card-img-top " src={localStorage.getItem('Orglogo') || OrgLogo} alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)", borderRadius: "50%", border: "1px solid black" }} />
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>My Orgaisation</b>
                  <a href='/org' style={{ color: "green", float: "right", textDecoration: "underline" }}> Add Organisation</a>
                </li>
                {
                  data.map((item, index) => (

                    <li key={index} className="list-group-item">
                      <a href="#" style={{ color: "blue", }}>
                        <i className="fa fa-building" style={{ color: "#333" }}></i> &nbsp;
                        <span className="orgnamehover" onClick={() => {
                          localStorage.setItem('Organisation', item.org_db_name);
                          localStorage.setItem('Organisation Name', item.org_name);
                          window.location.reload()
                        }
                        }>{item.org_name}</span>
                      </a>
                      <a onClick={() => { localStorage.setItem('Organisation_details', item.org_name); window.location.href = './EditOrganisation' }} style={{ float: "right", cursor: "pointer" }}>
                        <i className="fas fa-cog" ></i> Manage</a>
                    </li>
                  ))
                }
              </ul>

            </div>
          </>) : null
        }

        {orgdetails ? (
          <>
            <div className="orgcard card"  >
              <div className="card-body" style={{ display: "flex" }}>
                <span style={{ fontSize: "20px" }}>Setting</span>
                <i className="fa fa-times position-absolute" aria-hidden="true" style={{ right: "25px" }} onClick={() => { setOrgDeatils(!orgdetails); }}></i>
              </div>
              <ul className="list-group list-group-flush">
                <a href="/EditOrganisation"> <li className="list-group-item "><i className="fa fa-building text-dark"></i> &nbsp;
                  <b>Orgaisation profile</b> </li></a>
                <a href="ShowFincialyear"><li className="list-group-item"><i className="fa fa-calendar text-dark" aria-hidden="true"></i>&nbsp;&nbsp;
                  <b>Fincial Year</b> </li></a>
                <a href="/TotalLocation"> <li className="list-group-item"><i className="fa fa-map-marker text-dark" aria-hidden="true"></i>&nbsp;&nbsp;
                  <b>Branches</b> </li></a>
                <a href="/ShowPaymentTerm"> <li className="list-group-item"><i className="fa fa-university text-dark" aria-hidden="true"></i>&nbsp;&nbsp;
                  <b>Payment Terms</b> </li></a>
                <a href="/ShowCrm"> <li className="list-group-item"><i className="fa fa-user-plus text-dark" aria-hidden="true"></i>&nbsp;&nbsp;
                  <b>CRM Master</b> </li></a>
                <a href="/Showcompliances"> <li className="list-group-item"><i className="fa fa-user-plus text-dark" aria-hidden="true"></i>
                &nbsp;&nbsp;
                  <b>Compliances</b> </li></a>
              </ul>


            </div>
          </>) : null
        }
        {
          showprofile ? (
            <>
              <div className="profilcard card" >
                <div className="card-body">
                  <i className="fa fa-times" aria-hidden="true" style={{ display: "flex", flexDirection: "row-reverse" }} onClick={() => { setShowprofile(!showprofile); }}></i>
                  <img className="card-img-top " src={localStorage.getItem("User_img") || profileimg} alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)", borderRadius: "50%", border: "1px solid black" }} />
                  <h6 className='text-center font-weight-bold'>{localStorage.getItem('User_name')} </h6>
                  <div className='text-center  font-weight-bold'>
                    <a href="/LoginDetails">Profile</a> |
                    <a href="/ChangePassword" style={{ color: "green" }}> Change Password</a><br />
                    <a href="#" onClick={handleClick} style={{ color: "red" }}> Logout</a>
                  </div>
                </div>
              </div>
            </>) : null
        }
      </nav>

    </div>
  );
};

export default Header;


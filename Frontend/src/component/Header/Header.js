import './header.css';
import React, { useState, useEffect } from "react";
import { TotalOrganistion, UserLogout } from '../../api'
import OrgLogo from "../../images/bg1.jpg";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showprofile, setShowprofile] = useState(false);
  const [data, setData] = useState([])


  
  useEffect(async () => {
    const organisation = await TotalOrganistion()
    setData(organisation)
    console.log(organisation)
  }, [])

  const handleClick = async()=>{
    const result = await UserLogout(localStorage.getItem('username'));
    if(result.status == 'Logout'){
     localStorage.clear()
      window.location.href='/'
    }
  
  }


  return (
    <div>
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
                if (showprofile == true) {
                  setShowprofile(!showprofile);
                  setShow(!show);
                }
                else {
                  setShow(!show);
                }

                
              }}
            >
              <b>{localStorage.getItem('Organisation Name')} <i class="fa fa-angle-down" aria-hidden="true"></i></b>
            </a>
          </li>
          <li className="nav-item" >
            <a
              className="nav-link"
              role="button"
              onClick={() => {
                if (showprofile == true) {
                  setShowprofile(!showprofile);
                  setShow(!show);
                }
                else {
                  setShow(!show);
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
          {/* <li className="nav-item" >
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button" >
              <i className="fas fa-th-large"></i>
            </a>
          </li> */}

          {/*--------- Profile start ---------------*/}
          <li className="nav-item profilediv"  >
            <div className="user-panel mr-7">
              <div className="image" onClick={() => {

                if (show == true) {

                  setShow(!show);
                  setShowprofile(!showprofile);
                }
                else {
                  setShowprofile(!showprofile);
                }

              }}>
                <img src="dist/img/user2-160x160.jpg" className="img-circle mr-4" alt="User Image" style={{ border: "1px solid black" }} />
              </div>
            </div>
          </li>
          {/*------ Profile end ---------------*/}

        </ul>

        {show ? (
          <>

            <div className="orgcard card" >

              <div className="card-body">
                <i class="fa fa-times" aria-hidden="true" style={{ display: "flex", flexDirection: "row-reverse" }} onClick={() => { setShow(!show); }}></i>
                <img className="card-img-top " src={OrgLogo} alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)", borderRadius: "50%", border: "1px solid black" }} />
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>My Orgaisation</b>
                  <a href='/org' style={{ color: "green", float: "right", textDecoration: "underline" }}> Add Organisation</a>
                </li>
                {
                  data.map(item => (

                    <li className="list-group-item">
                      <a href="#" style={{ color: "blue", }}>
                        <i className="fa fa-building" style={{ color: "#333" }}></i> &nbsp;
                        <span className="orgnamehover" onClick={() => {
                          localStorage.setItem('Organisation', item.org_db_name);
                          localStorage.setItem('Organisation Name', item.org_name);
                          window.location.reload()
                        }
                        }>{item.org_name}</span>
                      </a>
                      <a href="#" style={{ float: "right" }}>
                        <i className="fas fa-cog" ></i> Manage</a>
                    </li>
                  ))
                }
              </ul>

            </div>
          </>) : null
        }
        
        {
          showprofile ? (
            <>


              <div className="profilcard card" >

                <div className="card-body">
                  <i class="fa fa-times" aria-hidden="true" style={{ display: "flex", flexDirection: "row-reverse" }} onClick={() => { setShowprofile(!showprofile); }}></i>
                  <img className="card-img-top " src="dist/img/user2-160x160.jpg" alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)", borderRadius: "50%", border: "1px solid black" }} />
                  <h6 className='text-center font-weight-bold'>{localStorage.getItem('User_name') } </h6>
                  <div className='text-center  font-weight-bold'>
                    <a href="/LoginDetails">Profile</a> | 
                    <a href="#" style={{color:"green"}}> Change Password</a><br/>
                    <a href="#" onClick={handleClick} style={{color:"red"}}> Logout</a>
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


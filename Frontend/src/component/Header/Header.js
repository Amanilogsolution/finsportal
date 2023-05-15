import './header.css';
import React, { useState, useEffect } from "react";
import { showOrganisation, TotalOrganistion, UserLogout, LogoutLogs, getUserRole, GetfincialyearNavbar } from '../../api'
import OrgLogo from "../../images/bg1.jpg";
import profileimg from '../../images/profile.png'
import Menu from '../Menu/Menu'


const Header = () => {
  const [data, setData] = useState([])
  const [financialyeardata, setFinancialYearData] = useState([])
  const themeval = typeof (localStorage.getItem('themetype')) !== null ? localStorage.getItem('themetype') : 'light'
  const btntheme = typeof (localStorage.getItem('themebtncolor')) !== null ? localStorage.getItem('themebtncolor') : 'primary';

  const [toggleorgswitchdiv,setToggleorgswitchdiv]= useState(false)
  useEffect(() => {
    const fetchdata = async (e) => {
      const org = localStorage.getItem('Organisation')
      const user_role = localStorage.getItem('Role')

      const role = await getUserRole(org, user_role)

      if (role.setting_all === 'true') {
        document.getElementById('setting_all').style.display = "block"

        if (role.org_profile_view === 'true') {
          document.getElementById('org_profile').style.display = "block"
        }
        else {
          document.getElementById('org_profile').style.display = "none"
        }

        if (role.fincial_year_view === 'true') {
          document.getElementById('fincial_year_view').style.display = "block"
        }
        else {
          document.getElementById('fincial_year_view').style.display = "none"
        }

        if (role.branch_view === 'true') {
          document.getElementById('branchs').style.display = "block"
        }
        else {
          document.getElementById('branchs').style.display = "none"
        }

        // if (role.payment_terms_view === 'true') {
        //   document.getElementById('payment_term').style.display = "block"
        // }
        // else {
        //   document.getElementById('payment_term').style.display = "none"
        // }
        if (role.crm_view === 'true') {
          document.getElementById('crm_data').style.display = "block"
        }
        else {
          document.getElementById('crm_data').style.display = "none"
        }
        if (role.compliances_view === 'true') {
          document.getElementById('compliances').style.display = "block"
        }
        else {
          document.getElementById('compliances').style.display = "none"
        }
        if (role.roles_view === 'true') {
          document.getElementById('roles').style.display = "block"
        }
        else {
          document.getElementById('roles').style.display = "none"
        }
        if (role.multi_org === 'true') {
          setToggleorgswitchdiv(true)
        }
        else {
          setToggleorgswitchdiv(false)
        }
        
      }
      else {
        document.getElementById('setting_all').style.display = "none"
      }

      const organisation = await TotalOrganistion()
      setData(organisation)

      const financialyear = await GetfincialyearNavbar(localStorage.getItem('Organisation'))
      setFinancialYearData(financialyear)

      const result1 = await showOrganisation(org)
      if (result1.org_logo) {
        localStorage.setItem('Orglogo', result1.org_logo)
      } else {
        localStorage.removeItem('Orglogo')
      }
      // const result = await showOrganisation(localStorage.getItem('Organisation Name'))
      if (!result1.org_gst) {
        localStorage.setItem('gststatus', 'false')
      } else {
        localStorage.setItem('gststatus', true)
      }
    }
    fetchdata()
  }, [])



  const handleClick = async () => {
    const User_id = localStorage.getItem('User_id')
    const result = await UserLogout(User_id, localStorage.getItem('User_name'), localStorage.getItem('themebtncolor'), localStorage.getItem('themetype'));
    const result1 = await LogoutLogs(User_id, localStorage.getItem('Organisation'))
    if (result.status === 'Logout') {
      localStorage.clear()
      window.location.href = '/'
    }
  }

  const handleswitchdata = (e) => {
    const vanj = document.getElementById('switchbtn').checked;
    if (vanj === true) {
      localStorage.setItem('themetype', 'dark')
      window.location.reload();
    }
    else {
      localStorage.setItem('themetype', 'light')
      window.location.reload();
    }
  }

  const handlebtncolor = (e) => {
    localStorage.setItem('themebtncolor', e.target.value)
    window.location.reload();
  }

  return (
    <div>
      <Menu theme={themeval} btncolor={btntheme} />
      <nav className={`main-header navbar navbar-expand navbar-${themeval}`}>
        <ul className='navbar-nav'>
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
        </ul>
        <ul className="navbar-nav ml-auto" style={{ position: "relative" }}>
          <li className="nav-item dropdown financial-change" >
            <a className="nav-link" data-toggle="dropdown">
              <b>
                <span className='fins-year-text'>Financial Year</span> {localStorage.getItem('fin_year')} <i className="fa fa-angle-down" aria-hidden="true"></i></b>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ border: "none" }}>
              <div className="orgcard card" style={{ width: "50%" }}>
                <ul className="list-group list-group-flush">
                  {
                    financialyeardata.map((item, index) => (
                      <li key={index} className={`list-group-item bg-${themeval}`}
                        onClick={() => {
                          localStorage.setItem('fin_year', item.fin_year);
                          localStorage.setItem('year', item.year);
                          localStorage.setItem('financialstatus', item.financial_year_lock);
                          window.location.reload()
                        }
                        }>
                        <a href="#">
                          {/* <i className={`fa fa-building text-${btntheme}`} ></i> &nbsp; */}
                          <span className="orgnamehover" >{item.fin_year}</span>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </li>
          {/*########################## All Organisation Start ################################# */}
          <li className="nav-item dropdown" >
            <a className="nav-link" data-toggle={toggleorgswitchdiv?'dropdown':''}>
              <b>{localStorage.getItem('Organisation Name')} <i className="fa fa-angle-down" aria-hidden="true"></i></b>
            </a>
            {/* <div className={toggleorgswitchdiv?'dropdown-menu dropdown-menu-lg dropdown-menu':''}  > */}
            <div className='dropdown-menu dropdown-menu-lg dropdown-menu'  >
              <div className="orgcard card " >
                <div className={`card-body bg-${themeval}`}>
                  <img className="card-img-top " src={localStorage.getItem('Orglogo') || OrgLogo}
                    alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)", borderRadius: "50%", border: "1px solid black" }} />
                </div>
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item bg-${themeval}`}><b >My Organisation</b>
                    <a href='/org' style={{ float: "right", textDecoration: "underline" }} className='text-primary'> Add Organisation</a>
                  </li>
                  {
                    data.map((item, index) => (
                      <li key={index} className={`list-group-item bg-${themeval}`}>
                        <a href="#" style={{ color: "blue", }}>
                          <i className={`fa fa-building text-${btntheme}`} ></i> &nbsp;
                          <span className="orgnamehover" onClick={() => {
                            localStorage.setItem('Organisation', item.org_db_name);
                            localStorage.setItem('Organisation Name', item.org_name);
                            localStorage.setItem('Organisation_details', item.org_db_name);
                            window.location.reload()
                          }}>{item.org_name}</span>
                        </a>
                        <a onClick={() => { localStorage.setItem('Organisation_details', item.org_db_name); window.location.href = './EditOrganisation' }} style={{ float: "right", cursor: "pointer" }}>
                          <i className={`fas fa-cog text-${btntheme}`} ></i> Manage</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </li>
          {/*########################## All Organisation Start ################################# */}

          {/* ######################## Setting  Start #################################*/}
          <li id='setting_all' className="nav-item dropdown" style={{ display: "none" }}>
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="fas fa-cog"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right ">
              <div className={`orgcard card bg-${themeval}`}  >
                <div className="card-body">
                  <span style={{ fontSize: "20px" }}>Setting</span>
                </div>
                <ul className="list-group list-group-flush ">
                  <a href="/EditOrganisation" id='org_profile' > <li className={`list-group-item bg-${themeval} `}><i className={`fa fa-building text-${btntheme}`}></i> &nbsp;
                    <b>Organisation profile</b> </li></a>
                  <a href="/ShowFinancialyear" id='fincial_year_view'><li className={`list-group-item bg-${themeval}`}><i className={`fa fa-calendar text-${btntheme}`} aria-hidden="true"></i>&nbsp;&nbsp;
                    <b>Financial Year</b> </li></a>
                  <a href="/TotalLocation" id='branchs' > <li className={`list-group-item bg-${themeval}`}><i className={`fa fa-map-marker text-${btntheme}`} aria-hidden="true"></i>&nbsp;&nbsp;
                    <b>Branches</b> </li></a>
                  {/* <a href="/ShowPaymentTerm" id='payment_term' > <li className={`list-group-item bg-${themeval}`}><i className={`fa fa-university text-${btntheme}`} aria-hidden="true"></i>&nbsp;&nbsp;
                    <b>Payment Terms</b> </li></a> */}
                  <a href="/ShowCrm" id='crm_data' > <li className={`list-group-item bg-${themeval}`}><i className={`fa fa-link text-${btntheme}`} aria-hidden="true"></i>&nbsp;&nbsp;
                    <b>CRM Master</b> </li></a>
                  <a href="/Showcompliances" id='compliances' > <li className={`list-group-item bg-${themeval}`}><i className={`fa fa-tasks text-${btntheme}`} aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <b>Compliances</b> </li></a>
                  <a href="/showroles" id='roles' > <li className={`list-group-item bg-${themeval}`}><i className={`fa fa-users text-${btntheme}`} aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <b>User Roles</b> </li></a>
                </ul>
              </div>
            </div>
          </li>

          {/* ######################## Setting  END #################################*/}

          {/* ######################## Notifications  Section Start #################################*/}

          {/* <li className="nav-item dropdown " >
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell"></i>
              <span className={`badge badge-${btntheme} navbar-badge`}>15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right ">
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
          </li> */}

          {/* ######################## Notifications Section END #################################*/}



          {/* ######################## User Manual Icon Start ################################# */}
          <li className="nav-item dropdown " >
            <a title='Help' className="nav-link" href="/UserManual">
              <i className="fa fa-question-circle"></i>
            </a>
          </li>

          {/* ######################## User Manual Icon END ################################# */}

          {/* ######################## Full Screen Button  ################################## */}
          <li className="nav-item" >
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>

          {/* ######################## ProfileCard Div  Start ############################### */}
          <li className="nav-item profilediv dropdown p-0" >
            <a className="nav-link p-0" data-toggle="dropdown" href="#" >
              <div className="profile-img image position-relative mr-3" style={{ height: "40px", width: "40px" }}>
                <img src={localStorage.getItem("User_img") || profileimg} className="img-circle mr-4 h-100 w-100 border"
                  alt="User " />
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right ">
              <div className={`profilcard card bg-${themeval} overflow-hidden position-absolute`} >
                <div className="card-body">
                  <img className="card-img-top border rounded-circle" src={localStorage.getItem("User_img") || profileimg} alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)" }} />
                  <h6 className='text-center font-weight-bold'>{localStorage.getItem('User_name')} </h6>
                  <div className='text-center  font-weight-bold'>
                    <h6 >My Organisation:- <span className='text-uppercase'>{localStorage.getItem('Organisation Name')}</span></h6>
                    <a href="/LoginDetails">Profile</a> |
                    <a href="/ChangePassword" className='text-success'> Change Password</a><br />
                    <a href="#" onClick={handleClick} className="text-danger"> Logout</a>
                  </div>
                  <hr />
                  <div className='theme'>Theme
                    <div className='switchdiv d-flex justify-content-between text-center'>
                      <label>Light</label>
                      <label className="switch position-relative">
                        {
                          themeval === 'dark' ?
                            <input type="checkbox" id="switchbtn" onClick={handleswitchdata} defaultChecked /> :
                            <input type="checkbox" id="switchbtn" onClick={handleswitchdata} />
                        }

                        <span className="slider round cursor-pointer"></span>
                      </label>
                      <label>Dark</label>
                    </div>
                    Button Color
                    <div className='color-option'>
                      <button title='Light' className='colordiv bg-light' onClick={handlebtncolor} value="light"></button>
                      <button title='Green' className='colordiv bg-success' onClick={handlebtncolor} value="success"></button>
                      <button title='Black' className='colordiv bg-dark' onClick={handlebtncolor} value="dark"></button>
                      <button title='Info' className='colordiv bg-info' onClick={handlebtncolor} value="info"></button>
                      <button title='yellow' className='colordiv bg-warning' onClick={handlebtncolor} value="warning"></button>
                      <button title='Primary' className='colordiv bg-primary' onClick={handlebtncolor} value="primary"></button>
                      <button title='Red' className='colordiv bg-danger' onClick={handlebtncolor} value="danger"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </li>
          {/* ######################## ProfileCard Div End ############################### */}

        </ul>
      </nav>
    </div>
  );
};

export default Header;


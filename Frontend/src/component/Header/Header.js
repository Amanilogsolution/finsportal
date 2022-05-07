import './header.css';
import React, { useState, useEffect } from "react";
import { TotalOrganistion,UserLogout } from '../../api'
import OrgLogo from "../../images/bg1.jpg";

const Header = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([])
  const currentdb= localStorage.getItem('Organisation');
  useEffect(async () => {
    const organisation = await TotalOrganistion()
    setData(organisation)
    console.log(organisation)
  }, [])

  const handleClick = async()=>{
    const result = await UserLogout(localStorage.getItem('username'))
    console.log(result)
    if(result.status == 'Logout'){
     // localStorage.removeItem("username")
     // localStorage.removeItem("Token")
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
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
        <li className="nav-item" >
            <a
              className="nav-link"
              role="button"
              onClick={() => {
                setShow(!show);
              }}
            >
             <b>{currentdb} <i class="fa fa-angle-down" aria-hidden="true"></i></b>
            </a>
          </li>
          <li className="nav-item" >
            <a
              className="nav-link"
              role="button"
              onClick={() => {
                setShow(!show);
              }}
            >
              <i className="fas fa-cog"></i>
            </a>
          </li>

          <li className="nav-item" >
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
          </li>

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
          <li className="nav-item" >
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button" >
              <i className="fas fa-th-large"></i>
            </a>
          </li>
        </ul>
        {show ? (
          {/* <div className="orgcard">
           
            <h5 className="cardtitle" >Organisation Profile &nbsp;
            <i class="fa fa-times" aria-hidden="true" ></i></h5>
            
          

            <i className="fa fa-building" ></i> &nbsp;
            <a href="/org" className="card-link">
              Orgaisation Profile
            </a>
            {
              data.map(item =>(
                <li><a href="#">{item.org_name}</a></li>
              ))
            }
            
          </div> */},
          <div className="orgcard card" style={{ width: '20rem' }}>

            <div className="card-body">
              <i class="fa fa-times" aria-hidden="true" style={{ display: "flex", flexDirection: "row-reverse" }} onClick={() => {setShow(!show);}}></i>
              <img className="card-img-top " src={OrgLogo} alt="Card image cap" style={{ height: "80px", width: "80px", marginLeft: "50%", transform: "translate(-50%)", borderRadius: "50%", border: "1px solid black" }} />
            </div>
            <div className="card-body" >
              <a href="#">My Account</a> &nbsp; | &nbsp; 
              <a  href='/org' style={{color:"green"}}> Create Organisation</a><br/>
              <a  onClick={handleClick} style={{color:"red",cursor:"pointer",margin:"30%"}}> Sign Out</a>
            </div>
            <ul className="list-group list-group-flush">
              {
                data.map(item => (

                  <a href="#"><li className="list-group-item">
                    <i className="fa fa-building" style={{color:"#333"}}></i> &nbsp;
                    {item.org_name}</li></a>
                ))
              }
            </ul>
         
          </div>
        ) : null
        }
      </nav>

    </div>
  );
};

export default Header;


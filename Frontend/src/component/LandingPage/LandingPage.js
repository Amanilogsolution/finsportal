import React from 'react';
import { Link } from 'react-router-dom'
import './landingpage.css'
import Img from '../../images/finsgrowlogo.png'
import landingimg from '../../images/finance_acc.png'

function LandingPage() {
  return (
    <>
      <div className='LandingDiv'>
        <nav className='landing_navbar'>
          <div className='Logo'>
            <img src={Img} alt="logo" width="100" />
          </div>
          <div className='Menu'>
            <ul className='Menulist'>
              {/* <li>Home</li> */}
              <li className='landing-nav-link'><Link to='#' className="text-dark">About</Link></li>
              <li className='landing-nav-link'><Link to='#' className="text-dark">Help</Link></li>
              <li><Link to='/Signin'><button className='signin-btn btn text-white'>SignIn</button></Link></li>
              <li><Link to='/Signup'><button className='signin-btn btn text-white'>SignUp</button></Link></li>

            </ul>
          </div>
        </nav>
        <section className='sectioncont'>
          <div className='landingimg'>
            <img src={landingimg} alt="logo" />
          </div>
          <div className='content'>
            <h1><b>Financial Software</b></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nisi dolor sint praesentium nemo, quibusdam, laborum nobis delectus reiciendis accusantium quas, consequatur itaque. Id nihil earum ad perspiciatis cupiditate inventore repudiandae sapiente veniam possimus accusantium asperiores corporis, consectetur eaque, soluta tempora voluptas vero dolorum deserunt dolorem </p>
          </div>
        </section>
        <footer className='landing-footer'>
        <div className='medialink'>
        <ul>
          <li><i className="fa fa-phone phone-icon"></i></li>
          <li><i className="fa fa-phone phone-icon"></i></li>
          <li><i className="fa fa-phone phone-icon"></i></li>
        </ul>
        </div>
          {/* <span> */}
            {/* <i className="fa fa-phone phone-icon" ></i>  */}
            {/* Contact us:-
            +91 9876543210</span> */}
        </footer>

      </div>
    </>
  );
}

export default LandingPage;
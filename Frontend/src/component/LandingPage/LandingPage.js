import React from 'react';
import { Link } from 'react-router-dom'
import './landingpage.css'
import Img from '../../images/finsgrowlogo.png'
import landingimg from '../../images/img.png'

function LandingPage() {
  return (
    <>
      <div className='LandingDiv'>
        <nav className='landing_navbar d-flex '>
          <div className='Logo'>
            <img src={Img} alt="logo" />
          </div>
          <div className='Menu'>
            <ul className='Menulist d-flex'>
              <li className='landing-nav-link'><Link to='#' className="text-dark">About</Link></li>
              <li className='landing-nav-link'><Link to='#' className="text-dark">Help</Link></li>
              <li><Link to='/Signin'><button className='signin-btn btn rounded-0 py-2 px-3'>Sign In</button></Link></li>
              {/* <li><Link to='/Signup'><button className='signin-btn btn text-white'>SignUp</button></Link></li> */}

            </ul>
          </div>
        </nav>
        <section className='sectioncont '>
          <div className='content d-flex flex-column'>
            <h1 className='content-heading'><span style={{ textDecoration: 'underline', textDecorationColor: '#dcaffe', textDecorationThickness: '20%' }}>Easy</span> Way <br /> to manage<br /> your <span className='px-1' style={{ background: '#f4ed82' }}>money</span></h1>
            <p>Connect your money to your Website & brands.</p>
            <a href='/Signup' className='content-btn px-3 d-flex align-items-center cursor-pointer'>Get Started <span className="material-symbols-outlined animated-arrow"> trending_flat</span></a>
          </div>
          <div className='landingimg'>
            <img src={landingimg} alt="logo" />
          </div>
        </section>

      </div>

    </>
  );
}

export default LandingPage;
import React from 'react'
import './landingpage.css'
import Img from '../../images/finsgrowlogo.png'
import landingimg from '../../images/finance_acc.png'

function LandingPage() {
  return (
    <>
    <div className='LandingDiv'>
    <nav className='navbar'>
    <div className='Logo'>
        <img src={Img} alt="logo" width="100"/>
    </div>
    <div className='Menu'>
        <ul className='Menulist'>
            <li>Home</li>
            <li>About</li>
            <li>Help</li>
            <li>SignIn</li>
        </ul>
    </div>
    </nav>
    <section className='sectioncont'>
    <div className='landingimg'>
    <img src={landingimg} alt="logo"/>

    </div>
    <div className='content'>
        <h1><b>Financial Software</b></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nisi dolor sint praesentium nemo, quibusdam, laborum nobis delectus reiciendis accusantium quas, consequatur itaque. Id nihil earum ad perspiciatis cupiditate inventore repudiandae sapiente veniam possimus accusantium asperiores corporis, consectetur eaque, soluta tempora voluptas vero dolorum deserunt dolorem </p>
    </div>

    </section>

    </div>
    </>
  )
}

export default LandingPage

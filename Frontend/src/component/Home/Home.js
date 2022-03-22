import React from 'react';
import './Home.css';
// import Image from '../images/logo.png';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
// import Login from './Login';

function Home() {
  return (
    <div  className="wrapper">
   <div className="preloader flex-column justify-content-center align-items-center">
   <div class="spinner-border" role="status">
</div>
</div>
      <Header />
      <Menu/>
      <Dashboard/>
      <Footer/> 
       {/* <Login/> */}
    </div>
  );
}

export default Home;

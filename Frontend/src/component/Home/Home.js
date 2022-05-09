import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <div  className="wrapper">
   <div className="preloader flex-column justify-content-center align-items-center">
   <div className="spinner-border" role="status">
</div>
</div>
      <Header />
      <Menu/>
      <Dashboard/>
      <Footer/> 
    </div>
  );
}

export default Home;

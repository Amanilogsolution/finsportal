import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';

function Home() {
  let themecolor = localStorage.getItem('themetype') !== null ? localStorage.getItem('themetype') : 'light';
  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status">
        </div>
      </div>
      <Header />
      {/* <Menu/> */}
      <Dashboard theme={themecolor} />
      <Footer theme={themecolor} />
    </div>
  );
}

export default Home;

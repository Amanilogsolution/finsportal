import React from 'react';
import Header from '../Header/Header';
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
      <Dashboard />
      <Footer theme={themecolor} />
    </div>
  );
}

export default Home;

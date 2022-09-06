import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';

function Home() {
  const [themeval, setThemval] = useState('light')

  useEffect(() => {
    const themecolor = localStorage.getItem('themetype')
    setThemval(themecolor)
  }, [])
  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status">
        </div>
      </div>
      <Header />
      {/* <Menu/> */}
      <Dashboard theme={themeval}/>
      <Footer theme={themeval} />
    </div>
  );
}

export default Home;

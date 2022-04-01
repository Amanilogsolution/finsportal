import React from 'react';
import './App.css';
import Header from './Header';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Footer from './Footer';
// import Login from './Login';

function Home() {
  return (
    <div  className="wrapper">
   <div className="preloader flex-column justify-content-center align-items-center">
       <img className="animation__shake" src="public/dist/img/AdminLTELogo.png" alt="Awl" height={60} width={60} />
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

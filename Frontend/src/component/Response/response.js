import React, { useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
// import { InsertCountry } from '../../../api';

const Response = () => {
    return (
        <div>
        <div className="wrapper">
          <div className="preloader flex-column justify-content-center align-items-center">
            <div className="spinner-border" role="status"> </div>
          </div>
          <Header />
          <Menu />  
          <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Response</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>

                
                      </form>
                    </article>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

          </div>
          </div>
            )
}

export default Response

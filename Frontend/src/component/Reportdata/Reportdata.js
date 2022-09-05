import React, { useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import InvoiceReport from './Reports/InvoiceReport';

const Reportdata = () => {
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Filter</button>

            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Report</h3>
              <div className="row ">
                <div className="col">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                <InvoiceReport/>

                      </form>
                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Start */}
          <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Filter</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">

                  <div className="form-row" >
                    <label htmlFor="location" className="col-md-2 col-form-label font-weight-normal">Location</label>
                    <div className="col form-group" f>
                      <select type="text" className="form-control col" id='location' >
                        <option value='' hidden>Select Loaction</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row" >
                    <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                    <div className="col form-group" f>
                      <select type="text" className="form-control col" id='customer' >
                        <option value='all'>All</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row" >
                    <label htmlFor="from_date" className="col-md-2 col-form-label font-weight-normal">From</label>
                    <div className="col form-group" f>
                      <input type="date" className="form-control col" id='from_date' />

                    </div>
                  </div>
                  <div className="form-row" >
                    <label htmlFor="to_date" className="col-md-2 col-form-label font-weight-normal">TO</label>
                    <div className="col form-group" f>
                      <input type="date" className="form-control col" id='to_date' />

                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal End */}
        </div>
        <Footer />

      </div>
    </div>
  )
}

export default Reportdata

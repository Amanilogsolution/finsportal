import React, { useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Filter</button>

            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Report</h3>
              <div className="row ">
                <div className="col">
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

         {/* Modal Start */}
         <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
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

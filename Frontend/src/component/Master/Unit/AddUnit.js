import React from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { InsertUnit } from '../../../api';

const AddUnit = () => {

  const handleClick = async (e) => {
    e.preventDefault();
    const unit_name = document.getElementById('unit_name').value;
    const unit_symbol = document.getElementById('unit_symbol').value;

    if (!unit_name || !unit_symbol) {
      alert('Enter data')
    }
    else {
      const result = await InsertUnit(unit_name, unit_symbol, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
      if (result == "Already") {
        alert('Unit Already ')
      } else {
        alert('Unit Added')
        window.location.href = '/ShowUnit'
      }
    }

  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper`}>
        <div className="container-fluid">
          <br /> <h3 className="ml-5">Add Unit</h3>
          <div className="card" >
            <article className={`card-body`}>
              <form autoComplete='off'>
                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Unit Name</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='unit_name' />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Unit Symbol</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='unit_symbol' />
                  </div>
                </div>

              </form>
            </article>
            <div className={`border-top card-footer`}>
              <button className="btn btn-success" onClick={handleClick} >Save</button>
              <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowUnit" }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer  />
    </div>
  )

}

export default AddUnit

import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Selectfincialyear, UpdateFincialyear } from '../../../api'


const Updatefincialyear = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetch = async () => {
      const result = await Selectfincialyear(localStorage.getItem('Organisation'), localStorage.getItem('FinsyearSno'))
      setData(result)
      console.log(result)
      if (result.financial_year_lock === 'Lock') {
        document.getElementById('lockFinancialyear').checked = true
      }
    }
    fetch()
  }, [])


  const handelsave = async (e) => {
    e.preventDefault();

    const invoice_ser = document.getElementById('invoiceser').value;
    const voucher_ser = document.getElementById('voucher').value;
    const po_ser = document.getElementById('po_series').value;

    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')
    const lock = document.getElementById('lockFinancialyear').checked;
    let lockscreen
    lock === true ? lockscreen = 'Lock' : lockscreen = 'UnLock';

    
    if (invoice_ser.length > 6 || voucher_ser.length > 4 || po_ser.length > 6) {
      alert("invoice Series is must be smaller then 6 char and voucher is 4")
    }
    else {
      const result = await UpdateFincialyear(org, invoice_ser, voucher_ser, User_id, localStorage.getItem('FinsyearSno'),lockscreen,po_ser)
      if (result[0] > 0) {
        alert("Updated")
        localStorage.removeItem('FinsyearSno');
        window.location.href = "./ShowFinancialyear"
      }
      else {
        alert("Server Error!");
        window.location.reload();
      }

    }
  }



  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className="container-fluid">
          <br /> <h3 className=" ml-5">Edit Financial Year</h3> 
          <div className="card w-100">
            <article className={`card-body `}>
              <form>
                <div className="form-row">
                  <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Fincial year</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='fincialyear' disabled value={data.fin_year} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="from_date" className="col-md-2 col-form-label font-weight-normal">From date</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='from_date' disabled value={data.from_date} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="to_date" className="col-md-2 col-form-label font-weight-normal">To Date</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='to_date' disabled value={data.to_date} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Year</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='lastyear' disabled value={data.year} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="invoiceser" className="col-md-2 col-form-label font-weight-normal">Invoice Series</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='invoiceser' defaultValue={data.invoice_ser}  maxLength={6} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="voucher" className="col-md-2 col-form-label font-weight-normal">Voucher Series</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='voucher' defaultValue={data.voucher_ser} maxLength={4} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="po_series" className="col-md-2 col-form-label font-weight-normal">PO Series</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='po_series' defaultValue={data.po_ser}  maxLength={4} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="voucher" className="col-md-2 col-form-label font-weight-normal">Lock Financial Year</label>
                  <div className="col form-group">
                    <input type="checkbox" style={{height:"40px" ,width:"20px"}} id='lockFinancialyear'  />
                  </div>
                </div>
              </form>
            </article>
            <div className={`border-top card-footer `}>
              <button className="btn btn-success" onClick={handelsave}>Save</button>
              <button className="btn btn-secondary ml-3" onClick={() => {
                localStorage.removeItem('FinsyearSno');
                window.location.href = "./ShowFinancialyear"
              }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}


export default Updatefincialyear

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

    const so_ser = document.getElementById('so_ser').value;
    const cn_ser = document.getElementById('cn_ser').value;
    const dn_ser = document.getElementById('dn_ser').value;
    const jv_ser = document.getElementById('jv_ser').value;

    
    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')
    const sno = localStorage.getItem('FinsyearSno')

    const lock = document.getElementById('lockFinancialyear').checked;
    let lockscreen
    lock === true ? lockscreen = 'Lock' : lockscreen = 'UnLock';

    if (!invoice_ser || !voucher_ser || !po_ser || !jv_ser) {
      alert('All Fields are mandatory')
    }
    else {

      if (invoice_ser.length > 5 || voucher_ser.length > 4 || po_ser.length > 4 || so_ser.length > 4 || cn_ser.length > 4 || dn_ser.length > 4 || jv_ser.length>4) {
        alert("invoice Series is must be smaller then 6 char and voucher is 4")
      }
      else {
        const result = await UpdateFincialyear(org, sno, invoice_ser, voucher_ser, lockscreen, po_ser, so_ser, cn_ser, dn_ser,jv_ser, User_id)
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
                  <div className="col form-row">
                    <label htmlFor="fincialyear" className="col-md-4 col-form-label font-weight-normal">Fincial year</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='fincialyear' disabled value={data.fin_year} />
                    </div>
                  </div>

                  <div className="col form-row">
                    <label htmlFor="fincialyear" className="col-md-4 col-form-label font-weight-normal">Year</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='lastyear' disabled value={data.year} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="from_date" className="col-md-4 col-form-label font-weight-normal">From date</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='from_date' disabled value={data.from_date} />
                    </div>
                  </div>
                  <div className=" col form-row">
                    <label htmlFor="to_date" className="col-md-4 col-form-label font-weight-normal">To Date</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='to_date' disabled value={data.to_date} />
                    </div>
                  </div>
                </div>


                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="invoiceser" className="col-md-4 col-form-label font-weight-normal">Invoice Series <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='invoiceser' defaultValue={data.invoice_ser} maxLength={5} />
                      <small >Invoice Series not more than 5 Character</small>
                    </div>
                  </div>
                  <div className="col form-row">
                    <label htmlFor="voucher" className="col-md-4 col-form-label font-weight-normal">Voucher Series <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 " id='voucher' defaultValue={data.voucher_ser} maxLength={4} />
                      <small >Voucher Series not more than 4 Character</small>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="po_series" className="col-md-4 col-form-label font-weight-normal">Purchase Order Series <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='po_series' defaultValue={data.po_ser} maxLength={4} />
                      <small >Purchase Order Series not more than 4 Character</small>
                    </div>
                  </div>
                  <div className="col form-row">
                    <label htmlFor="po_series" className="col-md-4 col-form-label font-weight-normal">Sales Order Series <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='so_ser' defaultValue={data.so_ser} maxLength={4} />
                      <small >Sales Order Series not more than 4 Character</small>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="po_series" className="col-md-4 col-form-label font-weight-normal">CreditNotes Series <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='cn_ser' defaultValue={data.cn_ser} maxLength={4} />
                      <small >CreditNotes Series not more than 4 Character</small>
                    </div>
                  </div>
                  <div className="col form-row">
                    <label htmlFor="po_series" className="col-md-4 col-form-label font-weight-normal">DebitNotes Series <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='dn_ser' defaultValue={data.dn_ser} maxLength={4} />
                      <small >DebitNotes Series not more than 4 Character</small>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="jv_ser" className="col-md-2 col-form-label font-weight-normal">Journal Voucher Series <span className='text-danger'>*</span></label>
                    <div className="col-md-4 form-group">
                      <input type="text" className="form-control col-md-10" id='jv_ser' defaultValue={data.jv_ser} maxLength={4} />
                      <small >Journal Voucher Series not more than 4 Character</small>
                    </div>
                  </div>

                </div>

                <div className="form-row">
                  <label htmlFor="voucher" className="col-md-2 col-form-label font-weight-normal">Lock Financial Year</label>
                  <div className="col form-group">
                    <input type="checkbox" style={{ height: "40px", width: "20px" }} id='lockFinancialyear' />
                  </div>
                </div>
              </form>
            </article>
            <div className={`border-top card-footer `}>
              <button className="btn btn-success" onClick={handelsave}>Update</button>
              <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('FinsyearSno'); window.location.href = "./ShowFinancialyear" }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default Updatefincialyear

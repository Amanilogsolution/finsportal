import React, { useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Addfincialyear } from '../../../api'


const Fincialyear = () => {
  const [from_date, setFromDate] = useState('YYYY')
  const [to_date, setToDate] = useState('YYYY')

  const st = '' + to_date;
  const year = st.slice(2)

  const handleChangefromdate = (e) => {
    const date = new Date(e.target.value)
    const year = date.getFullYear()
    setFromDate(year)
  }

  const handleChangetodate = (e) => {
    const date = new Date(e.target.value)
    const year = date.getFullYear()
    setToDate(year)
  }

  const handelsave = async (e) => {
    e.preventDefault();
    const fincialyear = document.getElementById('fincialyear').value;
    const year = document.getElementById('lastyear').value;
    const from_date = document.getElementById('from_date').value;
    const to_date = document.getElementById('to_date').value;
    let invoice_ser = document.getElementById('invoiceser').value;
    invoice_ser = invoice_ser.toUpperCase();
    let voucher_ser = document.getElementById('voucher').value;
    voucher_ser = voucher_ser.toUpperCase();

    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')


    if (!fincialyear || !year || !from_date || !to_date || invoice_ser.length > 5 || voucher_ser.length > 4) {
      alert("invoice Series is must be smaller then 5 char and voucher is 4")
    }
    else {
      const result = await Addfincialyear(org, fincialyear, year, from_date, to_date, invoice_ser, voucher_ser, User_id)

      if (result.rowsAffected[0] > 0) {
        alert("Data Added");
        window.location.href = "./ShowFinancialyear"
      }
      else {
        alert("Server error !")
        
      }

    }

  }
  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Financial Year</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Fincial year</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='fincialyear' disabled value={from_date + "-" + to_date} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="from_date" className="col-md-2 col-form-label font-weight-normal">From date</label>
                          <div className="col form-group">
                            <input type="date" className="form-control col-md-4" id='from_date' onChange={handleChangefromdate} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="to_date" className="col-md-2 col-form-label font-weight-normal">To Date</label>
                          <div className="col form-group">
                            <input type="date" className="form-control col-md-4" id='to_date' onChange={handleChangetodate} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Year</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='lastyear' disabled value={year} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="invoiceser" className="col-md-2 col-form-label font-weight-normal">Invoice Series</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='invoiceser' maxLength={5} style={{ textTransform: "uppercase" }} />
                            <small style={{ color: "red" }}>Invoice Series must be maximum 5 Character</small>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="voucher" className="col-md-2 col-form-label font-weight-normal">Voucher Series</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='voucher' maxLength={4} />
                            <small style={{ color: "red" }}>Voucher Series must be maximum 4 Character</small>
                          </div>
                        </div>

                        <div className="border-top card-body">
                          <button type='submit' className="btn btn-success" onClick={handelsave}>Save</button>
                          <button className="btn btn-light ml-3" onClick={(e)=>{e.preventDefault(); window.location.href='./ShowFinancialyear'}}>Cancel</button>
                        </div>
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


export default Fincialyear

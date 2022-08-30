import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Selectfincialyear, UpdateFincialyear } from '../../../api'


const Updatefincialyear = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetch = async () => {
      const result = await Selectfincialyear(localStorage.getItem('Organisation'), localStorage.getItem('FinsyearSno'))
      setData(result)
    }
    fetch()
  }, [])


  const handelsave = async (e) => {
    e.preventDefault();

    const invoice_ser = document.getElementById('invoiceser').value;
    const voucher_ser = document.getElementById('voucher').value;
    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')

    if (invoice_ser.length > 6 || voucher_ser.length > 4) {
      alert("invoice Series is must be smaller then 6 char and voucher is 4")
    }
    else {
      const result = await UpdateFincialyear(org, invoice_ser, voucher_ser, User_id, localStorage.getItem('FinsyearSno'))
      if (result[0] > 0) {
        alert("Updated")
        localStorage.removeItem('FinsyearSno');
        window.location.href = "./showfincialyear"

      }
      else {
        alert("Server Error!");
        window.location.reload();
      }

    }
  }


  const handleChangeinvoice = (e) => {
    setData({ ...data, invoice_ser: e.target.value })

  }
  const handleChangevoucher = (e) => {
    setData({ ...data, voucher_ser: e.target.value })

  }

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
              <br /> <h3 className="text-left ml-5">Fincial Year</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
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
                            <input type="text" className="form-control col-md-4" id='invoiceser' value={data.invoice_ser} onChange={handleChangeinvoice} maxLength={6} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="voucher" className="col-md-2 col-form-label font-weight-normal">Voucher Series</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='voucher' value={data.voucher_ser} onChange={handleChangevoucher} maxLength={4} />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handelsave}>Save</button>
                      <button className="btn btn-light ml-3" onClick={() => {
                        localStorage.removeItem('FinsyearSno');
                        window.location.href = "./showfincialyear"
                      }}>Cancel</button>
                    </div>
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


export default Updatefincialyear

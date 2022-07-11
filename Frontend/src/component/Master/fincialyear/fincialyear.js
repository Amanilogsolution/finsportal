import React, { useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
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
    console.log(year)
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
    

    // let vendmast= document.getElementById('vendmast').value;
    // vendmast= vendmast.toUpperCase();
    // let vendid= document.getElementById('vendid').value;
    // vendid= vendid.toUpperCase()
    // let custmast= document.getElementById('custmast').value;
    // custmast= custmast.toUpperCase();
    // let custid= document.getElementById('custid').value;
    // custid= custid.toUpperCase();
    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')

    // if(vendmast.length>5 || vendid.length>5 ||custmast.length>5 ||custid>5){
    //   alert("ID's must be smaller then 4 char.")
    // }

    // console.log(fincialyear,year,from_date,to_date,invoice_ser,voucher_ser,org,User_id)
    if (invoice_ser.length > 6 || voucher_ser.length>4) {
      alert("invoice Series is must be smaller then 6 char and voucher is 4")
    }
    else {
      const result = await Addfincialyear(org, fincialyear, year, from_date, to_date, invoice_ser,voucher_ser, User_id)

      if (result.rowsAffected[0] > 0) {
        alert("Data Added");
        window.location.href = "./showfincialyear"
      }
      else{
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
                            <input type="text" className="form-control col-md-4" id='invoiceser'  maxLength={6} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="voucher" className="col-md-2 col-form-label font-weight-normal">Voucher Series</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='voucher' maxLength={4} />
                          </div>
                        </div>
                        {/* <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Vendor Master</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='vendmast' />
                          </div>
                        </div> */}
                        {/* <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Vendor Id</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='vendid' />
                          </div>
                        </div> */}
                        {/* <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Customer Master</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='custmast' />
                          </div>
                        </div> */}
                        {/* <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Customer Id</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='custid' />
                          </div>
                        </div> */}
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handelsave}>Save</button>
                      <button className="btn btn-light ml-3" >Cancel</button>
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


export default Fincialyear

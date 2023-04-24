import React, { useState } from 'react'
import Header from "../../Header/Header";
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

    let purchase_ser = document.getElementById('po').value;
    purchase_ser = purchase_ser.toUpperCase();

    let salesorder_ser = document.getElementById('so').value;
    salesorder_ser = salesorder_ser.toUpperCase();

    let creditNotes = document.getElementById('creditnotes').value;
    creditNotes = creditNotes.toUpperCase();

    let debitNotes = document.getElementById('debitnotes').value;
    debitNotes = debitNotes.toUpperCase();

    const org = localStorage.getItem('Organisation')
    const User_id = localStorage.getItem('User_id')






    if (!fincialyear || !year || !from_date || !to_date || !invoice_ser || !voucher_ser || !purchase_ser || !salesorder_ser || !creditNotes || !debitNotes) {
      alert('All Fields are mandatory')
    }
    else {
      if (invoice_ser.length > 5 || voucher_ser.length > 4 || purchase_ser.length > 4 || salesorder_ser.length > 4 || creditNotes.length > 4 || debitNotes.length > 4) {
        alert("ALl Series are must be smaller then given no. of char ")
      }

      else {
        console.log(org, fincialyear, year, from_date, to_date, 'invoice_ser', invoice_ser, 'voucher_ser', voucher_ser, User_id, 'purchase_ser', purchase_ser,
          'salesorder_ser', salesorder_ser, 'creditNotes', creditNotes, 'debitNotes', debitNotes)

        // const result = await Addfincialyear(org, fincialyear, year, from_date, to_date, invoice_ser, voucher_ser, User_id, purchase_ser)

        // if (result.rowsAffected[0] > 0) {
        //   alert("Data Added");
        //   window.location.href = "./ShowFinancialyear"
        // }
        // else {
        //   alert("Server error !")

        // }
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
          <h3 className="pt-4 pb-2 ml-5">Financial Year</h3>
          <div className="card w-100">
            <article className='card-body'>
              <form autoComplete='off'>
                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="from_date" className="col-md-4 col-form-label font-weight-normal">From date</label>
                    <div className="col form-group">
                      <input type="date" className="form-control col-md-10" id='from_date' onChange={handleChangefromdate} />
                    </div>
                  </div>

                  <div className="col form-row">
                    <label htmlFor="from_date" className="col-md-4 col-form-label font-weight-normal">To date</label>
                    <div className="col form-group">
                      <input type="date" className="form-control col-md-10" id='to_date' onChange={handleChangetodate} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="fincialyear" className="col-md-4 col-form-label font-weight-normal">Fincial year</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='fincialyear' disabled value={from_date + "-" + to_date} />
                    </div>
                  </div>

                  <div className="col form-row">
                    <label htmlFor="fincialyear" className="col-md-4 col-form-label font-weight-normal">Year</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='lastyear' disabled value={year} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="invoiceser" className="col-md-4 col-form-label font-weight-normal">Invoice Series</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 text-uppercase" id='invoiceser' maxLength={5} />
                      <small >Invoice Series not more than 5 Character</small>
                    </div>
                  </div>

                  <div className="col form-row">
                    <label htmlFor="voucher" className="col-md-4 col-form-label font-weight-normal">Voucher Series</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 text-uppercase" id='voucher' maxLength={4} />
                      <small >Voucher Series must be 4 Character</small>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="po" className="col-md-4 col-form-label font-weight-normal">Purchase Order Series</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 text-uppercase" id='po' maxLength={4} />
                      <small >Purchase Order Series must be 4 Character</small>
                    </div>
                  </div>

                  <div className="col form-row">
                    <label htmlFor="so" className="col-md-4 col-form-label font-weight-normal">Sales Order Series</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 text-uppercase" id='so' minLength={4} maxLength={4} />
                      <small >Sales Order Series must be 4 Character</small>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-row">
                    <label htmlFor="po" className="col-md-4 col-form-label font-weight-normal">CreditNotes Series</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 text-uppercase" id='creditnotes' maxLength={4} />
                      <small >CreditNotes Series must be 4 Character</small>
                    </div>
                  </div>

                  <div className="col form-row">
                    <label htmlFor="so" className="col-md-4 col-form-label font-weight-normal">DebitNotes Series</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10 text-uppercase" id='debitnotes' minLength={4} maxLength={4} />
                      <small >DebitNotes Series must be 4 Character</small>
                    </div>
                  </div>
                </div>


              </form>
            </article>

            <div className="border-top card-footer">
              <button type='submit' className="btn btn-success" onClick={handelsave}>Save</button>
              <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = './ShowFinancialyear' }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default Fincialyear

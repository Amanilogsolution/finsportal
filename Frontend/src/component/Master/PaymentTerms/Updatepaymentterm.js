import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { updatePaymentterm, ShowPaymentTerm } from "../../../api";
import LoadingPage from '../../loadingPage/loadingPage';


const UpdatePaymentTerm = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})


  //############## API Call #################
  useEffect(() => {
    const fetchdata = async () => {
      const result = await ShowPaymentTerm(localStorage.getItem('Organisation'), localStorage.getItem('TermSno'))
      setData(result)
      setLoading(true)
    }
    fetchdata()
  }, []);

  // ################  Data Submit #####################
  const handleClick = async (e) => {
    e.preventDefault();
    const paymentterm = document.getElementById("paymentterm").value;
    const paymentdays = document.getElementById("paymentdays").value;

    if (!paymentterm || !paymentdays) {
      alert('Enter data')
    }
    else {
      const result = await updatePaymentterm(localStorage.getItem('TermSno'), localStorage.getItem('Organisation'), paymentterm, paymentdays, localStorage.getItem('User_id'));
      if (result === "Updated") {
        alert('Data Updated')
        localStorage.removeItem('TermSno')
        window.location.href = '/ShowPaymentTerm'
      }
      else {
        alert('Server Error')
        window.location.reload();
      }
    }

  }


  return (
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className="container-fluid">
              <h3 className="py-3 ml-5">Update Payment Term</h3>
              <div className="card w-100">
                <article className='card-body'>
                  <form autoComplete='off'>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Term</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='paymentterm' defaultValue={data.term} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">No of Days</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='paymentdays' defaultValue={data.term_days} />
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./ShowPaymentTerm" }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )

}

export default UpdatePaymentTerm

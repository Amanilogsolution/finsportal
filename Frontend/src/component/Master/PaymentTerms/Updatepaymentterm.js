import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { updatePaymentterm, ShowPaymentTerm } from "../../../api";


const UpdatePaymentTerm = () => {
  const [data, setData] = useState({})

  //############## API Call #################
  useEffect(() => {
    const fetchdata = async () => {
      const result = await ShowPaymentTerm(localStorage.getItem('Organisation'), localStorage.getItem('TermSno'))
      setData(result)
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

  const handleChangeterm = (e) => {
    setData({ ...data, term: e.target.value })
  }

  const handleChangetermdays = (e) => {
    setData({ ...data, term_days: e.target.value })
  }


  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Update Payment Term</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Term</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='paymentterm' value={data.term} onChange={handleChangeterm} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">No of Days</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='paymentdays' value={data.term_days} onChange={handleChangetermdays} />
                          </div>
                        </div>

                        <div className="border-top card-body">
                          <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                          <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
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

export default UpdatePaymentTerm

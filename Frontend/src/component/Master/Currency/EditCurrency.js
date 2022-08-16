import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { UpdateCurrency } from '../../../api';
import { showCurrency } from '../../../api';

const EditCurrency = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchdata = async () => {
      const result = await showCurrency(localStorage.getItem('CurrencySno'), localStorage.getItem("Organisation"));
      setData(result)
    }
    fetchdata();

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const country_name = document.getElementById('country_name').value;
    const country_code = document.getElementById('country_code').value;
    const currency_name = document.getElementById('currency_name').value;
    const currency_code = document.getElementById('currency_code').value;
    const result = await UpdateCurrency(localStorage.getItem('CurrencySno'), localStorage.getItem("Organisation"), localStorage.getItem("User_id"), country_name, country_code, currency_name, currency_code);
    if (result) {
      alert('Data Updated');
      localStorage.removeItem('CurrencySno')
      window.location.href = '/ShowCurrency'
    }
  }

  const handleChangeCname = (e) => {
    setData({ ...data, country_name: e.target.value })
  }
  const handleChangeCcode = (e) => {
    setData({ ...data, country_code: e.target.value })
  }
  const handleChangeCurrencyname = (e) => {
    setData({ ...data, currency_name: e.target.value })
  }
  const handleChangeCurrencycode = (e) => {
    setData({ ...data, currency_code: e.target.value })
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
              <br /> <h3 className="text-left ml-5">Edit Currency</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_code' value={data.country_code} onChange={(e) => handleChangeCcode(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_name' value={data.country_name} onChange={(e) => handleChangeCname(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='currency_name' value={data.country_name} onChange={(e) => handleChangeCurrencyname(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='currency_code' value={data.currency_code} onChange={(e) => handleChangeCurrencycode(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowCurrency" }}>Cancel</button>
                    </div>
                  </div>
                  {/* card.// */}
                </div>
                {/* col.//*/}
              </div>
              {/* row.//*/}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )

}
export default EditCurrency

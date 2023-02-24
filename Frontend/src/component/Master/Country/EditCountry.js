import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showcountry, updatecountry } from '../../../api'

const EditCountry = () => {
  const [data, setData] = useState([])
  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const result = await showcountry(localStorage.getItem('countrySno'))
      setData(result)
    }
    fetchdata();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const country_name = document.getElementById('country_name').value;
    const country_id = document.getElementById('country_id').value;
    const country_code = document.getElementById('country_code').value;
    const country_phonecode = document.getElementById('country_phonecode').value;
    const result = await updatecountry(localStorage.getItem('countrySno'), localStorage.getItem("User_id"), country_name, country_id, country_code, country_phonecode)
    if (result) {
      alert('Data Updated ');
      localStorage.removeItem('countrySno')
      window.location.href = '/ShowCountry'
    }
  }
  const handleChangeCname = (e) => {
    setData({ ...data, country_name: e.target.value })
  }
  const handleChangeCid = (e) => {
    setData({ ...data, country_id: e.target.value })
  }
  const handleChangeCcode = (e) => {
    setData({ ...data, country_code: e.target.value })
  }
  const handleChangeCp = (e) => {
    const no= e.target.value ;
    if(no.length === 11) return false;
    setData({ ...data, country_phonecode: no})
  }


  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themetype}`}>
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Country</h3>
              <div className="row ">
                <div className="col ml-1">
                  <div className="card" style={{ width: "100%" }}>
                    <article className={`card-body bg-${themetype}`}>
                      <form>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_name' value={data.country_name} onChange={(e) => handleChangeCname(e)} required/>
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country ID</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_id' value={data.country_id} onChange={(e) => handleChangeCid(e)} maxLength={5} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_code' value={data.country_code} onChange={(e) => handleChangeCcode(e)} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Phone Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='country_phonecode' value={data.country_phonecode} onChange={(e) => handleChangeCp(e)} />
                          </div>
                        </div>
                        <div className={`border-top card-body bg-${themetype}`}>
                          <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                          <button className="btn btn-light ml-3" onClick={() => {  localStorage.removeItem('countrySno');window.location.href = "./ShowState" }}>Cancel</button>
                        </div>
                      </form>
                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themetype}/>
      </div>
    </div>
  )

}
export default EditCountry;

import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showunit } from '../../../api/index.js'
import { UpdateUnit } from '../../../api/index.js'

 const EditUnit = () => {
     const [data,setData] = useState({})
     useEffect(async() => {
       const Token = localStorage.getItem('Token')
       console.log(Token)
         const result = await showunit(localStorage.getItem('unitSno'),Token,localStorage.getItem('Organisation'));
         setData(result)
        }, [])


        const handleClick = async(e) => {
            e.preventDefault();
            const unit_name = document.getElementById('unit_name').value;
            const unit_symbol = document.getElementById('unit_symbol').value;
            
            
            const result = await UpdateUnit(localStorage.getItem('unitSno'),unit_name,unit_symbol,localStorage.getItem('Organisation'));
            if(result){
                window.location.href = '/ShowUnit'
            }
        }



  const handleChangeCname = (e) => {
    setData({ ...data, unit_name: e.target.value })
  }
  const handleChangeSname = (e) => {
    setData({ ...data, unit_symbol: e.target.value })
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
              <br /> <h3 className="text-left ml-5">Edit Unit</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="unit_name" className="col-md-2 col-form-label font-weight-normal">Unit Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='unit_name' value={data.unit_name} onChange={(e) => handleChangeCname(e)} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="unit_symbol" className="col-md-2 col-form-label font-weight-normal">Unit Symbol</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='unit_symbol' value={data.unit_symbol} onChange={(e) => handleChangeSname(e)} />
                          </div>
                        </div>


                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick}>Update</button>
                      <button className="btn btn-light ml-3" onClick={() => window.location.href = './ShowUnit'}>Cancel</button>
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
export default EditUnit

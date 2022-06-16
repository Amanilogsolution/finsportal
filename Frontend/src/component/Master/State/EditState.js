import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {showstate} from '../../../api/index.js'
import {updateState,Activecountries} from '../../../api/index.js'

 const EditState = () => {
     const [data,setData] = useState({})
     const [statetype,setStateType] = useState()
     const [selectCountry,setSelectCountry] = useState([]);
     const [selectedCountry,setSelectedCountry] = useState();
     useEffect(async() => {
       
         const result = await showstate(localStorage.getItem('stateSno'));
         if(result == 401){
         }
         setData(result)
         var name = result.country_name
        //  setSelectCountry(result.country_name)

         const country= await Activecountries()
         setSelectCountry(country)
         

         if(result.state_type == 'state'){
             document.getElementById('State').checked = true

             setStateType('state')
         }
         else{
             document.getElementById('UT').checked = true
             setStateType('UT')
         }

        }, [])

        const handleClick = async(e) => {
            e.preventDefault();
            // const country_name = document.getElementById('Country_name').value;
            const state_name = document.getElementById('State_name').value;
            const state_code = document.getElementById('State_code').value;
            const state_short_name = document.getElementById('State_short').value;
           
             if(selectedCountry == undefined){
            const result = await updateState(localStorage.getItem('stateSno'),data.country_name,state_name,state_code,state_short_name,statetype);
            if(result){
                window.location.href = '/ShowState'
          }
          }else{
            const result = await updateState(localStorage.getItem('stateSno'),selectedCountry,state_name,state_code,state_short_name,statetype);
            if(result){
              window.location.href = '/ShowState'
        }
          }

        }
        const handleChangeSname = (e) => {
            setData({...data,state_name:e.target.value})
        }
        const handleChangeScode = (e) => {
            setData({...data,state_code:e.target.value})
        }
        const handleChangeSshortname = (e) => {
            setData({...data,state_short_name:e.target.value})
        }
        const handleChange = (e) => {
           let state = e.target.value;
            setStateType(state)
        }
        const handleChangeCountry = (e) => {
            let country = e.target.value; 
            setSelectedCountry(country)
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
              <br /> <h3 className="text-left ml-5">Edit State</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            {/* <input type="text" className="form-control col-md-4" id='Country_name' value={data.country_name} onChange={(e) => handleChangeCname(e)}/> */}
                            <select
                              id="inputState"
                              className="form-control col-md-4"
                              onChange={handleChangeCountry}
                              
                            >
                              <option selected default hidden>{data.country_name}</option>
                              {
                                selectCountry.map((data) => (
                                    <option value={data.country_name}>{data.country_name}</option>
                                ))
                                
                              }

                            </select>
                          </div>
                          {/* form-group end.// */}
                        </div>
                         {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='State_name'  value={data.state_name} onChange={(e) => handleChangeSname(e)}/>
                          </div>
                          {/* form-group end.// */}
                        </div>
                         {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='State_code' value={data.state_code} onChange={(e) => handleChangeScode(e)}/>
                          </div>
                          {/* form-group end.// */}
                        </div>
                         {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Short Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='State_short' value={data.state_short_name} onChange={(e) => handleChangeSshortname(e)}/>
                          </div>
                          {/* form-group end.// */}
                        </div>
                         {/* form-group start.// */}

                        <div className="form-row" onChange={handleChange}>
                              <div className="col form-group">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                    Select Type 
                                </label>

                                <label className="form-check form-check-inline">

                                  <input
                                    className="form-check-input"  type="radio"
                                    name="taxpreference"
                                    value="state" 
                                    id="State" 
                                  />State
                                </label>
                                <label className="form-check form-check-inline">

                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="taxpreference"
                                    value="UT" 
                                    id="UT"
                                  />UT
                                  
                                </label>
                              </div>
                            </div>
                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick}>Update</button>
                      <button className="btn btn-light ml-3" onClick={()=>window.location.href='./ShowState'}>Cancel</button>
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
export default EditState

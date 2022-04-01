import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {addstates} from "../../../api";
import { Totalcountry } from '../../../api';


 const  StateMaster = () =>  {
     const [select_type,setStateType] = useState();
     const [selectCountry,setSelectCountry] = useState([]);
     const [selectedCountry,setSelectedCountry] = useState('india');

     useEffect(async() => {
       const result = await Totalcountry()
       console.log(result)
       setSelectCountry(result)
    }, [])

    const handleClick = async(e) => {
        e.preventDefault();
        
        const state_name = document.getElementById("State_name").value;
        const state_code = document.getElementById("state_code").value;
        const state_short_name = document.getElementById("State_Short_Name").value;
        console.log(selectedCountry,state_name,state_code,state_short_name)

       const result =  await addstates(state_name,selectedCountry,state_code,state_short_name,select_type);
       if(result){
           window.location.href='./ShowState'
       }
    }
    const handleChange = (e) => {
        let data = e.target.value
        setStateType(data)
    }
    const handleChangeCountry = (e) => {
        let data = e.target.value
        console.log(data)
        setSelectedCountry(data)
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
              <br /> <h3 className="text-left ml-5">Add State</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                    
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            {/* <input type="text" className="form-control col-md-4" id='Country_name' placeholder /> */}
                            <select
                              id="inputState"
                              className="form-control col-md-4"
                              onChange={handleChangeCountry}
                            
                            >
                              <option selected default hidden value="India">India</option>
                              {
                                selectCountry.map((data) => (
                                    <option value={data.country_name}>{data.country_name}</option>
                                ))
                                
                              }
                            </select>
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='State_name'  placeholder />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='state_code' placeholder />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Short Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='State_Short_Name' placeholder />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row" onChange={handleChange}>
                              <div className="col form-group">
                                <label
                                  htmlfor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                    Select Type 
                                </label>

                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"  type="radio"
                                    name="taxpreference"
                                    value="state"  
                                  />State
                                </label>
                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="taxpreference"
                                    value="UT" 
                                  />UT
                                  
                                </label>
                              </div>
                            </div>
                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick}>Save</button>
                      <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ShowState"}}>Cancel</button>
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

export default StateMaster

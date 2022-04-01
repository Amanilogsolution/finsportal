import React ,{useState,useEffect} from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {showCity} from '../../../api';
import {updateCity} from '../../../api';
import { Totalcountry } from '../../../api';
import { showstateCity } from '../../../api';

 const EditCity = () => {
     const [data,setData] = useState({})
     const [state,setState] = useState()
     const [selectCountry,setSelectCountry] = useState([]);
     const [selectState,setSelectState] = useState([]);
     const [country,setCountry] = useState()

        useEffect(async() => {
            const result = await showCity(localStorage.getItem('citySno'));
            setData(result)
            setState(result.state_name)
            setCountry(result.country_name)
            if(result.country_name){
          
            const statesresult = await showstateCity(result.country_name)
            console.log(statesresult)
            setSelectState(statesresult)
            }

            const country= await Totalcountry()
         console.log(country)
         setSelectCountry(country)
        }, [] )

        const handleClick = async(e) => {
            e.preventDefault();
            const city_id = document.getElementById('city_id').value;
            const city_name = document.getElementById('city_name').value;
            // const state_id = document.getElementById('state_id').value;
            // const state_code = document.getElementById('state_code').value;
            // const country_id = document.getElementById('country_id').value;
            // const country_code = document.getElementById('country_code').value;
            console.log(city_id,city_name,state,country)
            const result = await updateCity(localStorage.getItem('citySno'),city_id,city_name,state,country);
            if(result){
                window.location.href = '/ShowCity'
            }
        }

        const handleChangeCityid = (e) => {
            setData({...data,city_id:e.target.value})
        }
        const handleChangeCityname = (e) => {
            setData({...data,city_name:e.target.value})
        }
        const handleChangeState = async(e) => {
          let data = e.target.value
          console.log(data)
          setState(data)
        }
     
        const handleChangeCountry = async(e) => {
          let country = e.target.value; 
          setCountry(country)
          const statesresult = await showstateCity(country)
          console.log(statesresult)
          console.log(country)
          setTimeout(() => {
            setSelectState(statesresult)
          }, 1000);
        
        
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
                <br /> <h3 className="text-left ml-5">Edit City</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                        <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                            <div className="col form-group">
                            <select
                              id="inputState"
                              className="form-control col-md-4"
                              onChange={handleChangeCountry}
                              
                            >
                              <option selected default hidden>{country}</option>
                              {
                                selectCountry.map((data) => (
                                    <option value={data.country_name}>{data.country_name}</option>
                                ))
                                
                              }

                            </select>                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Name</label>
                            <div className="col form-group">
                            <select
                              id="inputState"
                              className="form-control col-md-4"
                              onChange={handleChangeState}
                            
                            >
                              <option selected default hidden >{data.state_name}</option>
                              {
                                selectState.map((data) => (
                                    <option value={data.state_name}>{data.state_name}</option>
                                ))
                                
                              }
                            </select> 
                            </div>
                            {/* form-group end.// */}
                          </div>
                      
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Id</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='city_id' placeholder value={data.city_id} onChange={(e) => handleChangeCityid(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='city_name'  placeholder value={data.city_name} onChange={(e) => handleChangeCityname(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Update</button>
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


export default EditCity
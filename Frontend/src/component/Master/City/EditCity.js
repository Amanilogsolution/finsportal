import React ,{useState,useEffect} from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {showCity} from '../../../api'
import {updateCity} from '../../../api'


 const EditCity = () => {
     const [data,setData] = useState({})
        useEffect(async() => {
            const result = await showCity(localStorage.getItem('citySno'));
            console.log(result)
            setData(result)
        }, [])

        const handleClick = async(e) => {
            e.preventDefault();
            const city_id = document.getElementById('city_id').value;
            const city_name = document.getElementById('city_name').value;
            const state_id = document.getElementById('state_id').value;
            const state_code = document.getElementById('state_code').value;
            const country_id = document.getElementById('country_id').value;
            const country_code = document.getElementById('country_code').value;

            console.log(state_id)
            const result = await updateCity(localStorage.getItem('citySno'),city_id,city_name,state_id,state_code,country_id,country_code);
            console.log(result)
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
        const handleChangeStateid = (e) => {
            setData({...data,state_id:e.target.value})
        }
        const handleChangeStatecode = (e) => {
            setData({...data,state_code:e.target.value})
        }
        const handleChangeCountryid = (e) => {
            setData({...data,country_id:e.target.value})
        }
        const handleChangeCountrycode = (e) => {
            setData({...data,country_code:e.target.value})
        }
  
    return (
        <div>
        <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
            <div class="spinner-border" role="status"> </div>
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
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Id</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='state_id' placeholder value={data.state_id} onChange={(e) => handleChangeStateid(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='state_code' placeholder value={data.state_code} onChange={(e) => handleChangeStatecode(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
                         < div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Id</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='country_id' placeholder value={data.country_id} onChange={(e) => handleChangeCountryid(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='country_code' placeholder value={data.country_code} onChange={(e) => handleChangeCountrycode(e)}/>
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
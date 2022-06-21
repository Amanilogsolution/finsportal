import React, { useEffect,useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {GetSubCodeDetails,ShowGlCode,UpdateSubCodeDetails} from '../../../api';

function EditSubCode() {
    const [data,setData] = useState({});
    const [glcode, setglcode] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetSubCodeDetails(localStorage.getItem("Organisation"),localStorage.getItem("SubCodesno"));
            console.log(result)
            setData(result)
            const result1 = await ShowGlCode(localStorage.getItem("Organisation"));
            setglcode(result1)
        }
        fetchData();
    }, [])

    const handleClick = async(e) => {
        e.preventDefault();
        const glcode = document.getElementById('glcode').value;
        const chargeCode = document.getElementById('chargeCode').value;
        const subCode = document.getElementById('subCode').value
        console.log(glcode,chargeCode,subCode)
        const result = await UpdateSubCodeDetails(localStorage.getItem("Organisation"),chargeCode,subCode,glcode,localStorage.getItem("SubCodesno"));
        if(result){
            window.location.href = '/TotalSubCode'
        }
    }
    const handleChangeChargecode = (e) => {
        setData({...data,charge_code:e.target.value})
    }
    const handleChangeSubcode = (e) => {
        setData({...data,sub_code:e.target.value})
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
            <br /> <h3 className="text-left ml-5">Edit Sub GL Code</h3>
            <div className="row ">
              <div className="col ml-5">
                <div className="card" style={{ width: "100%" }}>
                  <article className="card-body">
                    <form>
                  
                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">GL Code</label>
                        <div className="col form-group">
                     
                          <select
                            id="glcode"
                            className="form-control col-md-4"
                          >
                            <option defaultValue  hidden >{data.gl_code}</option>
                            {
                                glcode.map((data,index) => (
                                    <option  key={index} value={data.account_sub_name_code}>{data.account_sub_name_code}</option>
                                ))
                            }
                         
                          </select>
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Charge Code</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='chargeCode' value={data.charge_code} onChange={(e) => handleChangeChargecode(e)} />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Sub Code</label>
                        <div className="col form-group">
                          <input type="number" className="form-control col-md-4" value={data.sub_code} id='subCode' onChange={(e) => handleChangeSubcode(e)}  />
                        </div>
                        {/* form-group end.// */}
                      </div>
                    </form>
                  </article>
                  {/* card-body end .// */}
                  <div className="border-top card-body">
                    <button className="btn btn-success" onClick={handleClick} >Save</button>
                    <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./TotalSubCode"}}>Cancel</button>
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

export default EditSubCode

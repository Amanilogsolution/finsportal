import React,{useEffect,useState} from 'react'
import Header from "../../../Header/Header";
import Menu from "../../../Menu/Menu";
import Footer from "../../../Footer/Footer";
import {ShowcompliancesTypeselect,UpdatecomplianceType} from '../../../../api';


function EditComplianceType() {
    const [data,setData] =useState([])
    const handleClick = async(e) => {
        e.preventDefault();
        const compliance_Type = document.getElementById('compliance_Type').value;

        const result = await UpdatecomplianceType(localStorage.getItem('Organisation'),compliance_Type,localStorage.getItem('User_name'),localStorage.getItem('ComplianceSnoType'))
        if(result){
            window.location.href='/ShowcompliancesType'
        }
    }

    const handleChangeCompliance = (e) => {
        setData({...data,compliance_type:e.target.value})
    }
    

    useEffect(async()=>{
        const result = await ShowcompliancesTypeselect(localStorage.getItem('Organisation'),localStorage.getItem('ComplianceSnoType'))
        setData(result)
        console.log(result.compliance_type)
    },[])
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
            <br /> <h3 className="text-left ml-5">Edit Country</h3>
            <div className="row ">
              <div className="col ml-5">
                <div className="card" style={{ width: "100%" }}>
                  <article className="card-body">
                    <form>
                  
                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Add Compliance Type</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='compliance_Type' 
                          value={data.compliance_type} 
                          onChange={(e) => handleChangeCompliance(e)}
                          />
                        </div>
                        {/* form-group end.// */}
                      </div>
                    </form>
                  </article>
                  {/* card-body end .// */}
                  <div className="border-top card-body">
                    <button className="btn btn-success"onClick={handleClick} >Update</button>
                    <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ShowcompliancesType"}}>Cancel</button>
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

export default EditComplianceType

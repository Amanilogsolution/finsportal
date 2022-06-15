import React, {useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {showLocation,updateLocation} from '../../../api'

function EditLocation() {
    const[data,setData] = useState({})

  useEffect(async() => {
    const result = await showLocation(localStorage.getItem('Organisation'),localStorage.getItem('location_id'))
    setData(result)
     }, [])
 
    const handleClick = async(e) => {
        e.preventDefault();
        const Location_name = document.getElementById('Location_name').value;
        const gst_no = document.getElementById('gst_no').value;
        const contact_Person1 = document.getElementById('contact_Person1').value;
        const contact_person2 = document.getElementById('contact_person2').value;
        const contact_phone1 = document.getElementById('contact_phone1').value;
        const contact_phone2 = document.getElementById('contact_phone2').value;
        const result = await updateLocation(localStorage.getItem('Organisation'),Location_name,gst_no,contact_Person1,contact_person2,contact_phone1,contact_phone2,localStorage.getItem('location_id'));
        if(result){
            window.location.href='./TotalLocation'
        }
    }

    const handleChangeLocationName = (e) => {
        setData({...data,location_name:e.target.value})
     }
     const handleChangeGstno = (e) => {
        setData({...data,gstin_no:e.target.value})
     }
     const handleChangeContactperson1 = (e) => {
        setData({...data,contact_name1:e.target.value})
     }
     const handleChangeContactperson2 = (e) => {
        setData({...data,contact_name2:e.target.value})
     }
     const handleChangeContactphone1 = (e) => {
        setData({...data,contact_phone_no1:e.target.value})
     } 
     const handleChangeContactphone2 = (e) => {
        setData({...data,contact_phone_no2:e.target.value})
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
                <br /> <h3 className="text-left ml-5">Edit Location</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                      
                          <div className="form-row">
                            <label htmlFor="Location_name" className="col-md-2 col-form-label font-weight-normal">Location Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='Location_name' value={data.location_name}   onChange={(e) => handleChangeLocationName(e)} />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="gst_no" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='gst_no'  value={data.gstin_no}    onChange={(e) => handleChangeGstno(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="contact_Person1" className="col-md-2 col-form-label font-weight-normal">Contact Person 1</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='contact_Person1' value={data.contact_name1}    onChange={(e) => handleChangeContactperson1(e)}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="contact_person2" className="col-md-2 col-form-label font-weight-normal">Contact Person 2</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='contact_person2' value={data.contact_name2}  onChange={(e) => handleChangeContactperson2(e)} />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="contact_phone1" className="col-md-2 col-form-label font-weight-normal">Contact Phone 1</label>
                            <div className="col form-group">
                              <input type="tel" className="form-control col-md-4" id='contact_phone1' value={data.contact_phone_no1} onChange={(e) => handleChangeContactphone1(e)} maxLength={10}/>
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="contact_phone2" className="col-md-2 col-form-label font-weight-normal">Contact Phone 2</label>
                            <div className="col form-group">
                              <input type="tel" className="form-control col-md-4" id='contact_phone2' value={data.contact_phone_no2} onChange={(e) => handleChangeContactphone2(e)} maxLength={10}/>
                            </div>
                            {/* form-group end.// */}
                          </div>
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Update</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./TotalLocation"}}>Cancel</button>
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

export default EditLocation

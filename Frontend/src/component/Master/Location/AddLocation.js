import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { addLocation,Getfincialyearid,Updatefinancialcount } from '../../../api';

function AddLocation() {
  // const [locationid,setLocationid] =useState();
  const[locationcount,setLocationcount] = useState()
  useEffect(()=>{
    const fetch = async() =>{
      const response = await Getfincialyearid(localStorage.getItem('Organisation'))
      setLocationcount(response[0].location_count)
      
    }
    fetch()
  },[])

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(locationcount)
    const no = parseInt(locationcount)
    const randomno = no+1;
    console.log(randomno)
    const lastnum=''+randomno
    const Location_name = document.getElementById('Location_name').value;
    const first3=Location_name.slice(0, 3)
    const lastno=''+lastnum.padStart(4,'0');
    const Location_id = first3.toUpperCase() + lastno ; 
    const gst_no = document.getElementById('gst_no').value;
    const contact_Person1 = document.getElementById('contact_Person1').value;
    const contact_person2 = document.getElementById('contact_person2').value;
    const contact_phone1 = document.getElementById('contact_phone1').value;
    const contact_phone2 = document.getElementById('contact_phone2').value;
    const User_id = localStorage.getItem('User_id');

  

    const result = await addLocation(localStorage.getItem('Organisation'), Location_id, Location_name, gst_no, contact_Person1, contact_person2, contact_phone1, contact_phone2,User_id);
    if (!Location_name || !gst_no) {
      alert('Enter data')
    } 
    else {
      if (result == "Already") {
        alert('Already')
      } else {
        const result1 = await Updatefinancialcount(localStorage.getItem('Organisation'),'location_count',lastnum)
        if(result1==="Updated"){
          alert("Added")
        window.location.href = '/TotalLocation'
        }
      }
    }
  }

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const result = await LastLocationid(localStorage.getItem("Organisation"));
  //     console.log(result.count)
  //     setLocationid(result.count);
  //     localStorage.setItem("lastlocationid",result.location_id)

  //   }

  //   fetchMyAPI()

  // }, [])

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
              <br /> <h3 className="text-left ml-5">Add Location</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>

                        <div className="form-row">
                          <label htmlFor="Location_name" className="col-md-2 col-form-label font-weight-normal">Location Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='Location_name' />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="gst_no" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='gst_no' />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="contact_Person1" className="col-md-2 col-form-label font-weight-normal">Contact Person 1</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='contact_Person1' />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="contact_phone1" className="col-md-2 col-form-label font-weight-normal">Contact Phone 1</label>
                          <div className="col form-group">
                            <input type="tel" className="form-control col-md-4" id='contact_phone1' maxLength={10} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="contact_person2" className="col-md-2 col-form-label font-weight-normal">Contact Person 2</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='contact_person2' />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="contact_phone2" className="col-md-2 col-form-label font-weight-normal">Contact Phone 2</label>
                          <div className="col form-group">
                            <input type="tel" className="form-control col-md-4" id='contact_phone2' maxLength={10} />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick} >Save</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./TotalLocation" }}>Cancel</button>
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

export default AddLocation

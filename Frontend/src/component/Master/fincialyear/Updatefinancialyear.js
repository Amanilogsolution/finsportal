import React,{useState,useEffect} from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {Selectfincialyear,UpdateFincialyear} from '../../../api'


const Updatefincialyear = () => {
    const [data,setData] = useState({})

    useEffect(() => {
        const fetch =async()=>{
        const result = await Selectfincialyear(localStorage.getItem('Organisation'),localStorage.getItem('FinsyearSno'))
       setData(result)
        }
        fetch()
    },[])


  const handelsave=async(e) =>{
     e.preventDefault();

  const vendmast= document.getElementById('vendmast').value;
  const vendid= document.getElementById('vendid').value;
  const custmast= document.getElementById('custmast').value;
  const custid= document.getElementById('custid').value;
  const org = localStorage.getItem('Organisation')
  const User_id = localStorage.getItem('User_id')
  console.log(vendmast,vendid,custmast,custid)

  if(vendmast.length>5 || vendid.length>5 ||custmast.length>5 ||custid>5){
    alert("ID's must be smaller then 4 char.")
  }
  else{
    const result = await UpdateFincialyear(localStorage.getItem('Organisation'),custmast,custid,vendmast,vendid,localStorage.getItem('User_name'),localStorage.getItem('FinsyearSno'))
    console.log(result)
    if(result){
        alert("Updated")
        localStorage.removeItem('FinsyearSno');
        window.location.href="./showfincialyear"

    }

  }
  }

  const handleChangevendmast =(e)=>{
    setData({...data,mvend_id:e.target.value})

  }
  const handleChanevendid = (e)=>{
    setData({...data,vend_id:e.target.value})
  }
  const handleCustomermaster = (e)=>{
    setData({...data,mcust_id:e.target.value})

  }
  const handleCustomerid = (e)=>{
    setData({...data,cust_id:e.target.value})

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
              <br /> <h3 className="text-left ml-5">Fincial Year</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Fincial year</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='fincialyear' disabled value={data.fin_year}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="from_date" className="col-md-2 col-form-label font-weight-normal">From date</label>
                          <div className="col form-group">
                            <input type="date" className="form-control col-md-4" id='from_date' disabled value={data.from_date}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="to_date" className="col-md-2 col-form-label font-weight-normal">To Date</label>
                          <div className="col form-group">
                            <input type="date" className="form-control col-md-4" id='to_date' disabled value={data.to_date} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Year</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='lastyear' disabled value={data.year}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Vendor Master</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='vendmast' value={data.mvend_id} onChange={handleChangevendmast}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Vendor Id</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='vendid' value={data.vend_id} onChange={handleChanevendid}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Customer Master</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='custmast' value={data.mcust_id} onChange={handleCustomermaster}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="fincialyear" className="col-md-2 col-form-label font-weight-normal">Customer Id</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='custid' value={data.cust_id} onChange={handleCustomerid}/>
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handelsave}>Save</button>
                      <button className="btn btn-light ml-3" >Cancel</button>
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


export default Updatefincialyear

import React,{useState} from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";


const Fincialyear = () => {
  const [from_date,setFromDate] = useState('YYYY')
  const [to_date,setToDate] = useState('YYYY')
  
  const date = from_date + "-" + to_date

  const handleChangefromdate = (e) =>{
    const date= new Date(e.target.value)
    const year = date.getFullYear()
    setFromDate(year)
  }

  const handleChangetodate = (e) =>{
    const date= new Date(e.target.value)
    const year = date.getFullYear()
    setToDate(year)
    console.log(year)
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
                            <input type="text" className="form-control col-md-4" id='fincialyear' disabled value={date}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="from_date" className="col-md-2 col-form-label font-weight-normal">From date</label>
                          <div className="col form-group">
                            <input type="date" className="form-control col-md-4" id='from_date'  onChange={handleChangefromdate}/>
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="to_date" className="col-md-2 col-form-label font-weight-normal">To Date</label>
                          <div className="col form-group">
                            <input type="date" className="form-control col-md-4" id='to_date'  onChange={handleChangetodate}/>
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success">Save</button>
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


export default Fincialyear

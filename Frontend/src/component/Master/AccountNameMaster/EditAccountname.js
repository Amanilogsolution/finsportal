import React,{useEffect,useState} from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {SelectAccountName,UpdateAccountName} from '../../../api'


function EditAccountname() {
    const [data,setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await SelectAccountName(localStorage.getItem('Organisation'),localStorage.getItem('AccountTypeCode'));
            console.log(result)
            setData(result)
        }
        fetchData();
    },[] )


    const handleClick = async(e) => {
        e.preventDefault();
        const account_type = document.getElementById('AccountType').value;
        const account_type_code = document.getElementById('AccountTypeCode').value;
        console.log(account_type,account_type_code)
        const result = await UpdateAccountName(account_type,account_type_code,localStorage.getItem('Organisation'),localStorage.getItem('AccountTypeCode'));
        console.log(result)
        if(result){
            window.location.href = '/ShowAccountname'
        }
      
    }
    const handleChangeAccountType = (e) => {
        setData({...data,account_type:e.target.value})
    }
    const handleChangeAccountTypeCode = (e) => {
        setData({...data,account_type_code:e.target.value})
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
            <br /> <h3 className="text-left ml-5">Add Account Type</h3>
            <div className="row ">
              <div className="col ml-5">
                <div className="card" style={{ width: "100%" }}>
                  <article className="card-body">
                    <form>
                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='AccountType' value={data.account_type}  onChange={(e) => handleChangeAccountType(e)} />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                        <div className="col form-group">
                          <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_type_code} onChange={(e) => handleChangeAccountTypeCode(e)} />
                        </div>
                        {/* form-group end.// */}
                      </div>

                    </form>
                  </article>
                  {/* card-body end .// */}
                  <div className="border-top card-body">
                    <button className="btn btn-success" onClick={handleClick} >Save</button>
                    <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ChartOfAccount"}}>Cancel</button>
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

export default EditAccountname

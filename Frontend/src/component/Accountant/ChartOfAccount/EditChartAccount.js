import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { GetChartOfAccount, UpdateChartOfAccount } from '../../../api'


function EditChartAccount() {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetChartOfAccount(localStorage.getItem('Organisation'), localStorage.getItem('ChartAccountsno'));
      console.log(result)
      setData(result)
    }
    fetchData();
  }, [])


  const handleClick = async (e) => {
    e.preventDefault();
    const account_sub_name = document.getElementById('account_sub_name').value;
    console.log(account_sub_name)

    const result = await UpdateChartOfAccount(localStorage.getItem('Organisation'), localStorage.getItem('ChartAccountsno'), account_sub_name, localStorage.getItem('User_id'));
    if (result) {
      alert('Chart Of Account Updated Successfully')
      window.location.href = 'ShowChartAccount'
      localStorage.removeItem('ChartAccountsno')
    }

  }
  const handleChangeAccountSubName = (e) => {
    setData({ ...data, account_sub_name: e.target.value })
  }


  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Chart Account</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Sub Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='account_sub_name' value={data.account_sub_name} onChange={(e) => handleChangeAccountSubName(e)} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Sub Name Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_sub_name_code} />
                          </div>
                        </div>


                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_name_code} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account type Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_type_code} />
                          </div>
                        </div>
                        <div className="border-top card-body">
                          <button type='submit' className="btn btn-success" onClick={handleClick} >Update</button>
                          <button className="btn btn-light ml-3" onClick={() => {localStorage.removeItem('ChartAccountsno'); window.location.href = "./ChartOfAccount";  }}>Cancel</button>
                        </div>
                      </form>
                    </article>

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

export default EditChartAccount

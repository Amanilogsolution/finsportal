import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";


const EditRoles = () => {
    const themeval = localStorage.getItem('themetype')

    const checkboxstyle = {
        height:"17px",
        width:"17px"
      };


    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    <div>
                        <div className={`content-wrapper bg-${themeval}`}>
                            <div className="container-fluid">
                                <br /> <h3 className="text-left ml-5">New Role</h3>
                                <div className="row ">
                                    <div className="col ">
                                        <div className="card" >
                                            <article className={`card-body bg-${themeval}`} style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                                                <form autoComplete='off'>
                                                    <div className="form-row">
                                                        <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role <span style={{ color: "red" }}>*</span></label>
                                                        <div className="col form-group">
                                                            <input type="text" className="form-control col-md-4" id='role' />
                                                        </div>
                                                    </div>

                                                    <div className="form-row">
                                                        <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Description </label>
                                                        <div className="col form-group">
                                                            <textarea className="form-control col-md-4 " id='description' rows='3' style={{ resize: "none" }} />
                                                        </div>
                                                    </div>
                                                    <div className="form-row col-md-10"  >
                                                        <table className="table table-borderless text-center">
                                                            <thead>
                                                                <tr className="table-active">
                                                                    <th scope="col" className="text-left"></th>
                                                                    <th scope="col" >Full Access</th>
                                                                    <th scope="col">View</th>
                                                                    <th scope="col">Create</th>
                                                                    <th scope="col">Edit</th>
                                                                    <th scope="col">Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Customers</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox'  style={checkboxstyle}/></td>
                                                                    <td><input type='checkbox'  style={checkboxstyle}/></td>
                                                                    <td><input type='checkbox'  style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox'  style={checkboxstyle}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Vendors</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle}  /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Item</th>
                                                                    <td><input type='checkbox' style={checkboxstyle}  /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Banking</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr className={`table-active `}>
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Sales</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Invoices</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr className="table-active">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Purchases</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Bills</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>

                                                                <tr className="table-active ">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Accountant</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Chart of Accounts</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>

                                                                <tr className="table-active ">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Settings</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Users</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Payment Terms</th>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' style={checkboxstyle} /></td>
                                                                </tr>



                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>



                                                    <div className="border-top card-body">
                                                        <button type='submit' className="btn btn-success" >Add</button>
                                                        <button className="btn btn-light ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./ShowItem" }}>Cancel</button>
                                                    </div>
                                                </form>
                                            </article>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer theme={themeval} />
                </div>
            </div>
        </>
    )
}


export default EditRoles;



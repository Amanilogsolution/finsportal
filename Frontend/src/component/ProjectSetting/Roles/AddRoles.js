import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import { AddUserRole } from '../../../api'

const AddRoles = () => {
    const themeval = localStorage.getItem('themetype')

    const checkboxstyle = {
        height: "17px",
        width: "17px"
    };

    const handlesubmitdata = async (e) => {
        e.preventDefault();
      

        const role = document.getElementById('role').value;
        let role_id=role+ Math.floor(Math.random() * 100000);
        const description = document.getElementById('description').value;
        const cust_view = document.getElementById('cust_view').checked === true ? 'true' : 'false';
        const cust_create = document.getElementById('cust_create').checked === true ? 'true' : 'false';
        const cust_edit = document.getElementById('cust_edit').checked === true ? 'true' : 'false';
        const cust_delete = document.getElementById('cust_delete').checked === true ? 'true' : 'false';

        const vend_view = document.getElementById('vend_view').checked === true ? 'true' : 'false';
        const vend_create = document.getElementById('vend_create').checked === true ? 'true' : 'false';
        const vend_edit = document.getElementById('vend_edit').checked === true ? 'true' : 'false';
        const vend_delete = document.getElementById('vend_delete').checked === true ? 'true' : 'false';

        const items_view = document.getElementById('items_view').checked === true ? 'true' : 'false';
        const items_create = document.getElementById('items_create').checked === true ? 'true' : 'false';
        const items_edit = document.getElementById('items_edit').checked === true ? 'true' : 'false';
        const items_delete = document.getElementById('items_delete').checked === true ? 'true' : 'false';

        const banking_view = document.getElementById('banking_view').checked === true ? 'true' : 'false';
        const banking_create = document.getElementById('banking_create').checked === true ? 'true' : 'false';
        const banking_edit = document.getElementById('banking_edit').checked === true ? 'true' : 'false';
        const banking_delete = document.getElementById('banking_delete').checked === true ? 'true' : 'false';

        const invoice_view = document.getElementById('invoice_view').checked === true ? 'true' : 'false';
        const invoice_create = document.getElementById('invoice_create').checked === true ? 'true' : 'false';
        const invoice_edit = document.getElementById('invoice_edit').checked === true ? 'true' : 'false';
        const invoice_delete = document.getElementById('invoice_delete').checked === true ? 'true' : 'false';

        const bills_view = document.getElementById('bills_view').checked === true ? 'true' : 'false';
        const bills_create = document.getElementById('bills_create').checked === true ? 'true' : 'false';
        const bills_edit = document.getElementById('bills_edit').checked === true ? 'true' : 'false';
        const bills_delete = document.getElementById('bills_delete').checked === true ? 'true' : 'false';

        const chartacct_view = document.getElementById('chartacct_view').checked === true ? 'true' : 'false';
        const chartacct_create = document.getElementById('chartacct_create').checked === true ? 'true' : 'false';
        const chartacct_edit = document.getElementById('chartacct_edit').checked === true ? 'true' : 'false';
        const chartacct_delete = document.getElementById('chartacct_delete').checked === true ? 'true' : 'false';

        const users_view = document.getElementById('users_view').checked === true ? 'true' : 'false';
        const users_create = document.getElementById('users_create').checked === true ? 'true' : 'false';
        const users_edit = document.getElementById('users_edit').checked === true ? 'true' : 'false';
        const users_delete = document.getElementById('users_delete').checked === true ? 'true' : 'false';

        const paymentTerm_view = document.getElementById('paymentTerm_view').checked === true ? 'true' : 'false';
        const paymentTerm_create = document.getElementById('paymentTerm_create').checked === true ? 'true' : 'false';
        const paymentTerm_edit = document.getElementById('paymentTerm_edit').checked === true ? 'true' : 'false';
        const paymentTerm_delete = document.getElementById('paymentTerm_delete').checked === true ? 'true' : 'false';
        const user_id = localStorage.getItem('User_id');
        const org = localStorage.getItem('Organisation');

        console.log(org,role, description, cust_view, cust_create, cust_edit, cust_delete,
            vend_view, vend_create, vend_edit, vend_delete, items_view, items_create, items_edit, items_delete,
            banking_view, banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete,
            bills_view, bills_create, bills_edit, bills_delete, chartacct_view, chartacct_create, chartacct_edit, chartacct_delete,
            users_view, users_create, users_edit, users_delete, paymentTerm_view, paymentTerm_create, paymentTerm_edit, paymentTerm_delete, user_id)



        const submitdata = await AddUserRole(org,role, description, cust_view, cust_create, cust_edit, cust_delete,
            vend_view, vend_create, vend_edit, vend_delete, items_view, items_create, items_edit, items_delete,
            banking_view, banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete,
            bills_view, bills_create, bills_edit, bills_delete, chartacct_view, chartacct_create, chartacct_edit, chartacct_delete,
            users_view, users_create, users_edit, users_delete, paymentTerm_view, paymentTerm_create, paymentTerm_edit, paymentTerm_delete, user_id)

        console.log(submitdata)
    }

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
                                                                    <td><input type='checkbox' id='cust_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='cust_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='cust_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='cust_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='cust_delete' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Vendors</th>
                                                                    <td><input type='checkbox' id='vend_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='vend_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='vend_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='vend_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='vend_delete' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Item</th>
                                                                    <td><input type='checkbox' id='items_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='items_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='items_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='items_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='items_delete' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Banking</th>
                                                                    <td><input type='checkbox' id='banking_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='banking_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='banking_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='banking_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='banking_delete' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr className={`table-active `}>
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Sales</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Invoices</th>
                                                                    <td><input type='checkbox' id='invoice_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='invoice_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='invoice_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='invoice_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='invoice_delete' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr className="table-active">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Purchases</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Bills</th>
                                                                    <td><input type='checkbox' id='bills_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='bills_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='bills_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='bills_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='bills_delete' style={checkboxstyle} /></td>
                                                                </tr>

                                                                <tr className="table-active ">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Accountant</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Chart of Accounts</th>
                                                                    <td><input type='checkbox' id='chartacct_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='chartacct_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='chartacct_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='chartacct_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='chartacct_delete' style={checkboxstyle} /></td>
                                                                </tr>

                                                                <tr className="table-active ">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Settings</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Users</th>
                                                                    <td><input type='checkbox' id='users_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='users_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='users_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='users_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='users_delete' style={checkboxstyle} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Payment Terms</th>
                                                                    <td><input type='checkbox' id='paymentTerm_full' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_view' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_create' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_edit' style={checkboxstyle} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_delete' style={checkboxstyle} /></td>
                                                                </tr>




                                                            </tbody>
                                                        </table>
                                                    </div>



                                                    <div className="border-top card-body">
                                                        <button type='submit' className="btn btn-success" onClick={handlesubmitdata} >Add</button>
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


export default AddRoles;



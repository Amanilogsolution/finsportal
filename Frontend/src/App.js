import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivatRoute from './component/HOC/PrivateRoute';
import Login from './component/Login/Login';
import LoginDetails from './component/Login/LoginDetails'
import ChangePassword from './component/Login/ChangePassword';

import Home from './component/Home/Home'
import Customer from './component/Customer/Customer'
import EditOrganisation from './component/organisation/EditOrganisation'
import Org from './component/organisation/org'
import Vendor from './component/Vendor/Vendor'
import Showvendor from './component/Vendor/Showvendor'
import Editvendor from './component/Vendor/Editvendor'
import AddCustAddress from './component/Customer/Addresses/AddAddress';
import AddVendAddress from './component/Customer/Addresses/AddVendorAddress.';
import TotalCustAddress from './component/Customer/Addresses/TotalAddress';
import TotalVendAddress from './component/Customer/Addresses/TotalVendorAddress';

import EditAddress from './component/Customer/Addresses/EditAddress';
import EditVendorAddress from './component/Customer/Addresses/EditVendorAddress';

import StateMaster from './component/Master/State/StateMaster';
import ShowState from './component/Master/State/ShowState';
import EditState from './component/Master/State/EditState';
import ShowCountry from './component/Master/Country/ShowCountry';
import AddCountry from './component/Master/Country/AddCountry';
import EditCountry from './component/Master/Country/EditCountry';
import ShowCurrency from './component/Master/Currency/ShowCurrency';
import AddCurrency from './component/Master/Currency/AddCurrency';
import EditCurrency from './component/Master/Currency/EditCurrency';
import Showcity from './component/Master/City/Showcity';
import Addcity from './component/Master/City/Addcity';
import EditCity from './component/Master/City/EditCity';
import ShowUnit from './component/Master/Unit/ShowUnit';
import AddUnit from './component/Master/Unit/AddUnit';
import EditUnit from './component/Master/Unit/EditUnit';

import AddBank from './component/Master/Bank/AddBank';
import TotalBank from './component/Master/Bank/TotalBank';
import EditBank from './component/Master/Bank/EditBank';
import AddBankList from './component/Master/Bank/AddBankList';

import ShowUser from './component/Master/User/ShowUser';
import AddUser from './component/Master/User/Adduser';
import EditUser from './component/Master/User/EditUser';
import Practice from './component/practice';

import TotalCustomer from './component/Customer/TotalCustomer';
import EditCustomer from './component/Customer/EditCustomer';
import TotalLocation from './component/Master/Location/TotalLocation';
import AddLocation from './component/Master/Location/AddLocation';
import EditLocation from './component/Master/Location/EditLocation'
import AddOrgAddress from './component/Master/Location/Address/AddOrgAddress';
import EditOrgAddress from './component/Master/Location/Address/EditOrgAddress';

import Addcompliances from './component/Master/Compliances/Addcompliances';
import Showcompliances from './component/Master/Compliances/Showcompliances';
import Editcompliances from './component/Master/Compliances/Editcompliances';
import UploadComplianceDocument from './component/Master/Compliances/UploadComplianceDocumnet/UploadComplianceDocument'

import ShowcompliancesType from './component/Master/Compliances/ComplienceType/ShowcomplianceType'
import AddcomplianceType from './component/Master/Compliances/ComplienceType/AddcomplianceType'
import EditComplianceType from './component/Master/Compliances/ComplienceType/EditComplianceType'
import PandingCompliances from './component/Master/Compliances/Pendingcompliances'



import Fincialyear from './component/Master/fincialyear/fincialyear'
import ShowFincialyear from './component/Master/fincialyear/Showfincialyear';
import Updatefincialyear from './component/Master/fincialyear/Updatefinancialyear'

import ChartOfAccount from './component/Accountant/ChartOfAccount/ChartOfAccount';
import ShowChartAccount from './component/Accountant/ChartOfAccount/ShowChartAccount'
import EditChartAccount from './component/Accountant/ChartOfAccount/EditChartAccount'

import InsertAccountType from './component/Accountant/ChartOfAccount/InsertAccountType';
import ShowAccountname from './component/Master/AccountNameMaster/ShowAccountname';
import EditAccountname from './component/Master/AccountNameMaster/EditAccountname';


import CurrencyAdjust from './component/Accountant/CurrencyAdjust/CurrencyAdjust';

// import Items from './component/Master/ItemMaster/AddItem';

// import ShowAccountInfo from './component/Master/AccountInfo/ShowAccountInfo';
// import AddAccountInfo from './component/Master/AccountInfo/AddAccountInfo';
// import EditAccountInfo from './component/Master/AccountInfo/EditAccountInfo';

import RecurringExpenses from './component/Vendor/RecurringExpenses/RecurringExpenses';

import AddSubCode from './component/Master/SubCode/AddSubCode';
import TotalSubCode from './component/Master/SubCode/TotalSubCode';
import EditSubCode from './component/Master/SubCode/EditSubCode';

import Estimates from './component/Customer/Estimates/Estimates';
import SalesOrder from './component/Customer/SalesOrders/SalesOrder';
import DeliveryChallans from './component/Customer/DeliveryChallans/DeliveryChallans';
import Invoices from './component/Customer/Invoices/Invoices';
import EditInvoice from './component/Customer/Invoices/EditInvoice.js/editinvoice';
import SaveInvoice from './component/Customer/Invoices/SaveInvoice/Saveinvoice'

import RecurringInvoices from './component/Customer/RecurringInvoices/RecurringInvoices'
import CreditNotes from './component/Customer/CreditNotes/CreditNotes';
import PaymentsReceived from './component/Customer/PaymentReceived/PaymentReceived';

import PurchaseOrder from './component/Vendor/PurchaseOrders/PurchaseOrder'
import Bills from './component/Vendor/Bills/Bills'
import RecurringBills from './component/Vendor/RecurringBills/RecurringBills'
import VendorCredits from './component/Vendor/VendorCredits/VendorCredits'
import SaveBillReport from './component/Vendor/Bills/SaveBill/savebill'

import ShowAccountMinorCode from './component/Master/ShowAccountMinorCode/ShowAccountMinorCode';
import EditAccountMinorCode from './component/Master/ShowAccountMinorCode/EditAccountMinorCode';



import BillPayment from './component/Vendor/PaymentMade/BillPayment'
import PaymentMade from './component/Vendor/PaymentMade/PaymentMade';

import ShowFincialTerm from './component/Master/PaymentTerms/Showpaymentterms';
import AddPaymentTerm from './component/Master/PaymentTerms/Addpaymentterm';
import UpdatePaymentTerm from './component/Master/PaymentTerms/Updatepaymentterm'


import ShowItem from './component/Items/ShowItem'
import AddItem from './component/Items/AddItem'
import EditItem from './component/Items/EditItem'


import AddCrm from './component/Master/CrmMaster/AddCrm'
import EditCrm from './component/Master/CrmMaster/EditCrm'
import ShowCrm from './component/Master/CrmMaster/ShowCrm'

import OTPpage from './component/Login/OTP'

import Reportdata from './component/Reportdata/Reportdata'
import PageNotFound from './component/pagenotfound/pagenotfound';

import ShowEmployee from './component/Master/EmployeeMaster/ShowEmployee';
import AddEmployee from './component/Master/EmployeeMaster/AddEmployee';
import EditEmployee from './component/Master/EmployeeMaster/EditEmployee';

import AddRoles from './component/ProjectSetting/Roles/AddRoles';

import ChartOfAccount2 from './component/Accountant/ChartOfAccount/ChartOfAccount2';


const App = () => {

  //  setTimeout(() => {
  //   localStorage.removeItem('Token')
  //  },8000)

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" restricted={false} component={Login} />
          <Route exact path="/LoginDetails" component={LoginDetails} />
          <Route exact path="/ChangePassword" component={ChangePassword} />
          <Route exact path="/otppage" component={OTPpage} />

          <PrivatRoute exact path="/home" component={Home} />
          <PrivatRoute exact path="/Customer" component={Customer} />
          {/* <Route exact path="/Organisation" component={<Organisation/>}/> */}
          <PrivatRoute exact path="/org" component={Org} />
          <PrivatRoute exact path="/EditOrganisation" component={EditOrganisation} />

          <PrivatRoute exact path="/vendor" component={Vendor} />
          <PrivatRoute exact path="/Showvendor" component={Showvendor} />
          <PrivatRoute exact path="/Editvendor" component={Editvendor} />
          <PrivatRoute exact path="/StateMaster" component={StateMaster} />
          <PrivatRoute exact path="/ShowState" component={ShowState} />
          <PrivatRoute exact path="/EditState" component={EditState} />

          <PrivatRoute exact path="/ShowCountry" component={ShowCountry} />
          <PrivatRoute exact path="/AddCountry" component={AddCountry} />
          <PrivatRoute exact path="/EditCountry" component={EditCountry} />
          <PrivatRoute exact path="/ShowCurrency" component={ShowCurrency} />
          <PrivatRoute exact path="/AddCurrency" component={AddCurrency} />
          <PrivatRoute exact path="/EditCurrency" component={EditCurrency} />
          <PrivatRoute exact path="/Showcity" component={Showcity} />
          <PrivatRoute exact path="/Addcity" component={Addcity} />
          <PrivatRoute exact path='/EditCity' component={EditCity} />
          <PrivatRoute exact path="/ShowUnit" component={ShowUnit} />
          <PrivatRoute exact path="/AddUnit" component={AddUnit} />
          <PrivatRoute exact path="/EditUnit" component={EditUnit} />

          <PrivatRoute exact path="/AddBank" component={AddBank} />
          <PrivatRoute exact path="/TotalBank" component={TotalBank} />
          <PrivatRoute exact path="/EditBank" component={EditBank} />
          <PrivatRoute exact path="/AddBankList" component={AddBankList} />

          <PrivatRoute exact path="/ShowUser" component={ShowUser} />
          <PrivatRoute exact path="/AddUser" component={AddUser} />
          <PrivatRoute exact path="/EditUser" component={EditUser} />
          <PrivatRoute exact path="/Practice" component={Practice} />

          <PrivatRoute exact path="/TotalCustomer" component={TotalCustomer} />
          <PrivatRoute exact path="/EditCustomer" component={EditCustomer} />
          <PrivatRoute exact path="/AddCustAddress" component={AddCustAddress} />
          <PrivatRoute exact path="/TotalCustAddress" component={TotalCustAddress} />
          <PrivatRoute exact path="/EditAddress" component={EditAddress} />

          <PrivatRoute exact path="/AddVendAddress" component={AddVendAddress} />
          <PrivatRoute exact path="/TotalVendAddress" component={TotalVendAddress} />
          <PrivatRoute exact path="/EditVendorAddress" component={EditVendorAddress} />

          <PrivatRoute exact path="/TotalLocation" component={TotalLocation} />
          <PrivatRoute exact path="/AddLocation" component={AddLocation} />
          <PrivatRoute exact path="/EditLocation" component={EditLocation} />

          <PrivatRoute exact path="/Addcompliances" component={Addcompliances} />
          <PrivatRoute exact path="/Showcompliances" component={Showcompliances} />
          <PrivatRoute exact path="/Editcompliances" component={Editcompliances} />
          <PrivatRoute exact path="/UploadComplianceDocument" component={UploadComplianceDocument} />


          <PrivatRoute exact path="/ShowcompliancesType" component={ShowcompliancesType} />
          <PrivatRoute exact path="/AddcomplianceType" component={AddcomplianceType} />
          <PrivatRoute exact path="/EditComplianceType" component={EditComplianceType} />
          <PrivatRoute exact path="/Panding-Compliances" component={PandingCompliances} />

          <PrivatRoute exact path="/AddOrgAddress" component={AddOrgAddress} />
          <PrivatRoute exact path="/EditOrgAddress" component={EditOrgAddress} />

          <PrivatRoute exact path="/Fincialyear" component={Fincialyear} />
          <PrivatRoute exact path="/ShowFincialyear" component={ShowFincialyear} />
          <PrivatRoute exact path="/Updatefincialyear" component={Updatefincialyear} />

          <PrivatRoute exact path="/ChartOfAccount" component={ChartOfAccount} />
          <PrivatRoute exact path="/ShowChartAccount" component={ShowChartAccount} />
          <PrivatRoute exact path="/EditChartAccount" component={EditChartAccount} />
          <PrivatRoute exact path="/Currency-Adjustment" component={CurrencyAdjust} />



          <PrivatRoute exact path="/InsertAccountType" component={InsertAccountType} />
          <PrivatRoute exact path="/ShowAccountname" component={ShowAccountname} />
          <PrivatRoute exact path="/EditAccountname" component={EditAccountname} />
          {/* <PrivatRoute exact path="/Items" component={Items}/> */}
          {/* 
          <PrivatRoute exact path="/ShowAccountInfo" component={ShowAccountInfo}/>
          <PrivatRoute exact path="/AddAccountInfo" component={AddAccountInfo}/>
          <PrivatRoute exact path="/EditAccountInfo" component={EditAccountInfo}/> */}

          <PrivatRoute exact path="/RecurringExpenses" component={RecurringExpenses} />
          <PrivatRoute exact path="/AddSubCode" component={AddSubCode} />
          <PrivatRoute exact path="/TotalSubCode" component={TotalSubCode} />
          <PrivatRoute exact path="/EditSubCode" component={EditSubCode} />

          <PrivatRoute exact path="/Estimates" component={Estimates} />
          <PrivatRoute exact path="/SalesOrder" component={SalesOrder} />
          <PrivatRoute exact path="/DeliveryChallans" component={DeliveryChallans} />
          <PrivatRoute exact path="/Invoices" component={Invoices} />
          <PrivatRoute exact path="/EditInvoice" component={EditInvoice} />
          <PrivatRoute exact path="/SaveInvoice" component={SaveInvoice} />
          
          <PrivatRoute exact path="/RecurringInvoices" component={RecurringInvoices} />
          <PrivatRoute exact path="/CreditNotes" component={CreditNotes} />
          <PrivatRoute exact path="/PaymentsReceived" component={PaymentsReceived} />

          <PrivatRoute exact path="/PurchaseOrder" component={PurchaseOrder} />
          <PrivatRoute exact path="/Bills" component={Bills} />
          <PrivatRoute exact path="/RecurringBills" component={RecurringBills} />
          <PrivatRoute exact path="/VendorCredits" component={VendorCredits} />
          <PrivatRoute exact path="/SaveBillReport" component={SaveBillReport} />


          

          <PrivatRoute exact path="/ShowAccountMinorCode" component={ShowAccountMinorCode} />
          <PrivatRoute exact path="/EditAccountMinorCode" component={EditAccountMinorCode} />
          <PrivatRoute exact path="/BillPayment" component={BillPayment} />
          <PrivatRoute exact path="/PaymentMade" component={PaymentMade} />

          <PrivatRoute exact path="/ShowPaymentTerm" component={ShowFincialTerm} />
          <PrivatRoute exact path="/AddPaymentTerm" component={AddPaymentTerm} />
          <PrivatRoute exact path="/UpdatePaymentTerm" component={UpdatePaymentTerm} />


          <PrivatRoute exact path="/ShowItem" component={ShowItem} />
          <PrivatRoute exact path="/AddItem" component={AddItem} />
          <PrivatRoute exact path="/EditItem" component={EditItem} />


          <PrivatRoute exact path="/AddCrm" component={AddCrm} />
          <PrivatRoute exact path="/EditCrm" component={EditCrm} />
          <PrivatRoute exact path="/ShowCrm" component={ShowCrm} />
          <PrivatRoute exact path="/Reportdata" component={Reportdata} />


          <PrivatRoute exact path="/showemployee" component={ShowEmployee} />
          <PrivatRoute exact path="/addemployee" component={AddEmployee} />
          <PrivatRoute exact path="/editemployee" component={EditEmployee} />




          <PrivatRoute exact path="/addroles" component={AddRoles} />
          <PrivatRoute exact path="/ChartOfAccount2" component={ChartOfAccount2} />


          


          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>

    </div>
  )
}
export default App

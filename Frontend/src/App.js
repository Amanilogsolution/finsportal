import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivatRoute from './component/HOC/PrivateRoute';
import Login from './component/Login/Login';
import LoginDetails from './component/Login/UserProfile/UserProfile'
import ChangePassword from './component/Login/ChangePassword/ChangePassword';

import Home from './component/Home/Home'
import Customer from './component/Customer/Customer'
import CustomerNames from './component/Customer/CustomerNames';
import EditOrganisation from './component/organisation/EditOrganization/EditOrganisation'
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
import InsertMinorCode from './component/Accountant/ChartOfAccount/InsertMinorCode';
import ShowAccountname from './component/Master/AccountNameMaster/ShowAccountname';
import EditAccountname from './component/Master/AccountNameMaster/EditAccountname';

import TotalRecurringFrequency from './component/Master/RecurringFrequency/TotalRecurringFrequency'
import AddRecurringFrequency from './component/Master/RecurringFrequency/AddRecurringFrequency'
import EditRecurringFreq from './component/Master/RecurringFrequency/UpdateRecurringFrequency'


import CurrencyAdjust from './component/Accountant/CurrencyAdjust/CurrencyAdjust';

import RecurringExpenses from './component/Vendor/RecurringExpenses/RecurringExpenses';

// Not in Use
// import AddSubCode from './component/Master/SubCode/AddSubCode';
// import TotalSubCode from './component/Master/SubCode/TotalSubCode';
// import EditSubCode from './component/Master/SubCode/EditSubCode';

import Estimates from './component/Customer/Estimates/Estimates';
import SalesOrder from './component/Customer/SalesOrders/SalesOrder';
import SaveSalesOrder from './component/Customer/SalesOrders/SaveSalesOrder';
import EditSalesOrder from './component/Customer/SalesOrders/EditSalesOrder';


import DeliveryChallans from './component/Customer/DeliveryChallans/DeliveryChallans';
import Invoices from './component/Customer/Invoices/Invoices';


import EditInvoice from './component/Customer/Invoices/EditInvoice/editinvoice';
import SaveInvoice from './component/Customer/Invoices/SaveInvoice/Saveinvoice'

import RecurringInvoices from './component/Customer/RecurringInvoices/RecurringInvoices'
import CreditNotes from './component/Customer/CreditNotes/CreditNotes';
import CreditNotesUI from './component/Customer/CreditNotes/CreditNotesUI';
import DebitNotes from './component/Vendor/VendorCredits/DebitNote';

import PaymentsReceived from './component/Customer/PaymentReceived/PaymentReceived';

import PurchaseOrder from './component/Vendor/PurchaseOrders/PurchaseOrder'
import SavePurchaseOrder from './component/Vendor/PurchaseOrders/SavePurchaseOrder'
import EditPurchaseOrder from './component/Vendor/PurchaseOrders/EditPurchaseOrder';

import Bills from './component/Vendor/Bills/Bills'
import RecurringBills from './component/Vendor/RecurringBills/RecurringBills'
import VendorCredits from './component/Vendor/VendorCredits/VendorCredits'
import SaveBillReport from './component/Vendor/Bills/SaveBill/savebill'
import EditBill from './component/Vendor/Bills/EditBill/EditBill'


import ShowAccountMinorCode from './component/Master/ShowAccountMinorCode/ShowAccountMinorCode';
import EditAccountMinorCode from './component/Master/ShowAccountMinorCode/EditAccountMinorCode';


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
import ShowRoles from './component/ProjectSetting/Roles/ShowRoles';

import AddRecurringInvoices from './component/Customer/RecurringInvoices/RecurringInvoices'
import TotalRecurringInvoice from './component/Customer/RecurringInvoices/TotalRecurringInvoice'
import EditRecurringInvoice from './component/Customer/RecurringInvoices/EditRecurringInvoice'

import TotalRecurringBill from './component/Vendor/RecurringBills/TotalRecurringBills'
import EditRecurringBills from './component/Vendor/RecurringBills/EditRecurringBill';

import LandingPage from './component/LandingPage/LandingPage';
import Signup from './component/SignUp/Signup';
import UserManualSidebar from './component/UserManual/UserManualSidebar';
import JVoucher from './component/Accountant/JournalVoucher/JVoucher'
import TotalJVoucher from './component/Accountant/JournalVoucher/TotalJVoucher'
import EditJVoucher from './component/Accountant/JournalVoucher/EditJVoucher';

import inserttdshead from './component/Master/TdsHead/inserttdshead'
import TotaltdsHead from './component/Master/TdsHead/TotaltdsHead'
import UpdatetdsHead from './component/Master/TdsHead/UpdatetdsHead'
import TotalBankingReceipt from './component/Accountant/BankingRecep/TotalBankingRecep';
import AddBankingReceipt from './component/Accountant/BankingRecep/AddBankingRecep';
import TotalBankingPayment from './component/Accountant/BankPayment/TotalBankPayment';
import AddBankingPayment from './component/Accountant/BankPayment/AddBankPayment';


const App = () => {

  //  setTimeout(() => {
  //   localStorage.removeItem('Token')
  //  },8000)

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/Signin" restricted={false} component={Login} />
          <Route exact path="/Signup" restricted={false} component={Signup} />


          <Route exact path="/OtpPage" component={OTPpage} />

          <PrivatRoute exact path="/Home" component={Home} />
          <PrivatRoute exact path="/LoginDetails" component={LoginDetails} />
          <PrivatRoute exact path="/ChangePassword" component={ChangePassword} />
          <PrivatRoute exact path="/Customer" component={Customer} />
          <PrivatRoute exact path="/CustomerNames" component={CustomerNames} />


          {/* <Route exact path="/Organisation" component={<Organisation/>}/> */}
          <PrivatRoute exact path="/Org" component={Org} />
          <PrivatRoute exact path="/EditOrganisation" component={EditOrganisation} />

          <PrivatRoute exact path="/Vendor" component={Vendor} />
          <PrivatRoute exact path="/ShowVendor" component={Showvendor} />
          <PrivatRoute exact path="/EditVendor" component={Editvendor} />

          <PrivatRoute exact path="/StateMaster" component={StateMaster} />
          <PrivatRoute exact path="/ShowState" component={ShowState} />
          <PrivatRoute exact path="/EditState" component={EditState} />

          <PrivatRoute exact path="/ShowCountry" component={ShowCountry} />
          <PrivatRoute exact path="/AddCountry" component={AddCountry} />
          <PrivatRoute exact path="/EditCountry" component={EditCountry} />

          <PrivatRoute exact path="/ShowCurrency" component={ShowCurrency} />
          <PrivatRoute exact path="/AddCurrency" component={AddCurrency} />
          <PrivatRoute exact path="/EditCurrency" component={EditCurrency} />

          <PrivatRoute exact path="/ShowCity" component={Showcity} />
          <PrivatRoute exact path="/AddCity" component={Addcity} />
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

          <PrivatRoute exact path="/AddCompliances" component={Addcompliances} />
          <PrivatRoute exact path="/ShowCompliances" component={Showcompliances} />
          <PrivatRoute exact path="/EditCompliances" component={Editcompliances} />
          <PrivatRoute exact path="/UploadComplianceDocument" component={UploadComplianceDocument} />


          <PrivatRoute exact path="/ShowCompliancesType" component={ShowcompliancesType} />
          <PrivatRoute exact path="/AddComplianceType" component={AddcomplianceType} />
          <PrivatRoute exact path="/EditComplianceType" component={EditComplianceType} />
          <PrivatRoute exact path="/Panding-Compliances" component={PandingCompliances} />

          <PrivatRoute exact path="/AddOrgAddress" component={AddOrgAddress} />
          <PrivatRoute exact path="/EditOrgAddress" component={EditOrgAddress} />

          <PrivatRoute exact path="/FincialYear" component={Fincialyear} />
          <PrivatRoute exact path="/ShowFinancialyear" component={ShowFincialyear} />
          <PrivatRoute exact path="/Updatefincialyear" component={Updatefincialyear} />

     
          <PrivatRoute exact path="/ShowChartAccount" component={ShowChartAccount} />
          <PrivatRoute exact path="/ChartOfAccount" component={ChartOfAccount} />
          <PrivatRoute exact path="/EditChartAccount" component={EditChartAccount} />

          <PrivatRoute exact path="/Currency-Adjustment" component={CurrencyAdjust} />

          <PrivatRoute exact path="/InsertAccountMajor" component={InsertAccountType} />
          <PrivatRoute exact path="/ShowAccountMajor" component={ShowAccountname} />
          <PrivatRoute exact path="/EditAccountMajor" component={EditAccountname} />

          <PrivatRoute exact path="/InsertAccountMinorCode" component={InsertMinorCode} />
          <PrivatRoute exact path="/ShowAccountMinorCode" component={ShowAccountMinorCode} />
          <PrivatRoute exact path="/EditAccountMinorCode" component={EditAccountMinorCode} />

          {/*  Not In Use */}
          {/* <PrivatRoute exact path="/ShowAccountInfo" component={ShowAccountInfo}/>
          <PrivatRoute exact path="/AddAccountInfo" component={AddAccountInfo}/>
          <PrivatRoute exact path="/EditAccountInfo" component={EditAccountInfo}/> */}

          <PrivatRoute exact path="/TotalRecurringFrequency" component={TotalRecurringFrequency} />
          <PrivatRoute exact path="/AddRecurringFrequency" component={AddRecurringFrequency} />
          <PrivatRoute exact path="/EditRecurringFreq" component={EditRecurringFreq} />

          <PrivatRoute exact path="/RecurringExpenses" component={RecurringExpenses} />

          {/*  Not In Use */}
          {/*  ###################### Sub Gl Not Now ####### */}
          {/* <PrivatRoute exact path="/AddSubCode" component={AddSubCode} />
          <PrivatRoute exact path="/TotalSubCode" component={TotalSubCode} />
          <PrivatRoute exact path="/EditSubCode" component={EditSubCode} /> */}

          <PrivatRoute exact path="/Estimates" component={Estimates} />

          <PrivatRoute exact path="/SalesOrder" component={SalesOrder} />
          <PrivatRoute exact path="/SaveSalesOrder" component={SaveSalesOrder} />
          <PrivatRoute exact path="/EditSalesOrder" component={EditSalesOrder} />


          <PrivatRoute exact path="/DeliveryChallans" component={DeliveryChallans} />
          <PrivatRoute exact path="/Invoices" component={Invoices} />

          <PrivatRoute exact path="/EditInvoice" component={EditInvoice} />
          <PrivatRoute exact path="/SaveInvoice" component={SaveInvoice} />

          <PrivatRoute exact path="/RecurringInvoices" component={RecurringInvoices} />
          <PrivatRoute exact path="/CreditNotes" component={CreditNotes} />
          <PrivatRoute exact path="/CreditNotesUI" component={CreditNotesUI} />
          <PrivatRoute exact path="/DebitNotes" component={DebitNotes} />

          <PrivatRoute exact path="/PaymentsReceived" component={PaymentsReceived} />

          <PrivatRoute exact path="/PurchaseOrder" component={PurchaseOrder} />
          <PrivatRoute exact path="/SavePurchaseOrder" component={SavePurchaseOrder} />
          <PrivatRoute exact path="/EditPurchaseOrder" component={EditPurchaseOrder} />

          <PrivatRoute exact path="/Bills" component={Bills} />
          <PrivatRoute exact path="/EditBill" component={EditBill} />
          <PrivatRoute exact path="/RecurringBills" component={RecurringBills} />
          <PrivatRoute exact path="/VendorCredits" component={VendorCredits} />
          <PrivatRoute exact path="/SaveBillReport" component={SaveBillReport} />

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

          <PrivatRoute exact path="/ShowEmployee" component={ShowEmployee} />
          <PrivatRoute exact path="/AddEmployee" component={AddEmployee} />
          <PrivatRoute exact path="/EditEmployee" component={EditEmployee} />

          <PrivatRoute exact path="/AddRoles" component={AddRoles} />
          <PrivatRoute exact path="/ShowRoles" component={ShowRoles} />

          <PrivatRoute exact path="/AddRecurringInvoices" component={AddRecurringInvoices} />
          <PrivatRoute exact path="/TotalRecurringInvoice" component={TotalRecurringInvoice} />
          <PrivatRoute exact path="/EditRecurringInvoice" component={EditRecurringInvoice} />

          <PrivatRoute exact path="/TotalRecurringBill" component={TotalRecurringBill} />
          <PrivatRoute exact path="/EditRecurringBills" component={EditRecurringBills} />


          <PrivatRoute exact path="/TotalJVoucher" component={TotalJVoucher} />
          <PrivatRoute exact path="/JVoucher" component={JVoucher} />
          <PrivatRoute exact path="/EditJVoucher" component={EditJVoucher} />

          <PrivatRoute exact path="/InsertTdsHead" component={inserttdshead} />
          <PrivatRoute exact path="/TotalTdsHead" component={TotaltdsHead} />
          <PrivatRoute exact path="/UpdateTdsHead" component={UpdatetdsHead} />


          <PrivatRoute exact path="/TotalBankingReceipt" component={TotalBankingReceipt} />
          <PrivatRoute exact path="/AddBankingReceipt" component={AddBankingReceipt} />

          <PrivatRoute exact path="/TotalBankingPayment" component={TotalBankingPayment} />
          <PrivatRoute exact path="/AddBankingPayment" component={AddBankingPayment} />

          <PrivatRoute exact path="/UserManual" component={UserManualSidebar} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>

    </div>
  )
}
export default App

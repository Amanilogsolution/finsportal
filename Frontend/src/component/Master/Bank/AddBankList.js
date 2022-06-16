import './addbanklist.css'
import Header from '../../Header/Header';
import Menu from '../../Menu/Menu';
import Footer from '../../Footer/Footer';
import Image1 from '../../../images/bg1.jpg'
import Sbilogo from '../../../images/sbilogo.jpg'
import Kotaklogo from '../../../images/Kotaklogo.png'
import Idbilogo from '../../../images/IDBIlogo.png'
import Iciclogo from '../../../images/icicilogo.jpg'
import Canralogo from '../../../images/canralogo.png'
import Pnblogo from '../../../images/pnblogo.svg'
import Paypallogo from '../../../images/paypallogo.png'
import HDFClogo from '../../../images/HDFClogo.png'
import AXISlogo from '../../../images/AXISlogo.png'
import Paytmlogo from '../../../images/paytmlogo.png'
import Centrallogo from '../../../images/centrallogo.jpg'

function AddBankList() {
  return (
    <>
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
                <br /> <h3 className="text-left ml-5">Connect your bank</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                          <div className="form-row">
                            <div className="col form-group">
                              <select
                                id="gsttreatment"
                                className="form-control col-md-6 pr-2">
                                <option selected disabled>Find your Bank</option>
                                <option>Allahabad Bank</option>
                                <option>Andhra Bank</option>
                                <option>Bank of Baroda</option>
                                <option>Bank of India</option>
                                <option>Bank of Maharashtra</option>
                                <option>Canara Bank</option>
                                <option>Punjab National Bank</option>
                                <option>State Bank of India</option>
                                <option>Union Bank of India</option>
                              </select>
                            </div>
                          </div>
                        </form>
                        <div>
                          <div className="imgrow">
                            <div className="imgrow1">
                              <div className="col1">
                                <img src={Sbilogo} alt="sbi bank" data-toggle="modal" data-target="#exampleModalCenter" />
                              </div>
                              <div className="col1">
                                <img src={Kotaklogo} alt="kotak bank" data-toggle="modal" data-target="#exampleModalCenter" />
                              </div>
                              <div className="col1">
                                <img src={Idbilogo} alt="idbi bank" data-toggle="modal" data-target="#exampleModalCenter"/>
                              </div>
                            </div>
                            <div className="imgrow2">
                              <div className="col2">
                                <img src={Iciclogo} alt="icic bank" data-toggle="modal" data-target="#exampleModalCenter" />
                              </div>
                              <div className="col2">
                                <img src={Canralogo} alt="canra bank" data-toggle="modal" data-target="#exampleModalCenter"/>
                              </div>
                              <div className="col2">
                                <img src={Pnblogo} alt="pnb bank" data-toggle="modal" data-target="#exampleModalCenter" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>Or Select from the popular banks</p>
                        <div>
                          <div className="imgrowsec2">
                            <div className="imgrow3">
                              <div className="col3">
                                <img src={Paypallogo} alt="Paypal bank" />
                              </div>
                              <div className="col3">
                                <img src={HDFClogo} alt="HDFC bank" />
                              </div>
                              <div className="col3">
                                <img src={AXISlogo} alt="AXIS bank" />
                              </div>
                            </div>
                            <div className="imgrow3">
                              <div className="col3">
                                <img src={Paytmlogo} alt="Paytm" />
                              </div>
                              <div className="col3">
                                <img src={Centrallogo} alt="Central bank of India" />
                              </div>
                              <div className="col3">
                                <img src={Pnblogo} alt="pnb bank" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      <div className="border-top card-body">
                        <button className="btn btn-danger" onClick={() => window.location.href = 'AddBank'}>Add Bank Manually</button>
                        <button className="btn btn-light ml-3" onClick={() => window.location.href = 'TotalBank'}>Cancel</button>
                      </div>
                    </div>
                    {/* card.// */}
                  </div>
                  {/* col.//*/}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
                {/*########################### Modal Start ################################*/}
                <div className="modal fade " id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Select Account Type</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                Select your Bank account type and help to optimize your feeds accordingly.
                <div className="modalcards" >
                  <div className="modalcard" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0554e6" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg><br />
                    Personal Account
                  </div>
                  <div className="modalcard " >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0554e6" className="bi bi-bank2" viewBox="0 0 16 16">
                      <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
                    </svg><br />
                    Corporate Account
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        {/* ################### Modal End ########################## */}
      </div>

    </>
  );
}

export default AddBankList;
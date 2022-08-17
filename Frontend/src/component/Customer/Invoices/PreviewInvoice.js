import React from 'react'
import './PreviewInvoice.css'

const InvoicePreview = (props) => {
  return (
    <div class="modal fade bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

      <div class="modal-dialog   modal-lg" role="document" >
        <div class="modal-content" style={{ width:"60vw",transform:"translate(-20%)" }}>
          {/* <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Invoice</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
          <div class="modal-body">
            <div className="modalinvoice">
              <div className="topdiv">
                <div className="topinnerdiv">
                  <h5>AWL India PVT Ltd.</h5>
                  <p>
                    Dashmesh Complex, Nadal Village,Old Pune Mumbai Highway, Khalapur,
                    Distt Raigad,Maharastra-410203 India
                  </p>
                  <div className="topbottomdiv"><b>GST IN.</b> 27AAGCA4705P1ZD</div>
                </div>
              </div>
              <div className="invoicediv">
                <div className="inerinvoicediv">
                  <div className="firstinvoicediv"><b>Activity :</b>02</div>
                  <div className="secondinvoicediv">
                  <b>TAX INVOICE NO :</b>&nbsp; 2212300325 &nbsp;
                  </div>
                  <div className="thirdinvoicediv"> &nbsp;16-08-2022 &nbsp;</div>
                  <div className="forthinvoicediv"><b> Rs.</b> 2153.00</div>
                </div>
              </div>

              <div className="addressmaindiv">
                <div className="inneraddduiv inneraddduiv1">
                  <h5><b>Bill To</b></h5>
                  <h6>Kelley Material Handling Equipment India Pvt Ltd</h6>
                  <p>
                    Dashmesh Complex, Warehousing & Godowns, Nadal Village, Old Pune
                    Bombay Road, Khalapur, Dist Raigad Mumbai Maharashtra-410202 India
                  </p>
                  <h6><b>GST IN.</b> 27AAECK1880H1ZG</h6>
                </div>
                <div className="inneraddduiv inneraddduiv2">
                  <h5><b>Place of Supply</b></h5>
                  <h6>KELLEY MATERIAL HANDLING EQUIPMENT INDIA PVT. LTD.</h6>
                  <p>
                    Kelley Material Handling Equipment India Pvt. Ltd. G - 09, SSR
                    Corporate Park, 13 / 6 Mathura Road, Sector - 27 B Faridabad -
                    121003, Haryana Faridabad Haryana 121003
                  </p>
                </div>
              </div>
              {/* Detail */}

              <div className="detail">
                <table className="detailtable">
                  <tr>
                    <td><b>Gross WT.</b> </td>
                    <td><b>Pcs.</b></td>
                    <td><b>Origin :</b> Mumbai</td>
                  </tr>
                  <tr>
                    <td><b>Details Of Goods :</b></td>
                    <td><b>Veh Type : Courier</b></td>
                    <td><b>Destination : </b>Faridabad</td>
                  </tr>
                </table>
              </div>

              <div className="itemtablediv">
                <table className="itemtable">
                  <thead className="itemthead">
                    <tr className="itemtr">
                      <th className="itemth">Sno.</th>
                      <th className="itemth" style={{ width: "25%" }}>Item Description</th>
                      <th className="itemth" style={{ width: "6%" }}>SAC Code</th>
                      <th className="itemth">Qty.</th>
                      <th className="itemth" style={{width:"8%"}}>Rate per Item</th>
                      <th className="itemth">Total</th>
                      <th className="itemth">Discount</th>
                      <th className="itemth" style={{width:"7%"}}>Taxable Value</th>
                      <th className="itemth gstouterdiv" style={{ width: "9%" }}>
                        <tr
                          className="itemthtr"
                          style={{ borderBottom: "1px solid #000"}}
                        >
                          <td>CGST</td>
                        </tr>
                        <tr className="itemthtr gstcolum">
                          <td>Rate</td>
                          <td>Amt</td>
                        </tr>
                      </th>
                      <th className="itemth" style={{ width: "9%" }}>
                        <tr
                          className="itemthtr"
                          style={{ borderBottom: "1px solid #000" }}
                        >
                          <td className="">SGST</td>
                        </tr>
                        <tr className="itemthtr gstcolum">
                          <td className="itemthtrtd">Rate</td>
                          <td className="">Amt</td>
                        </tr>
                      </th>
                      <th className="itemth" style={{ width: "8%" }}>
                        <tr
                          className="itemthtr"
                          style={{ borderBottom: "1px solid #000" }}
                        >
                          <td className="">IGST</td>
                        </tr>
                        <tr className="itemthtr gstcolum">
                          <td className="itemthtrtd">Rate</td>
                          <td className="">Amt</td>
                        </tr>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="itemthtrtd"><b>1</b></td>
                      <td className="itemthtrtd" style={{ width: "25%" }}>
                        COURIER CHARGES LR NO. BOM010013627
                      </td>
                      <td className="itemthtrtd">996812</td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd">1825.00</td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd">1825.00</td>
                      <td className="itemthtrtd gstcolum">
                        <td>9.0 %</td>
                        <td>164.25</td>
                      </td>
                      <td className="itemthtrtd  gstcolum">
                        <td>9.0%</td>
                        <td>164.25</td>
                      </td>
                      <td className="gstcolum">
                        <td>0%</td>
                        <td>0.00</td>
                      </td>
                    </tr>
                    <tr>
                      <td className="itemthtrtd">1</td>
                      <td className="itemthtrtd" style={{ width: "30%" }}>
                        COURIER CHARGES LR NO. BOM010013627
                      </td>
                      <td className="itemthtrtd">996812</td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd">1825.00</td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd">1825.00</td>
                      <td className="itemthtrtd gstcolum">
                        <td>9.0 %</td>
                        <td>164.25</td>
                      </td>
                      <td className="itemthtrtd  gstcolum">
                        <td>9.0%</td>
                        <td>164.25</td>
                      </td>
                      <td className="gstcolum">
                        <td style={{width:"50%"}}>90%</td>
                        <td style={{width:"50%"}}>0.00</td>
                      </td>
                    </tr>
                    <tr>
                      <td className="itemthtrtd">1</td>
                      <td className="itemthtrtd" style={{ maxWidth: "30%" }}>
                        COURIER CHARGES LR NO. BOM010013627
                      </td>
                      <td className="itemthtrtd">996812</td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd">1825.00</td>
                      <td className="itemthtrtd"></td>
                      <td className="itemthtrtd">1825.00</td>
                      <td className="itemthtrtd gstcolum">
                        <td>9.0 %</td>
                        <td>164.25</td>
                      </td>
                      <td className="itemthtrtd  gstcolum">
                        <td>9.0%</td>
                        <td>164.25</td>
                      </td>
                      <td className="gstcolum">
                        <td>0%</td>
                        <td>0.00</td>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="itemtfoot">
                    <tr className="itemtfoottr">
                      <th colSpan="5">Total</th>
                      <td className="itemtfoottrtd">1825.00</td>
                      <td className="itemtfoottrtd"></td>
                      <td className="itemtfoottrtd">1825.00</td>
                      <td className="itemtfoottrtd gstcolum">
                        <td></td>
                        <td>164.00</td>
                      </td>
                      <td className="itemtfoottrtd gstcolum">
                        <td></td>
                        <td className="">164.00</td>
                      </td>
                      <td className="itemtfoottrtd gstcolum">
                        <td></td>
                        <td className="">0.00</td>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="invoiceval">
                <h4><b>Total Invoice Value (In Words) :</b></h4>
                <h4>2153.00</h4>
              </div>
              <div className="invoicevalword">
                <h4><b>Total Invoice Value (In Figure) :</b></h4>
                <h4> Two Thousand One Hundred Fifty-Three Only</h4>
              </div>
              <div className="amounttax">
                <h4><b>Amount Of Tax :</b></h4>
                <table className="amounttaxtable">
                  <tr className="amounttaxtr">
                    <th colSpan="2" style={{ textAlign: "right" }}>
                      CGST AMT
                    </th>
                    <th>SGST AMT</th>
                    <th>IGST AMT</th>
                    <th>Total</th>
                  </tr>
                  <tr className="amounttaxtr">
                    <th>Rs.</th>
                    <td>164.00</td>
                    <td>164.00</td>
                    <td>0.00</td>
                    <td>328.00</td>
                  </tr>
                </table>
              </div>
              <div className="gstdetail">
                <h5>
                  GST Payable On Road Freight On Reverse Charge (Y) GSTIN Of Payer
                  :27AAECK1880H1ZG Delivery Note No. : 2122/04/08/03
                </h5>
              </div>

              <div className="payable">
                <h4>" Make All The Cheques Payable To "AWL INDIA PVT.LTD."</h4>
              </div>

              <div className="signature">
                <h4>Signature Of Authorized Representative :</h4>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-primary">Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview

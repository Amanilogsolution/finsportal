import React from 'react'
import './PreviewInvoice.css'

const InvoicePreview = (props) =>{
    return(
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{border:"2px solid red"}}>

        <div class="modal-dialog modal-dialog-centered" role="document"style={{border:"2px solid red",width:"100vw"}}>
          <div class="modal-content"style={{border:"2px solid red",width:"100vw"}}>
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
          <div className="topbottomdiv">GST IN. 27AAGCA4705P1ZD</div>
        </div>
      </div>
      <div className="invoicediv">
        <div className="inerinvoicediv">
          <div className="firstinvoicediv">Activity :02</div>
          <div className="secondinvoicediv">
            TAX INVOICE NO :&nbsp; 2212300325 &nbsp;
          </div>
          <div className="thirdinvoicediv"> &nbsp;16-08-2022 &nbsp;</div>
          <div className="forthinvoicediv"> Rs. 2153.00</div>
        </div>
      </div>

      <div className="addressmaindiv">
        <div className="inneraddduiv inneraddduiv1">
          <h5>Bill To</h5>
          <h6>Kelley Material Handling Equipment India Pvt Ltd</h6>
          <p>
            Dashmesh Complex, Warehousing & Godowns, Nadal Village, Old Pune
            Bombay Road, Khalapur, Dist Raigad Mumbai Maharashtra-410202 India
          </p>
          <h6>GST IN. 27AAECK1880H1ZG</h6>
        </div>
        <div className="inneraddduiv inneraddduiv2">
          <h5>Place of Supply</h5>
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
            <td>Gross WT. </td>
            <td>Pcs.</td>
            <td>Origin : Mumbai</td>
          </tr>
          <tr>
            <td>Details Of Goods :</td>
            <td>Veh Type : Courier</td>
            <td>Destination : Faridabad</td>
          </tr>
        </table>
      </div>

      <div className="itemtablediv">
        <table className="itemtable">
          <thead className="itemthead">
            <tr className="itemtr">
              <th className="itemth">Sno.</th>
              <th className="itemth">Item Description</th>
              <th className="itemth">SAC Code</th>
              <th className="itemth">Qty.</th>
              <th className="itemth">Rate per Item</th>
              <th className="itemth">Total</th>
              <th className="itemth">Discount</th>
              <th className="itemth">Taxable Value</th>
              <th className="itemth gstouterdiv" style={{ width: "8%" }}>
                <tr
                  className="itemthtr"
                  style={{ borderBottom: "1px solid #000" }}
                >
                  <td>CGST</td>
                </tr>
                <tr className="itemthtr gstcolum">
                  <td>Rate</td>
                  <td>Amt</td>
                </tr>
              </th>
              <th className="itemth" style={{ width: "8%" }}>
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
        <h4>Total Invoice Value (In Words) :</h4>
        <h4>2153.00</h4>
      </div>
      <div className="invoicevalword">
        <h4>Total Invoice Value (In Figure) :</h4>
        <h4> Two Thousand One Hundred Fifty-Three Only</h4>
      </div>
      <div className="amounttax">
        <h4>Amount Of Tax :</h4>
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
        <h4>
          GST Payable On Road Freight On Reverse Charge (Y) GSTIN Of Payer
          :27AAECK1880H1ZG Delivery Note No. : 2122/04/08/03
        </h4>
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
            </div>
          </div>
        </div>
      </div>
    )
}

export default InvoicePreview

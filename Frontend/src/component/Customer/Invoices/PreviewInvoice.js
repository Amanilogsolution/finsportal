import React from 'react'
import './PreviewInvoice.css'
import DecamalNumber from 'decimal-number-to-words'


const InvoicePreview = (props) => {
  return (
    <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

      <div className="modal-dialog   modal-lg" role="document" >
        <div className="modal-content modeldivcard" >
          {/* <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Invoice</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
          <div className="modal-body">
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
                  <div className="firstinvoicediv"><b>Activity :</b>{props.Allinvoicedata.Activity}</div>
                  <div className="secondinvoicediv">
                    <b>TAX INVOICE NO :</b>&nbsp; {props.Allinvoicedata.TaxInvoice} &nbsp;
                  </div>
                  <div className="thirdinvoicediv"> &nbsp;{props.Allinvoicedata.InvoiceData} &nbsp;</div>
                  <div className="forthinvoicediv"><b> Rs.</b>{props.Allinvoicedata.GrandTotal}</div>
                </div>
              </div>

              <div className="addressmaindiv">
                <div className="inneraddduiv inneraddduiv1">
                  <h5><b>Bill To</b></h5>
                  {/* <h6>Kelley Material Handling Equipment India Pvt Ltd</h6> */}
                  <p>
                    {props.Allinvoicedata.BillTo}
                  </p>
                  <h6><b>GST IN.</b> {props.Allinvoicedata.BillToGst}</h6>
                </div>
                <div className="inneraddduiv inneraddduiv2">
                  <h5><b>Place of Supply</b></h5>
                  {/* <h6>KELLEY MATERIAL HANDLING EQUIPMENT INDIA PVT. LTD.</h6> */}
                  <p>
                    {props.Allinvoicedata.SupplyTo}

                  </p>
                </div>
              </div>
              {/* Detail */}

              <div className="detail">
                <table className="detailtable">
                <tbody>
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
                  </tbody>
                </table>
              </div>




              {/* Second Table Start */}

              <div className='itemdivsec'>
                <table className='itemtablesec'>
                  <thead className='itemheadsec'>
                    <tr>
                      <th>Sno</th>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Tax</th>
                      <th>Unit</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className='itembodysec'>
                    <tr className='itemtrsec'>
                      <th>1</th>
                      <td>COURIER CHARGES LR NO. BOM010013627</td>
                      <td>12</td>
                      <td>12</td>
                      <td>10</td>
                      <td>Box</td>
                      <td>144</td>
                      <td>158</td>
                    </tr>
                    <tr className='itemtrsec'>
                      <th>2</th>
                      <td>COURIER CHARGES LR NO. BOM010013628</td>
                      <td>12</td>
                      <td>12</td>
                      <td>10</td>
                      <td>Box</td>
                      <td>144</td>
                      <td>158</td>
                    </tr>
                  </tbody>
                  <tfoot className='itemfootsec'>
                    <tr className='itemfoottrsec'>
                    <th colSpan='6'>Total</th>
                      <td>288</td>
                      <td>316</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Second Table  End*/}




              {/* 
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
                      {/* <th className="itemth">Discount</th> 
                      <th className="itemth" style={{width:"7%"}}>Taxable Value</th>
                      <th className="itemth gstouterdiv" style={{ width: "10%" }}>
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
                      <th className="itemth" style={{ width: "10%" }}>
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
                      <th className="itemth" style={{ width: "9%" }}>
                        <tr
                          className="itemthtr"
                          id='nkl'
                          style={{ borderBottom: "1px solid #000" }}
                        >
                          <td className="">IGST</td>
                        </tr>
                        <tr className="gstcolum">
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
                      {/* <td className="itemthtrtd"></td> 
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
                      {/* <td className="itemthtrtd"></td> 
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
                      {/* <td className="itemthtrtd"></td> 
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
                      {/* <td className="itemtfoottrtd"></td> 
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
              </div> */}
              <div className="invoiceval">
                <h4><b>Total Invoice Value (In Words) :</b></h4>
                <h4>{props.Allinvoicedata.GrandTotal}</h4>
              </div>
              <div className="invoicevalword">
                <h4><b>Total Invoice Value (In Figure) :</b></h4>
                <h4>{DecamalNumber.toWords(Number(props.Allinvoicedata.GrandTotal))} only </h4>
              </div>
              <div className="amounttax">
                <h4><b>Amount Of Tax :</b></h4>
                <table className="amounttaxtable">
                <tbody>
                  <tr className="amounttaxtr">
                    <th colSpan="2" style={{ textAlign: "right" }}>
                      CGST AMT
                    </th>
                    <th>SGST AMT</th>
                    <th>IGST AMT</th>
                    <th>Total</th>
                  </tr>
                  <tr className="amounttaxtr">
                    <th className='amounttaxtrth'>Rs.</th>
                    <td>{props.Allinvoicedata.CGST}</td>
                    <td>{props.Allinvoicedata.SGST}</td>
                    <td>{props.Allinvoicedata.IGST}</td>
                    <td>{props.Allinvoicedata.TotalTaxamount} </td>
                  </tr>
                  </tbody>
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
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview

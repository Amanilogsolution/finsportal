import React, { useRef, useEffect, useState } from 'react'
import './PreviewInvoice.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { GetInvoice, GetSubInvoice } from '../../../api/index'


const InvoicePreview = () => {
  const pdfRef = useRef(null);
  const [data, setData] = useState({
    major: '',
    invoice_no: '',
    invoice_date: '',
    invoice_amt: '',
    location_name: '',
    invoice_amt: '',
    cgst_amt: '',
    sgst_amt: '',
    igst_amt: '',
    total_tax: ''
  })
  const [subinv, setSubInv] = useState([
    {
      major: '',
      quantity: '',
      rate: '',
      tax: '',
      unit: '',
      amount: '',
      Totalamount: ''
    }
  ])

  useEffect(() => {
    const fetch = async () => {
      const preview = localStorage.getItem('preview')
      const org = localStorage.getItem('Organisation')
      const result = await GetInvoice(org, preview)
      console.log(result)
      setData(result[0])
      console.log(data)
      const result1 = await GetSubInvoice(org, preview)
      console.log(result1)
      setSubInv(result1)

    }
    fetch()

  }, [localStorage.getItem('preview')])

  const print = (e) => {
    e.preventDefault();
    const content = pdfRef.current;
    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save(`Invoice.pdf`);
      },
      html2canvas: { scale: 0.21 },
      margin: [5, 0, 0, 5],


    });
  };
  return (
    <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      {console.log(data)}
      <div className="modal-dialog   modal-lg" role="document" >
        <div className="modal-content modeldivcard" >
          <div className="modal-body" ref={pdfRef}>
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
                  <div className="firstinvoicediv"><b>Activity :</b>{data.major}</div>
                  <div className="secondinvoicediv" >
                    <b>TAX INVOICE NO :</b>&nbsp; {data.invoice_no} &nbsp;
                  </div>
                  <div className="thirdinvoicediv"> &nbsp;{data.invoice_date} &nbsp;</div>
                  <div className="forthinvoicediv"><b> Rs.</b>{data.invoice_amt}</div>
                </div>
              </div>

              <div className="addressmaindiv">
                <div className="inneraddduiv inneraddduiv1">
                  <h5><b>Bill To</b></h5>
                  <p>{data.cust_location_add}</p>
                  <p>
                  </p>
                  <h6><b>GST IN.</b>
                  </h6>{data.cust_location_gst}
                </div>
                <div className="inneraddduiv inneraddduiv2">
                  <h5><b>Place of Supply</b></h5>
                  <p>
                    {data.location_name}
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
                      <td><b>Origin :</b> </td>
                    </tr>
                    <tr>
                      <td><b>Details Of Goods :</b></td>
                      <td><b>Veh Type : Courier</b></td>
                      <td><b>Destination : </b></td>
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
                    {
                      subinv.map((item, index) => (
                        <tr className='itemtrsec'>
                          <th>{index + 1}</th>
                          <td>{item.major}</td>
                          <td>{item.quantity}</td>
                          <td>{item.rate}</td>
                          <td>{item.tax}</td>
                          <td>{item.unit}</td>
                          <td>{item.amount}</td>
                          <td>{item.Totalamount}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot className='itemfootsec'>
                    <tr className='itemfoottrsec'>
                      <th colSpan='6'>Total</th>
                      <td></td>
                      <td></td>
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
                <h4>{data.invoice_amt}</h4>
              </div>
              <div className="invoicevalword">
                <h4><b>Total Invoice Value (In Figure) :</b></h4>
                <h4>{DecamalNumber.toWords(Number(data.invoice_amt))}  only </h4>
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
                      <td>{data.cgst_amt}</td>
                      <td>{data.sgst_amt}</td>
                      <td>{data.igst_amt}</td>
                      <td>{data.total_tax} </td>
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
            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            <button type="button" className="btn btn-success" onClick={print}>Print</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview

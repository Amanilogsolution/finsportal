import React, { useRef, useEffect, useState } from 'react'
import './PreviewInvoice.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { GetInvoice, GetSubInvoice, GetAccountMinorCodeName, showOrganisation } from '../../../api/index'


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
  const [activity, setActivity] = useState('')
  const [orgdata, setOrgdata] = useState([])
  const [custdetail, setCustdetail] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const preview = localStorage.getItem('preview')
      const org = localStorage.getItem('Organisation')
      const result = await GetInvoice(org, preview)
      setData(result[0])

      // const activity_code = await GetAccountMinorCodeName(org, result[0].major)
      // setActivity(activity_code)
      console.log('njksjc',org, preview)
      const result1 = await GetSubInvoice(org, preview)
      console.log('dfc',result1)
      setSubInv(result1)
      const orgdata = await showOrganisation(org)
      setOrgdata(orgdata)

    }
    fetch()

  }, [localStorage.getItem('preview')])

  const print = (e) => {
    e.preventDefault();
    const content = pdfRef.current;
    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save(`Invoice-${data.invoice_no}.pdf`);
      },
      html2canvas: { scale: 0.233 },
      margin: [5, 0, 0, 5],
    });
  };

  return (

    <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog   modal-lg" role="document" >
        <div className="modal-content modeldivcard" >
          <div className="modal-body text-dark" ref={pdfRef}>
            <div className="modalinvoice">
              <div className="topdiv d-flex mb-5">
                <div className='invoiceorglogodiv'>
                  <img className='orgpreviewlogo' src={localStorage.getItem('Orglogo')} alt='' />
                </div>
                <div className="topinnerdiv mr-3">
                  <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                  <p>
                    {orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}
                  </p>
                  <div className="topbottomdiv"><b>GST IN.</b> {orgdata.org_gst}</div>
                </div>
              </div>
              <div className="invoicediv">
                <div className="inerinvoicediv">
                  {/* <div className="firstinvoicediv"><b>Activity :</b>{activity.account_name}</div> */}
                  <div className="firstinvoicediv"><b>Date: </b>{data.startdate}</div>
                  <div className="secondinvoicediv" ><b>TAX INVOICE NO :</b>{data.invoice_no}</div>
                  {/* <div className="thirdinvoicediv"> &nbsp;{data.startdate} &nbsp;</div> */}
                  <div className="forthinvoicediv"><b>{data.currency_type || 'INR'}. </b>{data.invoice_amt}</div>
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
                      <td><b>Origin :{data.origin}</b> </td>
                    </tr>
                    <tr>
                      <td><b>Details Of Goods :</b></td>
                      <td><b>Veh Type : Courier</b></td>
                      <td><b>Destination : {data.destination}</b></td>
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
                      <th>Activity</th>
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
                          <td>{item.billing_code}</td>
                          <td>{item.minor}</td>
                          <td>{item.quantity}</td>
                          <td>{item.rate}</td>
                          <td>{item.taxableamount}</td>
                          <td>{item.unit}</td>
                          <td>{item.amount}</td>
                          <td>{Number(item.amount) + Number(item.taxableamount)}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot className='itemfootsec'>
                    <tr className='itemfoottrsec'>
                      <th colSpan='6'>Total</th>
                      <td>{data.billsubtotal}</td>
                      <td>{data.invoice_amt}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Second Table  End*/}

              <div className="invoiceval">
                <h4><b>Total Invoice Value (In Words) :</b></h4>
                <h4>{data.invoice_amt}</h4>
              </div>
              <div className="invoicevalword">
                <h5><b>Total Invoice Value (In Figure) :</b></h5>
                <h4>{DecamalNumber.toWords(Number(data.invoice_amt))}  only </h4>
              </div>
              <div className="amounttax">
                <h4><b>Amount Of Tax :</b></h4>
                <table className="amounttaxtable">
                  <tbody>
                    <tr className="amounttaxtr">
                      <th colSpan="2" style={{ textAlign: "right" }}>
                        CGST
                      </th>
                      <th>S/UT GST</th>
                      <th>IGST</th>
                      <th>Total</th>
                    </tr>
                    <tr className="amounttaxtr">
                      <th className='amounttaxtrth'>{data.currency_type || 'INR'}.</th>
                      <td>{Number(data.cgst_amt) > 0 ? data.taxable_amt / 2 : 0}</td>
                      <td>{Number(data.sgst_amt) > 0 ? data.taxable_amt / 2 : 0}</td>
                      <td>{Number(data.igst_amt) > 0 ? data.taxable_amt : 0}</td>
                      <td>{data.taxable_amt} </td>
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
            <button type="button" className="btn btn-success" onClick={print}>Print</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview

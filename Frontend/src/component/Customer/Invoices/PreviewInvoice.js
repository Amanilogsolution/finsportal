import React, { useRef,memo,useEffect,useState } from 'react'
import './PreviewInvoice.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { showOrganisation } from '../../../api'


const InvoicePreview = (props) => {
  const [orgdata, setOrgdata] = useState([])

  const pdfRef = useRef(null);
  const print = (e) => {
    e.preventDefault();
    const content = pdfRef.current;
    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save(`Invoice-${props.Allinvoicedata.TaxInvoice}.pdf`);
      },
      html2canvas: { scale: 0.233 },
      margin: [5, 0, 0, 5],


    });
  };

  useEffect(() => {
    const fetchdata = async () => {
      let org=localStorage.getItem('Organisation');
      const result = await showOrganisation(org)
      setOrgdata(result)
    }
    fetchdata()
  }, [props])
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
                  <div className="firstinvoicediv"><b>Activity :</b>{props.Allinvoicedata.Activity}</div>
                  <div className="secondinvoicediv" >
                    <b>TAX INVOICE NO :</b>&nbsp; {props.Allinvoicedata.TaxInvoice} &nbsp;
                  </div>
                  <div className="thirdinvoicediv"> &nbsp;{props.Allinvoicedata.InvoiceData} &nbsp;</div>
                  <div className="forthinvoicediv"><b> INR.</b>{props.Allinvoicedata.GrandTotal}</div>
                </div>
              </div>

              <div className="addressmaindiv">
                <div className="inneraddduiv inneraddduiv1">
                  <h5><b>Bill To</b></h5>
                  <p>
                    {props.Allinvoicedata.BillTo}
                  </p>
                  <h6><b>GST IN.</b> {props.Allinvoicedata.BillToGst}</h6>
                </div>
                <div className="inneraddduiv inneraddduiv2">
                  <h5><b>Place of Supply</b></h5>
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
                      <td><b>Origin :</b> {props.Allinvoicedata.OriginState}</td>
                    </tr>
                    <tr>
                      <td><b>Details Of Goods :</b></td>
                      <td><b>Veh Type : Courier</b></td>
                      <td><b>Destination : </b>{props.Allinvoicedata.DestinationState}</td>
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
                      props.Allitems.map((item, index) => (
                        <tr key={index} className='itemtrsec'>
                          <th>{index + 1}</th>
                          <td>{item.itemsvalue}</td>
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
                      <td>{props.Allinvoicedata.Totalamounts}</td>
                      <td>{props.Allinvoicedata.GrandTotal}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>


              <div className="invoiceval">
                <h4><b>Total Invoice Value (In Words) :</b></h4>
                <h4>{props.Allinvoicedata.GrandTotal}</h4>
              </div>
              <div className="invoicevalword">
                <h5><b>Total Invoice Value (In Figure) :</b></h5>
                <h4>{DecamalNumber.toWords(Number(props.Allinvoicedata.GrandTotal))} only </h4>
              </div>
              <div className="amounttax">
                <h4><b>Amount Of Tax :</b></h4>
                <table className="amounttaxtable">
                  <tbody>
                    <tr className="amounttaxtr">
                      <th colSpan="2" style={{ textAlign: "right" }}>CGST AMT</th>
                      <th>SGST AMT</th>
                      <th>IGST AMT</th>
                      <th>Total</th>
                    </tr>
                    <tr className="amounttaxtr">
                      <th className='amounttaxtrth'>INR.</th>
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
            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            <button type="button" className="btn btn-success" onClick={print}>Print</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(InvoicePreview)

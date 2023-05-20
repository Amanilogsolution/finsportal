import img1 from '../../../../images/UserManual/CustInvoice/img1.jpg'
import img2 from '../../../../images/UserManual/CustInvoice/img2.jpg'
import img3 from '../../../../images/UserManual/CustInvoice/img3.jpg'

const BillUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='p-4'>

                        <div className='d-flex justify-content-around'>
                            <div style={{ width: "70%", margin: "auto" }}>
                                <h2>Bill</h2>
                                <p>The first step is go onto sidebar click onto purchases dropdown. You will see options select Bill</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>

                        <div className=''>
                            <h2>Total Save Bill</h2>
                            <p>After click on Bill you will see new interface total save Bill table</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                            <p>You can see all Bill in the table, We also have filter on this page you can search Bill by Vendor Name, Voucher Number, Amount</p>
                        </div>

                        <div className=''>
                            <h2>Add Bill</h2>
                            <p>To add new Bill click on add bill button, you will see new interface</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "400px" }} src={img3} />
                            </div>
                            <p>Fill all the details and save? post Bill detail, You can also see preview of Bill on click preview Bill</p>
                        </div>
                        <div className=''>
                            <h2>Post save Bills</h2>
                            <p>To post save Bill click on edi button, on total save bill</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "400px" }} src={img3} />
                            </div>
                            <p>Fill all the details and post Bill, You can also see preview of Bill on click preview Bill</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BillUserManual;
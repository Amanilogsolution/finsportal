import img1 from '../../../../images/UserManual/salesOrder/so1.png'
import img2 from '../../../../images/UserManual/salesOrder/so2.png'
import img3 from '../../../../images/UserManual/salesOrder/so3.png'
import img5 from '../../../../images/UserManual/Customers/img5.jpg'
import img6 from '../../../../images/UserManual/Customers/img6.jpg'
import '../CustomerUserManual/CustomerUserManual.css'

const RecurringInvUserManual = () => {
    return (
        <>
            <div className='ReccuInv_UserManual p-4'>
                <div className='ReccuInv1 d-flex justify-content-around'>
                    <div className='m-auto' style={{ width: "70%" }}>
                        <h2>Recurring Invoice</h2>
                        <p>The first step is go onto sidebar click onto sales dropdown. You will see options select Recurring Invoice</p>
                    </div>
                    <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                        <img style={{ width: "140px", height: "350px" }} src={img1} />
                    </div>
                </div>
                <div className='ReccuInv2'>
                    <h2>Total Recurring Invoice</h2>
                    <p>After click on Recurring Invoice you will see the interface total Recurring Invoice table</p>
                    <div className='d-flex justify-content-center my-4'>
                        <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                    </div>
                </div>

                <div className='ReccuInv4'>
                    <div >
                        <h2>Add new Recurring Invoice</h2>
                        <p>To add new Recurring Invoice click on Add Recurring Invoice button. A new interface will appear you can see below, fill all the mandatory details than save this</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img className='border' src={img3} style={{ width: "720px" }} />
                    </div>
                </div>
                <div className='ReccuInv5 d-flex justify-content-between my-4'>
                    <div >
                        <h2>Post Recurring Invoice</h2>
                        <p>If you want to Post Recurring Invoice we also have option click on that Recurring Invoice Number at Total saved Recurring Invoice,</p>
                        <p>Select Sales Order, Fill mandatory Fields and than click on Post button  to Post your Recurring Invoice</p>
                    </div>
                    <div>
                        <img className='border' src={img6} style={{ width: "300px" }} />
                    </div>
                </div>
                <div className='ReccuInv6 d-flex justify-content-between my-4'>
                    <div >
                        <h2>Active/Deactive Recurring Invoice</h2>
                        <p>If you want to Deactive Recurring Invoice we also have option click on that Checkbox (Deactive) at Total saved Recurring Invoice,</p>
                    </div>
                    <div>
                        <img className='border' src={img6} style={{ width: "300px" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecurringInvUserManual;
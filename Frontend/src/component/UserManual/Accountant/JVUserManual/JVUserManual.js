import img1 from '../../../../images/UserManual/salesOrder/so1.png'
import img2 from '../../../../images/UserManual/salesOrder/so2.png'
import img3 from '../../../../images/UserManual/salesOrder/so3.png'
import img5 from '../../../../images/UserManual/Customers/img5.jpg'
import img6 from '../../../../images/UserManual/Customers/img6.jpg'

const JVUserManual = () => {
    return (
        <>
            <div className='p-4'>
                <div className='d-flex justify-content-around'>
                    <div className='m-auto' style={{ width: "70%" }}>
                        <h2>Journal Voucher</h2>
                        <p>The first step is go onto sidebar click onto accountant dropdown. You will see options select Journal Voucher</p>
                    </div>
                    <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                        <img style={{ width: "140px", height: "350px" }} src={img1} />
                    </div>
                </div>
                <div className=''>
                    <h2>Total Journal Voucher</h2>
                    <p>After click on Sales Order you will see the interface total Journal Voucher table</p>
                    <div className='d-flex justify-content-center my-4'>
                        <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                    </div>
                </div>

                <div className=''>
                    <div >
                        <h2>Add new Journal Voucher</h2>
                        <p>To add new Journal Voucher click on Add Journal Voucher button. A new interface will appear you can see below, fill all the mandatory details than save this.</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img className='border' src={img3} style={{ width: "720px" }} />
                    </div>
                </div>
                {/* <div className='customer5 d-flex justify-content-around my-4'>
                    <div >
                        <h4>Update Journal Voucher</h4>
                        <p>If you want to update Sales Order we also have option click on that Sales Order Number at Total saved Sales Order,</p>
                        <p>Select Sales Order, Fill mandatory Fields and than click on Post button  to Post your Sales Order</p>
                    </div>
                    <div>
                        <img className='border'  src={img6} style={{  width: "300px" }} />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default JVUserManual;
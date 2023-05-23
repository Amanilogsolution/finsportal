import img1 from '../../../../images/UserManual/salesOrder/so1.png'
import img2 from '../../../../images/UserManual/salesOrder/so2.png'
import img3 from '../../../../images/UserManual/salesOrder/so3.png'
import img5 from '../../../../images/UserManual/Customers/img5.jpg'
import img6 from '../../../../images/UserManual/Customers/img6.jpg'

const PoUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='p-4'>
                        <div className='d-flex justify-content-around'>
                            <div className='m-auto' style={{ width: "70%" }}>
                                <h2>Purchases Order</h2>
                                <p>The first step is go onto sidebar click onto Purchases dropdown. You will see options select purchases Order</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>
                        <div className=''>
                            <h2>Total Purchases Order</h2>
                            <p>After click on Purchases Order you will see the interface total Save Purchases Order table</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                        </div>

                        <div className=''>
                            <div >
                                <h4>Add new Purchases Order</h4>
                                <p>To add new Purchases Order click on Add PO button. A new interface will appear you can see below, fill all the mandatory details than Save/Post this.</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img className='border' src={img3} style={{ width: "720px" }} />
                                <p>You also Preview the Po by Clicking Preview PO button</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-around my-4'>
                            <div >
                                <h4>Post Purchases Order</h4>
                                <p>If you want to Post Purchases Order we also have option click on that Purchases Order Number at Total saved Purchases Order.</p>
                                <p>Select Purchases Order, Fill mandatory Fields and than click on Post button  to Post Purchases Order</p>
                            </div>
                            <div>
                                <img className='border' src={img6} style={{ width: "300px" }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PoUserManual;
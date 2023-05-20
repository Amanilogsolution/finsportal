import img1 from '../../../../images/UserManual/Customers/img1.jpg'
import img2 from '../../../../images/UserManual/Customers/img2.jpg'
import img3 from '../../../../images/UserManual/Customers/img3.jpg'

const DnUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='p-4'>
                        <div className='d-flex justify-content-around'>
                            <div className='m-auto' style={{ width: "70%" }}>
                                <h2>Debit Notes</h2>
                                <p>The first step is go onto sidebar click Purchases dropdown. You will see options select Debit Notes</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>
                        <div className=''>
                            <h2>Total Approved/waiting Dn</h2>
                            <p>After click on Debit Notes you will see the interface total Approved/waiting Dn table</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                        </div>
                        <div className='d-flex my-2'>
                            <div className='m-auto'>
                                <h4>Generate Debit Notes</h4>
                                <p>If you want to Generate New Dn click on Generate Dn button, then a modal will appear that is for Fill Data, and send Approval request to admin.</p>
                                <p>After Approved you can able to Generate dn</p>
                            </div>
                            <div>
                                <img className='border' src={img3} style={{ width: "300px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DnUserManual;
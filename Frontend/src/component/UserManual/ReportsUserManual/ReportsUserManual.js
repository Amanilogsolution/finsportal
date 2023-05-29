import MenuImg from '../../../images/UserManual/salesOrder/so1.png'
import TotalScrImg from '../../../images/UserManual/salesOrder/so2.png'
import AddScrImg from '../../../images/UserManual/salesOrder/so3.png'
import UpdateScrImg from '../../../images/UserManual/Customers/img6.jpg'
import ImportScrImg from '../../../images/UserManual/Customers/img3.jpg'

const ReportsUserManual = () => {
    return (
        <>
            <div className='p-4'>
                <div className='d-flex justify-content-around'>
                    <div className='m-auto' style={{ width: "70%" }}>
                        <h2>Reports</h2>
                        <p>The first step is go onto sidebar click onto Reports dropdown. You will see options select Reports</p>
                    </div>
                    <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                        <img style={{ width: "140px", height: "350px" }} src={MenuImg} />
                    </div>
                </div>
                <div className=''>
                    <h2>Filter for Get Reports</h2>
                    <p>After click on Filter button you will see the interface for report </p>
                    <div className='d-flex justify-content-center my-4'>
                        <img className='border' style={{ width: "720px", height: "320px" }} src={TotalScrImg} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportsUserManual;
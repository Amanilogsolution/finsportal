import './loadingpage.css'

const LoadingPage = () => {
    return (
        <>
            <div id='outerloadingdiv position-relative' >
                <div id='innerloadingdiv position-absolute d-flex flex-column align-items-center' >
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div></div>
                    <h1>Wait a sec.</h1>
                </div>
            </div>
        </>
    )
}

export default LoadingPage;
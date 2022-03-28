import "./Organisation.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
function Organisation() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const errorshow = () => {
    handleShow();
  };
  const f1 = (e) => {
    e.preventDefault();
    const d1 = document.getElementById("ipt").value;
    if (d1.length === 0) {
      errorshow();
    } else{
      window.location.href = "/org";
    }
  };

  return (
    <>
      <div className="maincontainer">
        <div className="appcontainer">
          <br /> <p className="text-center">ILogsolution is your end-to-end online accounting software.</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <article className="card-body" style={{borderTop:"3.5px solid blue"}}>
                  <h3>Welcome ILogsolution</h3>
                  <form>
                    <div className="form-row">
                      <div className="col form-group">
                        <label>
                          Organisation Name
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input type="text" className="form-control" id="ipt" placeholder required />
                      </div>

                    </div>
                    <div className="form-group">
                      <label>
                        Business Location<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-select"
                        value="India"
                        placeholder
                        required
                        disabled
                        style={{ cursor: "not-allowed" }}
                      />
                      <small className="form-text text-muted">
                        To create an organization with another country, go to
                        <a href="#">ILogsolution.com</a>
                      </small>
                    </div>
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlfor="save"></label>
                      <div className="col-md-20" style={{ width: "100%" }}>
                        <button
                          id="save"
                          name="save"
                          className="btn btn-success"
                          onClick={f1}
                        >
                          Let's get start
                        </button>
                        <button id="clear" name="clear" className="btn ml-2">
                          Cancel
                        </button>
                        <a
                          href="#"
                          style={{ float: "right" }}
                        >
                          Privacy Policy
                        </a>
                      </div>
                    </div>
                  </form>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

{/*----------- Alert Modal ----------------------- */}
      <Modal show={show} onHide={handleClose} style={{height:"92px",fontSize:"16px",borderRadius:"10px"}}>
        <Modal.Header
          closeButton
          className="modelbg"
        >
          <Modal.Title>Please! fill the organisation name</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
}

export default Organisation;

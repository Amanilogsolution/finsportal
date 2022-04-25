import React, { useState } from 'react'
import * as XLSX from "xlsx";


 const Modalcomponent =(props)=> {
  const [data, setdata] = useState([]);

  const handleClick = () => {
    // const Jsondata = JSON.stringify(data)
    const array = JSON.stringify(data)
    const datas = JSON.parse(array)
    
    props.importdatas(datas)

    props.function()
    // window.location.reload()
  };
  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname]; // console.log(result);
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      // console.log(data);
      var lines = data.split("\n");

      var result = [];

      var headers = lines[0].split(",");

      for (var i = 1; i < lines.length-1; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      setdata(result);
      // console.log(result);
    };
    reader.readAsBinaryString(file);
  };
    return (
      <div>
                     <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">  Import excel file </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">  
                    <div className=" ">
                      <label htmlFor="user_name" className=" col-form-label font-weight-normal" >
                        <span >Select the file</span>
                      </label>
                      <div className=" ">
                        <input id="" type="file"  onChange={onChange} className="form-control" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                      </div><br/>
                    <span style={{color:"red"}}>
                       <a href={props.excel} download> Download formate</a>
                    </span><br/>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" onClick={handleClick} className="btn btn-primary"  data-dismiss="modal">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------ Modal end -----------------------------*/}
        
      </div>
    )
  }

export default Modalcomponent

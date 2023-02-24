import React,{useState} from 'react'
import './style.css'
import { FileUploader } from "react-drag-drop-files";


function UploadComplianceDocument() {
    const fileTypes = ["JPEG", "PNG", "GIF"];

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        console.log(file);
      setFile(file);
    };

    return (
        <>
        <FileUploader 
        handleChange={handleChange}
         name="file"
          types={fileTypes} 
          />
         <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>

        </>
    )
}

export default UploadComplianceDocument

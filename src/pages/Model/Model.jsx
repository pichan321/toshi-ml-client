import { useState } from "react"
import { get, post } from "../../utils/API";
import { Button, IconButton } from "rsuite";

export default function Model({model, closeModelPage}) {
    const [file, setFile] = useState(null)
    const [result, setResult] = useState("")
    const [value, setValue] = useState("")
    
    async function upload() {


    const formData = new FormData(); // Create a FormData object
    formData.append('file', file); // Append the file to the FormData object
    formData.append('model', model.id + ".csv"); 

    // Make a POST request to the server with the FormData object
   await fetch('http://localhost:8000/upload-file', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from server
        console.log(data);
    })
    .catch(error => {
        // Handle error
        console.error(error);
    });
    }

    async function train() {
       const response = await get('http://localhost:8000/train/' + model.id)
       console.log(response)
    }

    async function predict() {
        const response = await get('http://localhost:8000/predict/' + model.id + "/" + value)
        setResult(response.result)
    }

    return (
        <div>
       
            <IconButton onClick={() => closeModelPage()} icon={<img src="https://img.icons8.com/flat-round/256/circled-left-2.png" alt="" width={30} height={30}/>} style={{position: "absolute", top: "1em", right: "1em"}}/>
           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <h3>{console.log(model)}</h3>

            <br/>
            <Button onClick={() => upload()} active>Upload</Button>
            <Button onClick={() => train()} active>Train from scratch</Button>
            <Button active>Transfer Training</Button>

            <br/>
            <input onChange={(e) => setValue(e.target.value)}></input>
            <Button appearance="primary" color="green" onClick={predict}>Predict</Button>
            <h5>Result: {result}</h5>
            <br/>
            <h5>API URL: {`http://localhost:8000/api-prediction/${model.id}/value`}</h5>
        </div>
    )
}
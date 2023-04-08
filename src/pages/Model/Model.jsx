import { useState } from "react"
import { get, post } from "../../utils/API";
import { Button } from "rsuite";

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
            <button onClick={() => closeModelPage()}>Back</button>
           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <h3>{console.log(model)}</h3>
            <button onClick={() => upload()}>Upload</button>
            <button onClick={() => train()}>Train from scratch</button>
            <button>Transfer Training</button>

            <h6>Accuracy: </h6>
            <h6>Precision: </h6>
            <h6>Recall: </h6>
            <h6>F1 Score: </h6>

            <input onChange={(e) => setValue(e.target.value)}></input>
            <Button appearance="primary" color="green" onClick={predict}>Predict</Button>
            <h5>Result: {result}</h5>
        </div>
    )
}
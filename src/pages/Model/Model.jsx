import { useState } from "react"
import { get, post } from "../../utils/API";
import { Button, IconButton } from "rsuite";
import { Input, InputGroup, MaskedInput } from 'rsuite';
import { Select, TextInput } from "grommet";
import "./Model.css"
import { useEffect } from "react";

export default function Model({model, closeModelPage, learningAlgorithm}) {
    const [file, setFile] = useState(null)
    const [result, setResult] = useState("")
    const [value, setValue] = useState("")
    const [uploadColumns, setUploadColumns] = useState(null)
    const [columns, setColumns] = useState(null)
    const [columnValues, setColumnValues] = useState(null)
    const [trainingCol, setTrainingCol] = useState("")
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
        setUploadColumns(data.columns)
    })
    .catch(error => {
        // Handle error
        console.error(error);
    });
    }

    async function train() {
        if (trainingCol === "") {return}
       const response = await post('http://localhost:8000/train/' + model.id + "/" + trainingCol, learningAlgorithm)
       console.log("Trained")
       console.log(response)
       setColumns(response)
       setColumnValues(response.column_values)
    }

    async function predict() {
        const response = await post('http://localhost:8000/predict/' + model.id , {values: columnValues, encoded_columns: columns.encoded_columns})
        setResult(response.result)
    }

    function updateOneHotEncoding(category, column) {

        var tempColumnValues = columnValues
        columns.column_options[column].forEach(eachCategory => {
            if (eachCategory === category) {
                tempColumnValues[column + "_" + eachCategory] = [1]
            } else {
                tempColumnValues[column + "_" + eachCategory] = [0]
            }
        })
        setColumnValues(tempColumnValues)
    }

    const getModelDetails = async () => {
        var response = await get(`http://localhost:8000/model/details/${model.id}`)
        if (response.error) {return}
        setColumns(response)
        setColumnValues(response.column_values)
        console.log(response)
    }

    useEffect(()=> {
        console.log(columnValues)
    }, [columnValues])

    useEffect(( ) => {
        console.log(columns)
    })

    useEffect(() => {
        getModelDetails()
    }, [])

    return (
        <div>
       
            <IconButton onClick={() => closeModelPage()} icon={<img src="https://img.icons8.com/flat-round/256/circled-left-2.png" alt="" width={30} height={30}/>} style={{position: "absolute", top: "1em", right: "1em"}}/>
           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <h3>{console.log(model)}</h3>

            <br/>
            <div className="space-x-4">
                <Button onClick={() => upload()} active>Upload</Button>
                <Button onClick={() => train()} active>Train from scratch</Button>
                {/* <Button active>Transfer Training</Button> */}
            </div>
            
            <br/>
           
            <div className="flex justify-center items-center space-x-4">
            <h5>Target Column: </h5>
            {uploadColumns  &&  <Select
            options={uploadColumns}
            onChange={({ option }) => setTrainingCol(option)}
                />}

    
            </div>
            <h5>Trained Column: <strong>{columns && columns.target_column}</strong></h5>

            <br/>
            <div className="prediction">
                <div className="" style={{display: "block"}}>
 
            {columns &&
             
                columns?.column_headers.map(column => {
                    return (<div className="flex justify-center items-center space-x-4 m-4">
                        <p>{column}</p>
                        {columns.column_options[column]?.length !== 0 ?
                            <Select
      options={columns.column_options[column]}
      onChange={({ option }) => updateOneHotEncoding(option, column)}
    /> : <Input placeholder="type here" onChange={(e) => setColumnValues({...columnValues, [column] : [e]})}/>}
                       
                      
                            </div>
                        )
                })

            }
            </div>
        </div>

            <Button appearance="primary" color="green" onClick={() => predict()} className="m-5">Predict</Button>
            <div className="flex justify-center items-center">
                <h5 className="m-5">Result: {result}</h5>
            </div>
           
            <br/>
            <h5 className="">API URL: {`http://localhost:8000/api-prediction/${model.id}/value`}</h5>
        </div>
    )
}
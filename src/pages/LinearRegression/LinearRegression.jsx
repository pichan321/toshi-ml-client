import Card from "../../components/Card/Card"
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { Modal, Placeholder } from 'rsuite';
import { Add } from "grommet-icons"
import { useState } from "react";
import { Input } from 'rsuite';
import Model from "../Model/Model";
import { useCallback, useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx"
import { get } from "../../utils/API";

export default function LinearRegression() {
    const {REQUEST: fetcher} = useFetch()
    const [modelPage, setModelPage] = useState(false) 
    const [currentModel, setCurrentModel] = useState(null) 
    const [modal, setModal] = useState(false)
    const [models, setModels] = useState([])
    const [modelName, setModalName] = useState("")
    const [modelDescription, setModelDescription] = useState("")

    function createModel() {
        setModels([...models, {title: modelName, description: modelDescription}])
        setModal(false)
    }

    function handleClose() {
        setModal(false)
    }

    function openModelPage(model) {
        setCurrentModel(model)
        console.log(model)
        setModelPage(true)
    }

    const closeModelPage = useCallback(() => {
        setModelPage(false)
    }, [])

    async function getModels() {
        const response = await fetcher("GET", "/get-models")
        setModels(response.result)
    }
    
    async function createModel() {
        const response = await fetcher("POST", "/create-model", {name: modelName, description: modelDescription, model_type: "linear-regression"})
        closeModelPage()
        getModels()
        
    }


    useEffect(() => {
        getModels()
    }, [])

    // style={{display: "flex", justifyContent: "center", alignItems: "center"}}
    return (
        <div>
            {modelPage ? <Model model={currentModel} closeModelPage={() => closeModelPage()}/> :
            <div>
            <h1>Linear Regression</h1>
            <IconButton icon={<Add/>} onClick={() => setModal(true)}/>
            <div > 
                {models.map(model => {
                    return (
                        <div>
                            <Card title={model.name} description={model.description} id={model.id} open={() => openModelPage(model)} getModels={getModels}/>
                        </div>
                        )
                })}
            </div>

            <Modal size={"lg"} open={modal} onClose={handleClose}>
        <Modal.Header>
          <h3>Create New Model</h3>
        </Modal.Header>
        <Modal.Body>
                <h6>Model Name: </h6>
            <Input placeholder="Sales Linear Regression" onChange={(e) => setModalName(e)}/>
            <h6>Model Description: </h6>
            <Input as="textarea" rows={3} placeholder="To predict x, y, z" onChange={(e) => setModelDescription(e)}/>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={() => createModel()} appearance="primary">
                Create
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
     
        </Modal.Footer>
      </Modal>
            
      </div>
            
            }
       
           
        </div>)
}
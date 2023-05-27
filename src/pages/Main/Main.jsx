import "./Main.css"
import SideBar from "../../components/SideBar/SideBar"
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
import { Tabs, Tab, Box} from "grommet"

export default function Main() {
    const [current, setCurrent] = useState({
        name: "linear-regression",
        displayName: "Linear Regression",
        subtypes: [
            {name: "simple", displayName: "Simple"},
            {name: "polynomial", displayName: "Polynomial"},
        ]
        })
        const [currentLearningAlgorithm, setCurrentLearningAlgorithm] = useState({type: "linear-regression", subtype: "simple"})

        const {REQUEST: fetcher} = useFetch()
        const [modelPage, setModelPage] = useState(false) 
        const [currentModel, setCurrentModel] = useState(null) 
        const [modal, setModal] = useState(false)
        const [models, setModels] = useState(null)
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
            const response = await fetcher("GET", "/get-models/" + currentLearningAlgorithm.type + "/" + currentLearningAlgorithm.subtype)
            setModels(response.result)
        }
        
        async function createModel() {
            const response = await fetcher("POST", "/create-model", {name: modelName, description: modelDescription, model_type: currentLearningAlgorithm?.type, model_subtype: currentLearningAlgorithm?.subtype})
            setModal(false)
            getModels()
            
        }

        useEffect(() => {
            getModels()
        }, [currentLearningAlgorithm, current])
    
    
        useEffect(() => {
            getModels()
        }, [])

    return (
        <div>
            <SideBar setCurrent={setCurrent} setCurrentLearningAlgorithm={setCurrentLearningAlgorithm}/>
            <div>
            {modelPage ? <Model model={currentModel} closeModelPage={() => closeModelPage()} learningAlgorithm={currentLearningAlgorithm}/> :
            <div>
            <h1>{current?.displayName}</h1>
            <Tabs>
                {current?.subtypes?.map((subtype, index) => {
                    return (
                        <Tab title={subtype.displayName} onClick={() => setCurrentLearningAlgorithm({type: current?.name, subtype: subtype?.name})}>
                        </Tab>
                    )
                })}
            </Tabs>
     
            <IconButton icon={<Add/>} onClick={() => setModal(true)} style={{position: "absolute", top: "1em", right: "1em"}}/>
            <div > 
                {models && models.map(model => {
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
       
           
        </div>
        </div>
    )
}
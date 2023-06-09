import { del } from "../../utils/API"
import "./Card.css"

export default function Card({title, description, id, open, getModels}) {

    async function deleteModel() {
        const response = await del("http://localhost:8000/delete-model", {id: id})
        getModels()
        console.log("delete")
    }

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div className="card" style={{margin: "1em"}} onClick={() => open()}>
            <p>Model Name: {title && title}</p>
            <p>Model Description: {description && description}</p>
        </div>
        <div style={{position: "relative"}} onClick={() => deleteModel()} className="delete-button">
                <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="" width={30} height={30}/>
        </div>
        </div>
    )
}
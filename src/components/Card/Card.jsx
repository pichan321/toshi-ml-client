import { del } from "../../utils/API"
import "./Card.css"

export default function Card({title, description, id, open, getModels}) {

    async function deleteModel() {
        const response = await del("http://localhost:8000/delete-model", {id: id})
        getModels()
        console.log("delete")
    }

    return (
        <div className="flex justify-center items-center m-10">
            <div className="card flex justify-start items-center rounded h-14 bg-white" onClick={() => open()}>
                <div className="block w-full text-start ps-5">
                    <p className="">Name: <strong>{title && title}</strong></p>
                    <p>Description: {description ? description : "None"}</p>
                </div>
            </div>

            <div style={{position: "relative"}} onClick={() => deleteModel()} className="delete-button">
                    <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="" width={30} height={30}/>
            </div>
        </div>
    )
}
import Card from "../../components/Card/Card"

export default function LinearRegression() {
    const models = [{title: "Today"}, {title: "Tomorrow"}, {title: "Another Tomorrow"}]

    // style={{display: "flex", justifyContent: "center", alignItems: "center"}}
    return (
        <div>
            <h1>Linear Regression</h1>
            <div > 
                {models.map(model => {
                    return (<Card title={model.title}/>)
                })}
            </div>
            
        </div>)
}
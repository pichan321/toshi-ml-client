import { Sidebar, Nav, Button, Avatar} from "grommet"
import { Projects, Clock, Help } from "grommet-icons"
import "./SideBar.css"
import LinearRegression from "./linear-regression.png"

const SideBar = ({setCurrent}) => {
    const iconSize = 35

    const learning = [
      {
      name: "linear-regression",
      displayName: "Linear Regression",
      subtypes: [
        {name: "simple", displayName: "Simple"},
        {name: "multiple", displayName: "Multiple"},
        {name: "polynomial", displayName: "Polynomial"},
    ]
      }, 
      {
          name: "logistic-regression",
          displayName: "Logistic Regression",
          subtypes: [
            {name: "binary", displayName: "Binary"},
            {name: "multinomial", displayName: "Multinomial"},
        ]
      },
      {
          name: "decision-tree",
          displayName: "Decision Tree",
          subtypes: [
            {name: "standard", displayName: "Standard"},
            {name: "random-forest", displayName: "Random Forest"},
            {name: "xg-boost", displayName: "XG Boosted Tree"},
        ]
      }
  ]

    return (
    <Sidebar background="brand" round="small"
  header={
    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Avatar src="https://img.freepik.com/free-vector/cute-bad-cat-wearing-suit-sunglasses-with-baseball-bat-cartoon-icon-illustration-animal-fashion-icon-concept-isolated-flat-cartoon-style_138676-2170.jpg?w=2000" />
    </div>
  }
  footer={
    <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/2574/2574151.png" width={iconSize} height={iconSize}/>} hoverIndicator />
  }
  className="sidebar"
>
    <Nav gap="small">
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/3295/3295476.png" width={iconSize} height={iconSize}/>} hoverIndicator onClick={() => setCurrent(learning[0])}/>
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/3295/3295481.png" width={iconSize} height={iconSize}/>} hoverIndicator onClick={() => setCurrent(learning[1])}/>
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/1960/1960357.png" width={iconSize} height={iconSize}/>} hoverIndicator onClick={() => setCurrent(learning[2])}/>
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/9004/9004795.png" width={iconSize} height={iconSize}/>} hoverIndicator/>
    </Nav>
</Sidebar>

    )
}

export default SideBar
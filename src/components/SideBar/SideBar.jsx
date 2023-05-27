import { Sidebar, Nav, Button, Avatar} from "grommet"
import { Projects, Clock, Help } from "grommet-icons"
import "./SideBar.css"
import LinearRegression from "./linear-regression.png"

const SideBar = ({setCurrent, setCurrentLearningAlgorithm}) => {
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

  const updateLearningAlgorithm = (index) => {
    setCurrent(learning[index])
    setCurrentLearningAlgorithm({type: learning[index]?.name, subtype: learning[index]?.subtypes[0]?.name})
  } 

    return (
    <Sidebar background="brand" round="small"
  header={
    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Avatar src="https://img.wattpad.com/8102c626f71e00ae638389f58030c4a80cc7dc72/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f65696c74394f4f7a797a745647773d3d2d34382e313562356462393965616366663563663834303739303030333837382e6a7067" />
    </div>
  }
  footer={
    <Button icon={<div class="flex items-center justify-center"><img src="https://cdn-icons-png.flaticon.com/512/2574/2574151.png" width={iconSize} height={iconSize}/></div>} hoverIndicator />
  }
  className="sidebar"
>
    <Nav gap="small">
      <Button icon={<div class="flex items-center justify-center"><img src="https://cdn-icons-png.flaticon.com/512/3295/3295476.png" width={iconSize} height={iconSize}/></div>} hoverIndicator onClick={() => updateLearningAlgorithm(0)}/>
      <Button icon={<div class="flex items-center justify-center"><img src="https://cdn-icons-png.flaticon.com/512/3295/3295481.png" width={iconSize} height={iconSize}/></div>} hoverIndicator onClick={() => updateLearningAlgorithm(1)}/>
      <Button icon={<div class="flex items-center justify-center"><img src="https://cdn-icons-png.flaticon.com/512/1960/1960357.png" width={iconSize} height={iconSize}/></div>} hoverIndicator onClick={() => updateLearningAlgorithm(2)}/>
      <Button icon={<div class="flex items-center justify-center"><img src="https://cdn-icons-png.flaticon.com/512/9004/9004795.png" width={iconSize} height={iconSize}/></div>} hoverIndicator/>
    </Nav>
</Sidebar>

    )
}

export default SideBar
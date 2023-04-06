import { Sidebar, Nav, Button, Avatar} from "grommet"
import { Projects, Clock, Help } from "grommet-icons"
import "./SideBar.css"
import LinearRegression from "./linear-regression.png"

const SideBar = () => {
    const iconSize = 35

    return (
    <Sidebar background="brand" round="small"
  header={
    <Avatar src="https://img.freepik.com/free-vector/cute-bad-cat-wearing-suit-sunglasses-with-baseball-bat-cartoon-icon-illustration-animal-fashion-icon-concept-isolated-flat-cartoon-style_138676-2170.jpg?w=2000" />
  }
  footer={
    <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/2574/2574151.png" width={iconSize} height={iconSize}/>} hoverIndicator />
  }
  className="sidebar"
>
    <Nav gap="small">
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/3295/3295476.png" width={iconSize} height={iconSize}/>} hoverIndicator />
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/3295/3295481.png" width={iconSize} height={iconSize}/>} hoverIndicator />
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/1960/1960357.png" width={iconSize} height={iconSize}/>} hoverIndicator />
      <Button icon={<img src="https://cdn-icons-png.flaticon.com/512/9004/9004795.png" width={iconSize} height={iconSize}/>} hoverIndicator />
    </Nav>
</Sidebar>

    )
}

export default SideBar
import logo from './logo.svg';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import SideBar from './components/SideBar/SideBar.jsx';
import LinearRegression from './pages/LinearRegression/LinearRegression';
import Main from './pages/Main/Main.jsx';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Main/>
    </div>
  );
}

export default App;

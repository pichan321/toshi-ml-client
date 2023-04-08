import logo from './logo.svg';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import SideBar from './components/SideBar/SideBar.jsx';
import LinearRegression from './pages/LinearRegression/LinearRegression';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <LinearRegression/>
    </div>
  );
}

export default App;

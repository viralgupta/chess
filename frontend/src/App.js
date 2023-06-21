import Header from './components/header';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Play from './components/play';


function App() {
  return (
    <>
    <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>;
            <Route exact path="/play" element={<Play/>}></Route>;
            <Route exact path="/login" element={<Login/>}></Route>;
            <Route exact path="/signup" element={<Signup/>}></Route>;
          </Routes>
      </Router>
    </>
  );
}

export default App;

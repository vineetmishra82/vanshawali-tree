import './App.css';
import Home from './Home/Home';
import Start from './StartPage/Start';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
   <div>
    <Router>
    <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Start />} />
        </Routes>
        </Router> 
   </div>
  )
}


export default App;

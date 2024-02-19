
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/home/home';
import Signpage from './components/sign/sign';

function App() {


  return (
    
 

    <Router>
        <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/sign" element={<Signpage></Signpage>} />

        </Routes>
    
  
    </Router>


  )
}

export default App

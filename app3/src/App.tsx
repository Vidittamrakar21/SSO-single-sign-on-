
import './App.css'
import Check from './components/loader';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/home/home';

function App() {




  return (
    
    <Router>
    <Routes>
  <Route path="/" element={<Home></Home>} />
  <Route path="/check" element={<Check></Check>} />
 

    </Routes>


</Router>

  )
}

export default App

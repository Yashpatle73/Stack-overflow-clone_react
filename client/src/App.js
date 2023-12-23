import {BrowserRouter as Router} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchAllQuestions } from "./actions/question"
import './App.css';
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions())
    
  },[dispatch])
  

  return (
    <div className="App">
     <Router>
      <Navbar/>
      <AllRoutes/>

     </Router>
    </div>
  );
}

export default App;

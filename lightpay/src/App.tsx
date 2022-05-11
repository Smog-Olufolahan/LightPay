import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/signin';
import "./components/css/main.css"
function App() {
  return (
    <div>
      <Signin/>
      {/* <Router>
      <Routes>
      <Route path="/" element={ <Signin/> } />
      </Routes>
      </Router> */}
          </div>
  
  );
}

export default App;

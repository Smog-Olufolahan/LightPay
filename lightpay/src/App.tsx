import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Signup from './pages/Signup/Signup';
import Signin from './components/signin';
import "./components/css/main.css"


function App() {
  return (
    <Routes>
      <Route path="/signin" element={ <Signin/> } />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

import {Routes, Route} from 'react-router-dom'
import ResetPassword from '../src/pages/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;

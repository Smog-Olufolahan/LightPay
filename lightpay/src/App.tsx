import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Signup from './pages/Signup/Signup';
import Signin from './components/signin';
import AccountsDashboard from './pages/AccountsDashboard/AccountsDashboard';
import "./components/css/main.css";
import Transaction from './pages/Transactions/Transaction';
import { Modal } from './pages/Transactions/TransactionDetails';
import Walletscreen from './components/walletscreen';

import GenerateQr from "./pages/generateAddress/qrAddress";

function App() {
  // const [showModal, setShowModal] = useState(false);

// const openModal = () => {
//   setShowModal(prev => !prev);
// };
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />
      <Route path="/dashboard" element={<AccountsDashboard />} />
      <Route path="/auth/transaction" element={<Transaction />} />
      <Route path="/walletscreen" element={<Walletscreen/>} />
      <Route path="/generateqr" element={<GenerateQr />} />
      <Route path="/trans-deets" element={<Modal />} />
    </Routes>
  );
}

export default App;

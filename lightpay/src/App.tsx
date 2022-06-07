import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Signup from './pages/Signup/Signup';
import Signin from './components/signin';
import AccountsDashboard from './pages/AccountsDashboard/AccountsDashboard';
import "./components/css/main.css";
import ReceiveSend from './pages/Transactions/ReceiveSend';
import { TransactionDetails } from './pages/Transactions/TransactionDetails';
import Wallets from './components/walletscreen';
import GenerateQr from "./pages/generateAddress/qrAddress";
import WalletDetails from './pages/walletDetails/WalletDetails';
import Transaction from './pages/Transactions/Transactions';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/dashboard" element={<AccountsDashboard />} />
      <Route path="/wallet-qr" element={<GenerateQr />} />
      <Route path="/auth/wallet-deets" element={<ReceiveSend />} />
      <Route path="/auth/transactions" element={<Transaction />} />
      <Route path="/wallets" element={<Wallets/>} />
      <Route path="/auth/transaction-deets" element={<TransactionDetails />} />
      <Route path="/auth/send" element={<WalletDetails />} />
    </Routes>
  );
}

export default App;

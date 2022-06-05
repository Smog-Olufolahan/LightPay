import { MdArrowBack } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Transaction.css";

interface LocationState {
  coinName: string;
  coinSymbol: string;
  coinBalance: string;
  coinBalanceUSD: string;
};

const Transaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { coinName, coinSymbol, coinBalance, coinBalanceUSD } = state;

  return (
    <section className="contain">
      <div className="container2">
        <div className="nav-icon-container">
          <div>
            <MdArrowBack
              fontSize="2em"
              onClick={() => navigate("/walletscreen/")}
            ></MdArrowBack>
          </div>
          <div className="nav">
            <div id="nav-icon">
              <FaHandHoldingUsd fontSize="1.5em"></FaHandHoldingUsd>
            </div>
            <div id="nav-link">
              <a href="#">Make Request</a>
            </div>
          </div>
        </div>
        <section className="main">
          <p>{coinName}</p>
          <div id="eth">
            <h2>{coinBalance}</h2>
            <p>{coinSymbol}</p>
          </div>
          <h5>{coinBalanceUSD} USD</h5>
        </section>
        <section className="send-receive-icon">
          <div className="receive-icon-and-title">
            <Link to="/generateqr">
              <div className="receive">
                <MdArrowCircleDown fontSize="2.5rem"></MdArrowCircleDown>
              </div>
            </Link>
            <div className=" receive-title">
              <p>Receive</p>
            </div>
          </div>
          <div className="send-icon-and-title">
            <Link to="#">
              <div className="send">
                <MdArrowCircleUp fontSize="2.5rem"></MdArrowCircleUp>
              </div>
            </Link>
            <div className="send-title">
              <p>Send</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
export default Transaction;

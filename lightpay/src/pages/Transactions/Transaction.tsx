import { MdArrowBack } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Transaction.css";

const Transaction = () => {

  const navigate = useNavigate();

  return (
    <section className="contain">
      <div className="nav-icon-container">
        <div>
          <MdArrowBack fontSize="2em" onClick={() => navigate("/walletscreen/")}></MdArrowBack>
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
        <p>Bitcoin</p>
        <div id="btc">
          <h2>00.00</h2>
          <p>BTC</p>
        </div>
        <h5>00.00 USD</h5>
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
    </section>
  );
};
export default Transaction;

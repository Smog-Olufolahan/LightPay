import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/css/funds.css";
import successGif from "../components/images/successAnim.gif";

const SuccessTransfer = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDone = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/auth/dashboard");
  };

  return (
    <>
      <div className="funds-screen-container">
        <div className="container-fundscreen">
          <div className="wrap-fundscreen">
            <div>
              <div className="fund-img-container">
                <br></br>
                <img src={successGif} alt="Account verified icon" />
              </div>
              <div className="verify-message">
                <p>Transaction Successful.</p>
                <button
                  className="xf-continue-btn"
                  type="submit"
                  onClick={handleDone}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessTransfer;

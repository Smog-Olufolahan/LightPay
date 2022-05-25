import "./qrAddress.css";
import React, { useState } from "react"
import QRcode from "qrcode.react";
import { IoCopyOutline } from "react-icons/io5";
import { IoRefresh } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";


function GenerateQr() {
  const [qrValue, setQrValue] = useState([] as any);
  const handleOnChange = (event: any) => {
    const { value } = event.target;
    setQrValue(value);
  };
  return (
    <div className="container">
      <div className="App">
        <div className="topIcons">
          <IoCloseOutline />
          <div className="refreshIcon">
            <IoRefresh />
            <p>Refresh</p>
          </div>
        </div>
        <h3 className="text">Wallet Address</h3>
        <div className="inputContainer">
          <IoCopyOutline className="icon" />
          <input
            onChange={handleOnChange} className="icon" />
        </div>
        <div className="grs" >
          <QRcode
            id="qr-gen"
            value={qrValue}
            level={"H"}
            includeMargin={false}
            size={90}
            className="qrContainer"
          />
        </div>
      </div>
    </div >
  );
}

export default GenerateQr;


import "./qrAddress.module.css";
import styles from "./qrAddress.module.css"

import React, { useEffect, useState } from "react";
import QRcode from "qrcode.react";
import axios, { AxiosRequestConfig } from "axios";
import { IoCopyOutline } from "react-icons/io5";
import { IoRefresh } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

function GenerateQr() {
  const [qrValue, setQrValue] = useState([] as any);

  const handleOnChange = (event: any) => {
    const { value } = event.target;
    setQrValue(value);
  };

  const handleQrDisplay = () => {
    // Add a request interceptor
    let token = (localStorage.getItem('userToken')) as string;
    token = JSON.parse(token)
    axios.interceptors.request.use(function (config: AxiosRequestConfig) {

      if (config.headers === undefined) {
        config.headers = {};
      }

      config.headers.Authorization = token ? `Bearer ${token}` : '';
      // config.headers.Authorization = `Bearer ${token}`;

      return config;
    });

    console.log(token);

    axios.get(`http://localhost:3001/userwallet`)
      .then((response) => {
        console.log(response.data);
        setQrValue(response.data[0].address);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          // setMessage(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          // setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          // setMessage("Error" + error.message);
        }
      });
  };

  useEffect(() => {
    handleQrDisplay();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.App}>
          <div className={styles.topIcons}>
            <IoCloseOutline />
            <div className={styles.refreshIcon}>
              <IoRefresh />
              <p className={styles.para}>Refresh</p>
            </div>
          </div>
          <h3 className={styles.text}><strong>Wallet Address</strong></h3>
          <div className={styles.inputContainer}>
            <IoCopyOutline className={styles.icon} />
            <div className={styles.input}> <input onChange={handleOnChange} disabled={true} value={qrValue} className={styles.icon} /></div>
          </div>
          <div className={styles.qrContains}>
            <QRcode
              id="qrgen"
              value={qrValue}
              level={"H"}
              includeMargin={false}
              size={200}
              className={styles.qrContainer} />
          </div>
        </div>
    </div>
    </div>
  );
}

export default GenerateQr;
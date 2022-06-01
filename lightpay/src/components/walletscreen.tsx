import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "../components/css/wallet.css";

const add = <FontAwesomeIcon icon={faCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const home = <FontAwesomeIcon icon={faHome} />;
const transaction = <FontAwesomeIcon icon={faArrowRightArrowLeft} />;
const gift = <FontAwesomeIcon icon={faGift} />;
const wallet = <FontAwesomeIcon icon={faWallet} />;

const Walletscreen = () => {
  const [userWallet, setUserWallet] = useState("");
  const [coinList, setCoinList] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {

    // Add a request interceptor
  let token = (localStorage.getItem('userToken')) as string;
  token = JSON.parse(token)
  axios.interceptors.request.use(function (config: AxiosRequestConfig) {

    if (config.headers === undefined) {
      config.headers = {};
    }

    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  });

  console.log(token);

    const url = "http://localhost:3001/userwallet";
    const getWalletCurrencyWithAxios = async () => {
      try {
        const response = await axios.get(url);
        const json = await response.data[0].address;
        console.log(response.data);
        setUserWallet(json);
      } catch (error) {
        console.log(error);
      }
    };

    axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=23").then(
      (response) => {
        // console.log(response.data.coins);
        setCoinList(response.data.coins);
      }
    );


    getWalletCurrencyWithAxios();
  }, []);


  const filteredCoin: any[] = [];
  for (let coin of coinList) {
    if (coin.id === "ethereum" || coin.id === "bitcoin") {
      filteredCoin.push(coin);
    }
  }
  console.log(filteredCoin);
  
  return (
    <div className="wallet-screen-container">
      <div className="container-wallet">
        <div className="wrap-wallet-screen">
          <div className="add">
            <i> {add} </i>
            <span className="add-wallet">Add Wallet</span>
          </div>

          <span className="wallet-title">Wallets</span>

          <div
            className="wrap-input-wallet" data-validate="enter wallet address">
            <i className="search"> {search} </i>
            <input
              className="input-wallet"
              type="text"
              name="search-wallet"
              value=""
              placeholder="Search wallet"
              id="wallet"
            />
          </div>

          <div className="wrap-wallet-currency" onClick={() => navigate("/auth/transaction/")}>
            {/* <p className="wallet-currency">{userWallet}</p> */}

            {filteredCoin.map((coin) => {
          return (
            <>
              <div className="coins">
                <img src={coin.icon} alt="crypto coins" />
                <div className="eth">
                  <h6>{coin.name}</h6>
                </div>
                <div className="symbol">
                  <h6>{coin.symbol}</h6>
                </div>
                <div className="price">
                  {/* <h6>${coin.price.toFixed(2)}</h6> */}
                  <h6>0</h6>
                  <h6>0 USD</h6>
                </div>
              </div>
            </>
          );
        })}

          </div>

          <div className="wrap-footer" onClick={() => navigate("/dashboard/")}>
            <div className="icon-container">
              <i className="home-icon"> {home} </i>
              <span className="wallet-home">Home</span>
            </div>

            <div className="icon-container">
              <i className="transaction-icon"> {transaction} </i>
              <span className="wallet-transaction">Transactions</span>
            </div>

            <div className="icon-container">
              <i className="gift-icon"> {gift} </i>
              <span className="wallet-gift">Gift Cards</span>
            </div>

            <div className="icon-container" style={{ color: "#01051A" }}>
              <i className="wallet-icon"> {wallet} </i>
              <span className="wallet-home">Wallets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walletscreen;

import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BottomNavBar } from "./bottomNavBar";
import { coins } from "./coinList";
import "../components/css/wallet.css";

const add = <FontAwesomeIcon icon={faCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const Walletscreen = () => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedWallets = userWallet.filter((wallet) => {
    const coinName = coins.filter((coin) => coin.symbol === wallet.coin)[0].name;
    return wallet.coin.toLowerCase().includes(searchTerm.toLowerCase()) || coinName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    // Add a request interceptor
    let token = localStorage.getItem("userToken") as string;
    token = JSON.parse(token);
    axios.interceptors.request.use(function (config: AxiosRequestConfig) {
      if (config.headers === undefined) {
        config.headers = {};
      }

      config.headers.Authorization = token ? `Bearer ${token}` : "";

      return config;
    });

    // console.log(token);

    const getWalletCurrencyWithAxios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/wallets/userwallet"
        );
        setUserWallet(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // axios
    //   .get("https://api.coinstats.app/public/v1/coins")
    //   .then((response) => {
    //     // console.log(response.data.coins);
    //     setCoinList(response.data.coins);
    //   }).catch((err) => {
    //     console.log(err);
    //   })

    getWalletCurrencyWithAxios();
  }, []);

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
            className="wrap-input-wallet"
            data-validate="enter wallet address"
          >
            <i className="search"> {search} </i>
            <input
              className="input-wallet"
              type="text"
              name="search-wallet"
              placeholder="Search wallet"
              id="wallet"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          <div className="wrap-wallet-currency">
            {searchedWallets.map((wallet, index) => {
              const coinIcon = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].icon;
              const coinName = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].name;
              const coinSymbol = wallet.coin;
              const coinBalance = 0.01; // replace with actual balance
              const coinBalanceUSD = 0.02; // replace with actual balance

              return (
                <div key={index}>
                  <div
                    className="coins"
                    onClick={() =>
                      navigate("/auth/transaction/", {
                        state: {
                          coinName,
                          coinSymbol,
                          coinBalance,
                          coinBalanceUSD,
                        },
                      })
                    }
                  >
                    <img src={coinIcon} alt="crypto coins" />
                    <div className="eth">
                      <h6>{coinName}</h6>
                    </div>
                    <div className="symbol">
                      <h6>
                        {wallet.coin +
                          ": " +
                          wallet.address.slice(0, 7) +
                          "..." +
                          wallet.address.slice(-4)}
                      </h6>
                    </div>

                    <div>
                      <div className="bal">
                        <h5>0</h5>
                      </div>
                      <div className="bal-usd">
                        <h5>0 USD</h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <BottomNavBar />
        </div>
      </div>
    </div>
  );
};

export default Walletscreen;

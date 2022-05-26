import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { IconContext } from "react-icons";
import { FaGift } from "react-icons/fa";
import { RiHome7Fill, RiWallet3Fill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import './AccountsDashboard.css';

const AccountsDashboard = () => {
  const [coinList, setCoinList] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {

    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=0").then(
      (response) => {
        // console.log(response.data.coins);
        setCoinList(response.data.coins);
      }
    );
  }, []);

  const filteredCoin: any[] = [];
  for (let coin of coinList) {
    if (coin.id === "bitcoin") {
      filteredCoin.push(coin);
    }
    if (coin.id === "ethereum") {
      filteredCoin.push(coin);
    }
    if (coin.id === "binance-coin") {
      filteredCoin.push(coin);
    }
    if (coin.id === "bitcoin-cash") {
      filteredCoin.push(coin);
    }
  }
  // console.log(filteredCoin);

  return (
    <div className="acc-container">
      <div className="collective">
        <img src="/images/user-icon.webp" alt="" />

        <div className="show-balance">
          <p className="total">Total Balance</p>
          <div className="connect-account">
            <img src="/images/blue-shield.jpeg" alt="" />
            <div className="trust">
              <p className="first">Connect your Trust Account</p>
              <p className="second">
                Connect your Trust Account to easily <br /> deposit and withdraw
                funds.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="exchange-rates">
        <h4>Exchange Rates</h4>
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
                  <h6>${coin.price.toFixed(2)}</h6>
                </div>
              </div>
            </>
          );
        })}
        <footer className="dash-footer">
          <div className="home">
            <IconContext.Provider value={{ className: "home1" }}>
              <RiHome7Fill />
            </IconContext.Provider>
            <p>Home</p>
          </div>
          <div className="transaction">
            <IconContext.Provider value={{ className: "transaction1" }}>
              <GrTransaction />
            </IconContext.Provider>
            <p>Transactions</p>
          </div>
          <div className="gift">
            <IconContext.Provider value={{ className: "gift1" }}>
              <FaGift />
            </IconContext.Provider>
            <p>Gift Cards</p>
          </div>
          <div className="wallet" onClick={() => navigate("/walletscreen/")}>
            <IconContext.Provider value={{ className: "wallet1" }}>
              <RiWallet3Fill />
            </IconContext.Provider>
            <p>Wallets</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AccountsDashboard;

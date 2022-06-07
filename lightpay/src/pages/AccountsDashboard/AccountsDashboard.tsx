import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BottomNavBar } from "../../components/bottomNavBar";
import { coins } from "../../components/coinList";
import "./AccountsDashboard.css";

interface LocationState {
  username: string;
}

const AccountsDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // const location = useLocation();
  // const state = location.state as LocationState;
  // const { username } = state;

  // const [coinList, setCoinList] = useState<any[]>([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") as string);

    axios
      .get("http://localhost:3001/auth/username", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setUsername(response.data.username);
      }).catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log("Session expired, Login!");
          navigate("/signin/");
        }
      });
      
    //   axios.get("https://api.coinstats.app/public/v1/coins").then((response) => {
    //     // console.log(response.data.coins);
    //     setCoinList(response.data.coins);
    //   });
  }, []);

  return (
    <section className="container1">
      <div className="acc-container">
        <div className="collective">
          <img src="/images/user-icon.webp" alt="" />
          <div className="user">
            <p>{"Hello, " + username.slice(0, username.indexOf(" "))}</p>
          </div>

          <div className="show-balance">
            <p className="total">Total Balance</p>
            <p className="balance">$0.00</p>
            <div className="connect-account">
              <img src="/images/blue-shield.jpeg" alt="" />
              <div className="trust">
                <p className="first">Connect your Trust Account</p>
                <p className="second">
                  Connect your Trust Account to easily deposit <br />
                  and withdraw funds.
                </p>
              </div>
            </div>
          </div>

          <div className="exchange">
            <h4>Exchange Rates</h4>
            <div className="exchange-rates">
              {coins.map((coin, index) => {
                return (
                  <div className="exchange-rate-list" key={index}>
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNavBar />
      </div>
    </section>
  );
};

export default AccountsDashboard;

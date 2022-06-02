import  { useEffect, useState } from "react";
import axios from "axios";
import { SiEthereum } from "react-icons/si";
import "./WalletDetails.css";
const style = { color: "#ffa500", fontSize: "2em" };
//get url
const url = "http://localhost:3001/userwallet";

const WalletDetails = () => {
  const [userWallet, setUserWallet] = useState([]);
  const [coinName, setCoinName] = useState("");

  //disable the button

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") as string);
    const url = "http://localhost:3001/userwallet";

    const getUserWallet = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.data[0].address;
        console.log(response.data);
        setUserWallet(response.data);
        setCoinName(response.data[0].coin);
      } catch (error) {
        console.log(error);
      }
    };
    getUserWallet();
  }, []);

  return (
    <section className="wallet-screen-container">
      <div className="container">
        <div className="wrap-wallet">
          <form action="#" className="wallet-form validate-form">
            <span className="wallet-title">Send</span>

            <div className="from">
              <label>From</label>

              <div className="from_container">
                <SiEthereum style={style}></SiEthereum>
                <p>{coinName}</p>
                <select className="select">
                  {userWallet.map((wallet: any, i) => {
                    return (
                      <option key={i}>
                        {" "}
                        {wallet.address}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <label className="to" htmlFor="password">
              To
            </label>
            <input
              className="input"
              name="password"
              placeholder="Recipient Address"
            />
            <button className="continue-btn" type="submit" disabled={true}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WalletDetails;

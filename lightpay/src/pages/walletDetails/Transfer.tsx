import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { SpinnerCircular } from "spinners-react";
// import { SiEthereum } from "react-icons/si";
import { coins } from "../../components/coinList";
import axios from "axios";
import "./WalletDetails.css";

const Transfer = () => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  // const [coinName, setCoinName] = useState("BNB");
  const [transferDisabled, setTransferDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [formData, setFormData] = useState({
    fromAddress: "",
    toAddress: "",
    amount: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") as string);
    if (!token) {
      navigate("/signin");
    }
    // const wallets = JSON.parse(
    //   localStorage.getItem("walletsWithBal") as string
    // );
    // if (wallets) {
    //   setUserWallet(wallets);
    //   setFormData({ ...formData, fromAddress: wallets[0].address });
    // }

    const getUserWallet = async () => {
      try {
        const response = await axios.get("http://localhost:3001/wallets/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const json = await response.data[0].address;
        // console.log(response.data);
        setUserWallet(response.data);
        setFormData({ ...formData, fromAddress: response.data[0].address });
        // setCoinName(response.data[1].coin);
      } catch (error) {
        console.log(error);
      }
    };
    getUserWallet();
  }, []);

  // const coinIcon = coins.filter((coin: any) => coin.symbol === coinName)[0].icon;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //setSubmitted(true);
    setTransferDisabled(true);
    setIsSpinning(true);
    console.log(formData);

    const token = JSON.parse(localStorage.getItem("userToken") as string);
    if (!token) {
      navigate("/signin");
    }

    axios
      .post("http://localhost:3001/auth/transfer", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data);

        response.data.message.includes("was successful")
          ? navigate("/auth/transfer-success/")
          : console.log("Transfer failed.");
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setMessage("Error" + error.message);
        }
      });
  };

  return (
    <section className="sr-screen-container">
      <div className="container">
        <div className="wrap-wallet">
          <div>
            <MdArrowBack
              fontSize="2em"
              cursor="pointer"
              onClick={() => navigate(-1)}
            ></MdArrowBack>
          </div>

          <form
            action="#"
            className="wallet-form validate-form"
            onSubmit={handleSubmit}
          >
            <span className="wallet-title">Send</span>

            <div className="from">
              <label>From</label>

              <div className="from_container">
                {/* if eth/btc is selected, SiEthereum/SiBitcoin */}
                {/* <img src={coinIcon} alt="crypto coins" /> */}
                {/* <SiEthereum style={style}></SiEthereum> */}
                {/* <p>{coinName}</p> */}
                <select
                  className="select"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fromAddress: e.target.value.split(" ")[1],
                    })
                  }
                >
                  {userWallet.map((wallet: any, index) => {
                    return (
                      <option key={index}>
                        {wallet.coin + ": " + wallet.address}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <label className="to" htmlFor="recipient">
              To
            </label>
            <input
              className="input"
              name="recipient"
              placeholder="Recipient Address"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, toAddress: e.target.value })
              }
            />
            <label className="to" htmlFor="amount">
              Amount
            </label>
            <input
              className="input"
              name="amount"
              placeholder="Amount"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            <button
              className="xxf-continue-btn"
              type="submit"
              disabled={transferDisabled}
            >
              Transfer
            </button>

            {isSpinning ? (
              <div>
              <div className="xf-overlay"></div>
                <div className="xf-spinner">
                  <SpinnerCircular
                    // className="xf-spinner"
                    enabled={isSpinning}
                    size={50}
                    thickness={100}
                    speed={100}
                    color="#36ad47"
                    secondaryColor="#E4E4E6"
                  />

                  <p>
                    <br></br>Processing transfer...
                  </p>
                </div>
              </div>
            ) : null}

          </form>
        </div>
      </div>
    </section>
  );
};

export default Transfer;

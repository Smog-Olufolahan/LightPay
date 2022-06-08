import { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";
import { BottomNavBar } from "../../components/bottomNavBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { TransactionDetails } from "./TransactionDetails";

const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const creditIcon =
  "https://res.cloudinary.com/brosj/image/upload/v1654508201/down-arrow_gdtxz9.png";
const debitIcon =
  "https://res.cloudinary.com/brosj/image/upload/v1654508201/up-arrow_k3ay8i.png";

const Transactions = () => {
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => {
  //   setShowModal((prev) => !prev);
  // };

  const navigate = useNavigate();
  const [userTransactions, setUserTransactions] = useState([]);
  const [userWallet, setUserWallet] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedTransactions = userTransactions.filter((transaction: any) => {
    const date: String = new Date(transaction.createdAt).toString();
    return (
      transaction.amount.toString().includes(searchTerm.toLowerCase()) ||
      date.includes(searchTerm.toLowerCase()) ||
      transaction.Status.includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const wallets = JSON.parse(localStorage.getItem("walletsWithBal") as string);
    const token = JSON.parse(localStorage.getItem("userToken") as string);

    const getWallets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/wallets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserWallet(response.data);
        // console.log(response.data);
      } catch (error: any) {
        console.log(error);
        // if (error.response.status === 400) {
        //   console.log("Session expired, Login!");
        //   navigate("/signin/");
        // }
      }
    };

    if (wallets) {
      setUserWallet(wallets);
    } else getWallets();
    
    const getTransactions = async () => {
      const url = "http://localhost:3001/transactions";
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data);
        setUserTransactions(response.data);
      } catch (error: any) {
        console.log(error);
        // if (error.response.status === 400) {
        //   console.log("Session expired, Login!");
        //   navigate("/signin/");
        // }
      }
    };

    getTransactions();
  }, []);

  return (
    <section className="trans-screen-container">
      <div className="trans-container">
        <div className="wrap-trans">
          <span className="trans-title">Transactions</span>

          <div
            className="wrap-input-trans"
            data-validate="enter wallet address"
          >
            <i className="search-trans"> {searchIcon} </i>
            <input
              className="input-trans"
              type="text"
              name="search-transactions"
              placeholder="Search transactions"
              id="wallet"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          <div className="transactions">
            {/* <h4>All Transactions</h4> */}
            <div className="trans-list">
              {searchedTransactions.map((transaction: any, index) => {
                const { amount, To, From, Meta, Status } = transaction;
                const { transactionId, nonce, gasLimit, gasPrice } =
                  JSON.parse(Meta);
                const transDate = new Date(transaction.createdAt).toString();

                return (
                  <div className="exchange-rate-list" key={index}>
                    <div
                      className="trans-coins"
                      // onClick={openModal}
                      onClick={() =>
                        navigate("/auth/transaction-deets/", {
                          state: {
                            amount,
                            To,
                            From,
                            Status,
                            transactionId,
                            nonce,
                            gasLimit,
                            gasPrice,
                          },
                        })
                      }
                    >
                      {userWallet.find((val) => val.address === transaction.From) ? (
                        <img src={debitIcon} alt="Debit" />
                      ) : (
                        <img src={creditIcon} alt="Credit" />
                      )}
                      <div className="trans-eth">
                        <h6>
                          {transaction.From.slice(0, 3)}...
                          {transaction.From.slice(-5)} →{" "}
                          {transaction.To.slice(0, 3)}...
                          {transaction.To.slice(-5)}
                        </h6>
                      </div>
                      <div className="trans-symbol">
                        <h6>{transDate.slice(0, 24)}</h6>
                      </div>
                      <div className="trans-price">
                        <h6>${transaction.amount.toFixed(2)}</h6>
                      </div>
                    </div>
                    {/* <hr></hr> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNavBar />
      </div>

      {/* {showModal ? <TransactionDetails></TransactionDetails> : null} */}
    </section>
  );
};

export default Transactions;

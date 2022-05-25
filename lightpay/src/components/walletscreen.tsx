import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import '../components/css/wallet.css';
import axios from 'axios';

const add = <FontAwesomeIcon icon={faCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const home = <FontAwesomeIcon icon={faHome} />;
const transaction = <FontAwesomeIcon icon={faArrowRightArrowLeft}/>;
const gift = <FontAwesomeIcon icon={faGift} />;
const wallet = <FontAwesomeIcon icon= {faWallet} />;

const Walletscreen = () => {
const [userWallet, setUserWallet] = useState('');


 useEffect(() => {
const url = "http://localhost:3001/userwallet"
     const getWalletCurrencyWithAxios = async() => {
         try {
            const response = await axios.get(url);
            const json = await response.data[0].address
            console.log(response.data)
            setUserWallet(json);
         } catch (error) {
            console.log(error) 
         }
     }
     getWalletCurrencyWithAxios()
 }, [])
    
    return (
        <div className="wallet-screen-container">
            <div className="container">
                <div className="wrap-wallet-screen">
                    <div className="add">
                    <i> {add} </i>
                    <span className="add-wallet">Add Wallet</span>
                    </div>

                   <span className="wallet-title">Walllets</span>

                    <div className="wrap-input" data-validate="enter wallet address">
                        <i className="search"> {search} </i>
                        <input className="input" type="text" name="search-wallet" value="" placeholder="Search wallet" id="wallet"/>
                    </div>
        
                    <div className= "wrap-wallet-currency">
                         <p className= "wallet-currency">{userWallet}</p> 
                    </div>

                    <div className="wrap-footer">
                        <div className='icon-container'>
                        <i className="home-icon"> {home} </i>
                        <span className="wallet-home">Home</span>
                        </div>

                        <div className='icon-container'>
                        <i className="transaction-icon"> {transaction} </i>
                        <span className="wallet-transaction">Transactions</span>
                        </div>

                        <div className='icon-container'>
                        <i className="gift-icon"> {gift} </i>
                        <span className="wallet-gift">Gift Cards</span>
                        </div>

                        <div className='icon-container' style={{color: "#01051A"}}>
                        <i className="wallet-icon" > {wallet} </i>
                        <span className="wallet-home">Wallets</span>
                        </div>
                     </div>
                </div>     
            </div>
        </div>
    );
};

export default Walletscreen;

// Status: confirmed / pending / failed / cancelled

import React, { useState, FC } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";


export const Modal = () => {
  const [showModal, setShowModal] = useState(true);
  
  // const openModal = () => {
  //   setShowModal(prev => !prev);
  // };
  const from = '0x78cducfdbuvyfbvfuvee78';
  const to = '0x221ducfdbuvyfbvfuvE8Fb';

  return (
    <>
      {showModal ? (
        <Background>
          <ModalWrapper>
            {/* showModal={showModal}> */}
            <ModalContent>
              <h1>Receive</h1>
              <h3>Status: Confirmed</h3>
              <p><strong>From:&nbsp;</strong>{from.slice(0,5) + '...' + from.slice(-4)}</p>
              <p><strong>To:&nbsp;</strong>{to.slice(0,5) + '...' + to.slice(-4)}</p>
              <p><strong>Transaction ID:&nbsp;</strong>(Click to copy)</p>
              <hr></hr>
              <h3>Transaction</h3>
              <p>Nonce:<span>366015</span></p>
              <p>Amount:<span><strong>1 ETH</strong></span></p>
              <p>Gas Limit (Units):<span>400000</span></p>
              <p>Gas Price:<span>50</span></p>
              <p><strong>Total:</strong><span><strong>1.02 ETH</strong></span></p>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev: any) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};


const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 330px;
  height: 450px;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  font-family: 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  line-height: 1.0;
  color: #141414;

  h1 {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    padding: 8px 0;
  }

  p {
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex
  }

  span {
    flex: 1;
    text-align: right;
    white-space: nowrap;
  }

  hr {
    width: 290px;
  }

  button {
    background: #141414;
    color: #fff;
    border: none;
    padding: 10px 24px;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

interface Props {
  showModal: boolean;
  setShowModal: any;
}
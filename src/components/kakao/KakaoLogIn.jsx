import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import OAuth from "./Oauth";
import { useSelector } from "react-redux";
import loginIcon from '../../assets/img/login.svg'

const KakaoLogin = () => {
  const [signupModalOn, setSignupModalOn] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin)

  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };

  return (
    <StContentbox>
      {isLogin ? (
        <div></div>
      ) : (
        <div onClick={handleModal}>
          <StLoginIcon loginIcon={loginIcon}/>
          <StLoginTxt>로그인</StLoginTxt>
        </div>
      )}

      <ModalPortal>
        {signupModalOn && (
          <Modal onClose={handleModal}>
            <OAuth />
          </Modal>
        )}
      </ModalPortal>
    </StContentbox>
  );
};

export default KakaoLogin;

const StContentbox = styled.div`
  display: flex;
  width: 63px;
  button {
    padding: 10px;
    border-radius: 8px;
    color: var(--gray-2);
    background-color: var(--black);
    border: 1px solid var(--gray-2);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: var(--maincolor-1);
      color: var(--white);
      border-color: var(--maincolor-1);
    }
  }
`;

const StLoginIcon = styled.div`
    width: 20px;
    height: 16px;
    align-items: center;
    background: ${props => `url(${props.loginIcon})`} no-repeat;
    cursor: pointer;
`
const StLoginTxt = styled.span`
    cursor: pointer;
`
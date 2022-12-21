import styled from 'styled-components';
import LogoImg from '../imges/logo.png';
import { FiLogOut } from 'react-icons/fi';
import { BsFillSunFill } from 'react-icons/bs';
import { BsFillMoonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contextApi/user';
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  width: 100%;
  background-color: #212756;
  padding: 2px;
`;

const Logo = styled.img`
  padding-top: 4px;
  margin-left: 30px;
  height: 50px;
  width: 110px;
  ${mobile({ height: "40px", width: "90px", marginRight: "10px" })}
`;
const Title = styled.h1`
    margin: 0 auto;
    color: #e3e3e3;
    font-size: 27px;
    ${mobile({ fontSize: "14px" })}
`;
const LogOut = styled.div`
  margin-right: 25px;
  font-size: 20px;
   color: white;
   display: flex;
   cursor: pointer;
   &:hover{
    color: #35a4f4;
   }
`;
const Mode = styled.div`
  margin-right: 30px;
  font-size: 20px;
  color: white;
  display: flex;
  cursor: pointer;
  &:hover{
    color: #35a4f4;
   }
   ${mobile({ marginRight: "10px", marginLeft: '20px' })}
`;
const UserName = styled.div`
  margin-right: 50px;
  font-size: 16px;
  color: #cecece;
  ${mobile({ display: "none" })}
`;

const Navbar = ({ darkMode, setDarkMode }) => {

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const LogoutFn = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/')
  }

  return (
    <Container>
      <Logo src={LogoImg} />
      <Title>Expense Tracker</Title>
      <UserName>Welcome back <b>{user.username}</b></UserName>
      <Mode onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
      </Mode>
      <LogOut onClick={LogoutFn}><FiLogOut /></LogOut>
    </Container>
  )
}

export default Navbar

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contextApi/user";
import imgLog from '../imges/imgLog.jpg'
import axios from 'axios';

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    margin-top: 100px;
    width: fit-content;
`;
const Img = styled.img`
    width: 500px;
    height: 500px;
`;
const LogContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 1rem;
    align-items: center;
    gap:12px;
    width: 350px;
`;
const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    color: #104a7e;
`;
const Input = styled.input`
    width: 200px;
    outline: none;
    height: 40px;
    border: none;
    border-bottom: 1px solid gray;
    padding-left: 10px;
    background-color: inherit;

`;
const Button = styled.button`
    width:100px;
    padding: 5px;
    border-radius: 0.7rem;
    border: none;
    background-color: #1a57e6;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: #3e75f5;  
    }
`;
const Hr = styled.hr`
    margin-top: 15px;
    width: 80%;
    background-color: #1702d7;
`;

const Login = () => {

    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const loginFn = async (e) => {
        e.preventDefault();
        const user = {
            username: userName,
            password: password,
        };
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:8080/api/user/login", user);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/home")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", });
            console.log(err)
        }
    };

    const signUpFn = async (e) => {
        e.preventDefault();
        const newUser = {
            username: userName,
            password: password
        };

        try {
            await axios.post("http://localhost:8080/api/user/register", newUser);
            navigate("/home");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Img src={imgLog} />
            <LogContainer>
                <Title>Login</Title>
                <Input required onChange={(e) => setuserName(e.target.value)} placeholder="userName" />
                <Input required onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                <Button onClick={loginFn}>Login</Button>
                <Hr />
                <Title>SignUp</Title>
                <Input required onChange={(e) => setuserName(e.target.value)} placeholder="userName" />
                <Input required onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                <Button onClick={signUpFn}>SignUp</Button>
            </LogContainer>
        </Container>
    )
}

export default Login

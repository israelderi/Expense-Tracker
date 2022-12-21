import { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contextApi/user';
import History from './History';
import axios from 'axios';

const Container = styled.div`
    margin-top: 30px;
    flex: 1;
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;
const Title = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: bold;
`;
const Input = styled.input`
    width: 280px;
    height: 32px;
    border: none;
    outline: none;
    background-color: #e5e5e5;
    border-radius: 0.5rem;
    padding-left: 13px;
    font-size: 12px;
    ::placeholder{
        color: black;
    }
`;
const Select = styled.select`
    width: 290px;
    height: 35px;
    padding-left: 6px;
    outline: none;
    background-color: #e5e5e5;
    border-radius: 0.5rem;
    font-size: 12px;
    border: none;
    
`;
const Option = styled.option``;

const ButtonAdd = styled.button`
    padding: 8px 25px;
    border-radius: 0.5rem;
    font-size: 14px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    color: white;
    background-color: #3766dc;
    &:hover{
        transition: 0.5s;
        background-color: #1957f5;   
    }
`;

const Form = () => {

    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [color, setColor] = useState('');

    const { user } = useContext(AuthContext);

    const setColorfn = () => {
        if (category === 'Expense') return ('rgb(255, 99, 132)')
        else if (category === 'Savings') return ('rgb(54, 162, 235)')
        else if (category === 'Investment') return ('rgb(255, 205, 86)')
        else {
            return console.log('color not valid')
        };
    }


    const hendelAddTransaction = async () => {
        let newAction = {
            category: category,
            name: name,
            color: setColorfn(),
            amount: amount
        }
        try {
            await axios.post(`http://localhost:8080/api/actions/create/${user._id}`, newAction)
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Title>Transaction or action</Title>
            <Select onChange={(e) => setCategory(e.target.value)}>
                <Option defaultValue='Choose an action'>Choose an action</Option>
                <Option value="Investment">Investment</Option>
                <Option value="Expense">Expense</Option>
                <Option value="Savings">Savings</Option>
            </Select>
            <Input onChange={(e) => setName(e.target.value)} placeholder='Enter action name' />
            <Input onChange={(e) => setAmount(e.target.value)} placeholder='Amount / Price' />
            <ButtonAdd onClick={hendelAddTransaction}>Add</ButtonAdd>
            <History />
        </Container>
    )
}

export default Form

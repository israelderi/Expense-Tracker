import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { AuthContext } from '../contextApi/user';
import useFetch from "../useFetch";
import axios from 'axios';

const Container = styled.div`
    overflow-y: scroll;
    height: 180px;
    margin-top: 30px;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    margin-bottom:20px;
`;

const Action = styled.div`
    background-color: inherit;
    border-bottom: 0.1px solid #515151;
    margin-top: 12px;
    margin-bottom: 15px;
    padding-bottom:5px;
    width: 250px;
    display: flex;
    justify-content: space-between;
    &:hover{
        border-bottom: 1px solid #396ae5;
        transition: 0.5s; 
    }
`;
const Color = styled.div`
   width: 5px;
   border-radius: 4px;
`;
const Details = styled.div`
   color: ${({ theme }) => theme.text};
   font-size: 12px;
`;

const Icon = styled.div`
    cursor: pointer;
    &:hover{
        transition: 1s;
        font-size: 18px;
    }
    
`;


const History = () => {

    const { user } = useContext(AuthContext);

    const { data, reFetch } = useFetch(`http://localhost:8080/api/actions/get/${user._id}`);

    const deleteAc = async (id) => {
        await axios.delete(`http://localhost:8080/api/actions/delete/${id}/${user._id}`)
        reFetch();
        window.location.reload(false);
    }

    return (
        <Container>
            <Title>History</Title>
            {
                data && data.map((item, index) => {
                    return <Action key={index}>
                        <Color style={{ backgroundColor: item.color }}></Color>
                        <Details><b>{item.name}</b> - ${item.amount}</Details>
                        <Icon
                            onClick={() => deleteAc(item._id)}
                            style={{ color: item.color }}
                        >
                            <AiOutlineDelete />
                        </Icon>
                    </Action>
                })
            }
        </Container>
    )
}

export default History

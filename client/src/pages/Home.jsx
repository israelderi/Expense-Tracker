import styled, { ThemeProvider } from "styled-components";
import Navbar from '../components/Navbar';
import Graph from '../components/Graph';
import Form from '../components/Form';
import { useState } from 'react';
import { darkTheme, lightTheme } from "../mode"
import { mobile } from "../responsive";


const Container = styled.div`
  overflow: hidden;
  border-radius: 2rem;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 30px;
  min-height: 600px;
  width: 70%;
  background-color:${({ theme }) => theme.bg};
  ${mobile({ width: '98%', marginTop: '10px' })};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 60px;
    ${mobile({ padding: '4px', flexDirection: 'column' })};
`;

const Home = () => {

    const [darkMode, setDarkMode] = useState(false);


    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Wrapper>
                    <Graph />
                    <Form />
                </Wrapper>
            </Container>
        </ThemeProvider>
    )
}

export default Home

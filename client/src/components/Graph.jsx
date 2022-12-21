import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import { AuthContext } from '../contextApi/user';
import { useContext, useEffect, useState } from 'react';
import useFetch from '../useFetch';
import _ from 'lodash';
import { mobile } from "../responsive";

Chart.register(ArcElement);

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 45px;
    ${mobile({ marginLeft: "8px" })}
`;
const GraphDiv = styled.div`
    margin-top: 50px;
    position: relative;
    width: fit-content;
    text-align: center;
    margin-bottom: 40px;
    height: 250px;
    ${mobile({ marginLeft: "26px" })}
`;
const GraphTitle = styled.h1`
    color: ${({ theme }) => theme.text};
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    right: 0;
    left: 0;
    top: 30%;
`;
const GraphNum = styled.p`
    font-weight: bold;
    margin-top: 2px;
    color: #00fcb5;
`;

const Graph = () => {

  const { user } = useContext(AuthContext);
  const { data } = useFetch(`http://localhost:8080/api/actions/get/${user._id}`);
  const [allActions, setAllActions] = useState([])

  useEffect(() => {
    const setData = () => {
      setAllActions(data);
    }
    setData()

  }, [data])

  const test = (arr, type) => {
    let sum = _(arr).groupBy("category")
      .map((item, key) => {
        if (!type) return _.sumBy(item, 'amount');
        return {
          type: key,
          color: item[0].color,
          total: _.sumBy(item, 'amount')
        }
      }).value()
    return sum
  };

  const chartData = (arr) => {
    let bg = _.map(arr, a => a.color)
    bg = _.uniq(bg)
    let dataValue = test(allActions)
    const config = {
      data: {
        datasets: [{
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10
        }]
      },
      options: {
        cutout: 95
      }
    }
    return config;
  }

  const getTotalNum = (arr) => {
    return _.sum(test(allActions));
  }


  return (
    <Container>
      <GraphDiv>
        <Doughnut {...chartData(allActions)} />
        <GraphTitle>Total <br /> <GraphNum>${getTotalNum(allActions) ?? 0}</GraphNum></GraphTitle>
      </GraphDiv>
      <Labels />
    </Container>
  )
}

export default Graph

import styled from 'styled-components';
import { AuthContext } from '../contextApi/user';
import { useContext, useEffect, useState } from 'react';
import useFetch from '../useFetch';
import _ from 'lodash';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin-bottom: 15px;
    align-items: center;
    border-bottom: 0.1px solid #404040;
    padding-bottom: 4px;
    &:hover{
        border-bottom: 1px solid #396ae5;
        transition: 0.5s; 
    }
`;
const Color = styled.div`
    width: 6px;
    height: 30px;
    border-radius: 1rem;
`;
const Type = styled.div`
    color: ${({ theme }) => theme.text};
    font-weight: 700;
`;
const Percent = styled.div`
   color: ${({ theme }) => theme.text};
   font-weight: 100;
`;
const TypeAndColor = styled.div`
    align-items: center;
    display: flex;
    gap: 6px;
`;


const Labels = () => {

  const [allActions, setAllActions] = useState([])
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`http://localhost:8080/api/actions/get/${user._id}`);

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

  const getPercent = (arr, type) => {
    let amountSum = test(arr, 'type');
    let Total = _.sum(test(arr));
    let percent = _(amountSum).map(objs => _.assign(objs, { percent: (100 * objs.total) / Total })).value()
    return percent;
  };

  const totalInvestmentAction = (getPercent(allActions, 'type'));

  return (
    <>
      {
        totalInvestmentAction.map((label, index) => {

          return <Container key={index} label={label}>
            <TypeAndColor>
              <Color style={{ backgroundColor: label.color }}></Color>
              <Type>{label.type}</Type>
            </TypeAndColor>
            <Percent>{Math.round(label.percent)}%</Percent>
          </Container>
        })
      }
    </>
  )
}

export default Labels

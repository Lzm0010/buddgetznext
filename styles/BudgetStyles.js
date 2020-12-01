import styled from 'styled-components';

const BudgetStyles = styled.div`
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-evenly;
  }
  .table-body{
    display: flex;
    justify-content: space-between;
    .projected {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default BudgetStyles;
import { useState } from 'react';
import styled from '@emotion/styled';

const CalculatorContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 20px;
`;

const Calculator = () => {
  const [diploidNumber, setDiploidNumber] = useState(46);
  const [haploidNumber, setHaploidNumber] = useState(23);

  const calculateHaploid = (diploid) => {
    return diploid / 2;
  };

  return (
    <CalculatorContainer>
      <h3>Chromosome Number Calculator</h3>
      <div>
        <label>Diploid (2n): </label>
        <input 
          type="number" 
          value={diploidNumber}
          onChange={(e) => {
            setDiploidNumber(e.target.value);
            setHaploidNumber(calculateHaploid(e.target.value));
          }}
        />
      </div>
      <div>
        <label>Haploid (n): </label>
        <span>{haploidNumber}</span>
      </div>
    </CalculatorContainer>
  );
};

export default Calculator; 
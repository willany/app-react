import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  height: 48px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 20px;
  margin-top: 30px;
`;

export const Button = styled.button`
  height: 48px;
  background: #7159c1;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 20px;
  margin-top: 10px;
  color: #fff;
  font-weight: bold;
  border: 0;
  cursor: pointer;
    :hover {
      opacity: 0.8;
    }
`;

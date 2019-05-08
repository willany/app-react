import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 21px;
  padding-left: 15px;
  margin-left: 15px;
  border-left: 1px solid #ddd;
`;

// #box-container header button svg {
//   margin-right: 10px;
// }

// #box-container header button:hover {
//   opacity: 0.9;
// }

export const Upload = styled.div`
  border-radius: 4px;
  padding: 30px;
  text-align: center;
  border: 1px dashed #ddd;
  color: #999;
  margin-top: 50px;
  cursor: pointer;
`;

export const Files = styled.ul`
  margin: 30px 0;
  list-style: none;
`;

export const File = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :first-child{
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid #eee;
  };
`;

export const FileInfo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const FileTitle = styled.strong`
  font-weight: normal;
  font-size: 14px;
  margin-left: 10px;
  color: #333;
`;

export const TimeUpdated = styled.span`
  color: #999;
  font-size: 13px;
`;

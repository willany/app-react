import React, { useState, useEffect } from "react";
import { MdInbox } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../../services/api.services";

import {
  Container,
  Header,
  Title,
  BoxList,
  Box,
  BoxInfo,
  BoxTitle,
  TimeUpdated
} from "./styles";

export default function Boxes() {
  const [boxList, setBoxList] = useState([]);
  useEffect(() => {
    const fetchBoxes = async () => {
      const response = await api.get("boxes");
      setBoxList(response.data);
    };
    fetchBoxes();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Oi</Title>
      </Header>

      <BoxList>
        {boxList &&
          boxList.map(box => (
            <Box key={box._id}>
              <BoxInfo href={`/box/${box._id}`} rel="noopener noreferrer">
                <MdInbox size={24} color="#A5CFFF" />
                <BoxTitle>{box.title}</BoxTitle>
              </BoxInfo>
              <TimeUpdated>
                Há {distanceInWords(box.createdAt, new Date(), { locale: pt })}
              </TimeUpdated>
            </Box>
          ))}
      </BoxList>
    </Container>
  );
}

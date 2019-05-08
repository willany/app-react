import React, { useState } from "react";
import api from "../../services/api.services";

import { Container, Form, Input, Button } from './styles';

const Main = props => {
  const [boxName, setBoxName] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post("boxes", { title: boxName });
    props.history.push(`/box/${response.data._id}`);
  };

  return (
    <Container>
      <Form onSubmit={e => handleSubmit(e)}>
        <Input
          placeholder="Criar um box"
          type="text"
          value={boxName}
          onChange={e => setBoxName(e.target.value)}
        />
        <Button type="submit">Criar</Button>
      </Form>
    </Container>
  );
};

export default Main;

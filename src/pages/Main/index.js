import React, { useState } from "react";
import api from "../../services/api.services";

import "./styles.css";

const Main = props => {
  const [boxName, setBoxName] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post("boxes", { title: boxName });
    props.history.push(`/box/${response.data._id}`);
  };

  return (
    <div id="main-container">
      <form onSubmit={e => handleSubmit(e)}>
        <input
          placeholder="Criar um box"
          type="text"
          value={boxName}
          onChange={e => setBoxName(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default Main;

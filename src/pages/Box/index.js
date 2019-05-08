import React, { useState, useEffect } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";

import api from "../../services/api.services";
import logo from "../../assets/logo.svg";

import { Container, Header, Title, Upload, Files, File, FileInfo, FileTitle, TimeUpdated } from "./styles.js";

const Box = props => {
  const [title, setTitle] = useState("");
  let [files, setFiles] = useState([]);

  useEffect(() => {
    fetchData();
    subscribeToNewFiles();
  }, []);

  const fetchData = async () => {
    const box = props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    setTitle(response.data.title);
    setFiles(response.data.files);
  };

  const handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = props.match.params.id;
      data.append("file", file);
      api.post(`boxes/${box}/files`, data);
    });
  };

  const subscribeToNewFiles = () => {
    const box = props.match.params.id;
    const io = socket("https://node-app-files.herokuapp.com");
    io.emit("connectRoom", box);
    io.on("file", data => {
      setFiles(prevState => [data, ...prevState]);
    });
  };

  return (
    <Container>
      <Header>
        <img src={logo} alt="logo" />
        <Title>{title}</Title>
      </Header>

      <Dropzone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <Upload {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste arquivos, ou clique aqui.</p>
          </Upload>
        )}
      </Dropzone>
      <Files>
        {files &&
          files.map(file => (
            <File key={file._id}>
              <FileInfo
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdInsertDriveFile size={24} color="#A5CFFF" />
                <FileTitle>{file.title}</FileTitle>
              </FileInfo>
              <TimeUpdated>
                Há {distanceInWords(file.createdAt, new Date(), { locale: pt })}
              </TimeUpdated>
            </File>
          ))}
      </Files>
    </Container>
  );
};

export default Box;

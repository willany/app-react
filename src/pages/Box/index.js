import React, { useState, useEffect } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";

import api from "../../services/api.services";
import logo from "../../assets/logo.svg";

import "./styles.css";

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
    <div id="box-container">
      <header>
        <img src={logo} alt="logo" />
        <h1>{title}</h1>
      </header>

      <Dropzone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div className="upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste arquivos, ou clique aqui.</p>
          </div>
        )}
      </Dropzone>
      <ul>
        {files &&
          files.map(file => (
            <li key={file._id}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fileInfo"
              >
                <MdInsertDriveFile size={24} color="#A5CFFF" />
                <strong>{file.title}</strong>
              </a>
              <span>
                Há {distanceInWords(file.createdAt, new Date(), { locale: pt })}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Box;

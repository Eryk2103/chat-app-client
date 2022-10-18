import React, { useContext, useEffect, useState, useRef } from "react";
import './ChatRoom.css';
import socketIO from 'socket.io-client';
import {  useParams } from "react-router-dom";
import UserContext from "../UserContext";
import Message from "./Message";

const socket = socketIO.connect(process.env.REACT_APP_API);

export default function ChatRoom(props) {
  const [messages, setMessages] = useState([]);
  const {id} = useParams();
  const {username} = useContext(UserContext);
  const messageToSend = useRef();
  const lastMessage = useRef();

  const skrollToView = () => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    setMessages([]);
    socket.emit("join-room", id, username);
    setMessages((current) => {
      return [
        ...current,
        {
          user: username,
          message: "joined chat",
        },
      ];
    });
    return () => {
      socket.emit("leave-room", id, username);
    };
  }, [id, username]);

  useEffect(() => {
    socket.on("message", (msg) => setMessages([...messages, msg]));
    skrollToView();
  }, [messages]);
  const sendMsg = (event) => {
    const msg = messageToSend.current.value;
    event.preventDefault();
    socket.emit("send-message", id, msg, username)
    setMessages([...messages, {user: username, message: msg}])
    messageToSend.current.value = '';
    skrollToView();
  }
  
  if(!id || id.trim() === ''){
    return( <div className="center flex-grow"><h3 className="title">Select a chat room to join</h3></div>)
  }
  return (
    <div className="flex-grow card-main">
      <h3 className="title">{id}</h3>
      <div className="message-list scroll flex-grow">
          <ul className='skroll'>
        {messages &&
          messages.map((msg, index) => {
            return  <Message key={index} user={msg.user} message={msg.message}></Message>;
          })}
      </ul>
      <div className="dummy" ref={lastMessage}></div>
      </div>
      <form className="message-form" onSubmit={sendMsg}>
        <span className="input-round-wrapper flex-grow">
          <input className="input-round" ref={messageToSend} />
        </span>
        <button className="btn-send" >Send</button>
      </form>
    </div>
  );
}

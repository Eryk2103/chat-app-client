import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import CreateRoom from "./CreateRoom";
import ListItem from "./ListItem";
import Modal from "./Modal";

export default function ChatRoomsList() {
  const [rooms, setRooms] = useState([]);
  const [displayedRooms, setDisplayedRooms] = useState([])
  const [displayModal, setDisplayModal] = useState(false);
  const {token} = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    const getData = async() => { 
        const res = await fetch(`${process.env.REACT_APP_API}/room`,{
          method: 'GET',
          headers: {
            "Authentication": `Bearer ${token}`,
            "Content-type": "application/json",
            "Accept": "application/json",
          }
        });
        if(res.status === 200){
          const data = await res.json();
          setRooms(data);
          setDisplayedRooms(data);
        }
        else{
          navigate('/login');
        }
      }
  getData();
  }, [navigate, token]);
  const filter = (event) => {
    if(event.target.value.trim() === '')
    {
      setDisplayedRooms([...rooms])
    }
    else{
      setDisplayedRooms(rooms.filter(room => {return room.name.includes(event.target.value)}))
    }
    
  }
  const createRoomToggle = () => {
    setDisplayModal(!displayModal);
  };
  return (
    <>
      {displayModal && (
        <Modal close={createRoomToggle}>
          <CreateRoom close={createRoomToggle}/>
        </Modal>
      )}
      <div className="card-list">
        <h3 className="title">Chat rooms</h3>
        <span className="input-round-wrapper">
          <input
            type="text"
            className="input-round"
            placeholder="Search"
            onChange={filter}
          ></input>
        </span>
        <section className="scroll">
          {displayedRooms.map((room, index) => {
            return <ListItem key={index} name={room.name} />;
          })}
        </section>
        <div className="dummy"></div>
        <button className="btn-primary" onClick={createRoomToggle}>
          Create new room
        </button>
      </div>
    </>
  );
}

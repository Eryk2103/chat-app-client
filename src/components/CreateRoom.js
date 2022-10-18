import React, { useContext, useRef, useState } from 'react'
import UserContext from '../UserContext';

export default function CreateRoom(props) {
    const [nameError, setNameError] = useState(false);
    const name = useRef();
    const {token} = useContext(UserContext);
    const create = async (event) => {
      event.preventDefault();

      const res = await fetch(`${process.env.REACT_APP_API}/room`, {
        method: 'POST',
        headers: {
          "Authentication": `Bearer ${token}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name.current.value
        })
      });
      if(res.status === 400)
      {
        setNameError(true)
      }
      else{
        props.close();
      }
    }
  return (
    <form className='center column' onSubmit={create}>
        {nameError && (
            <p className="form-error">Chat room with this name already exists</p>
          )}
        <span className='input-wrapper w-100'>
            <input className='input-text' placeholder='Chat room name' ref={name} onFocus={() => setNameError(false)}></input>
        </span>
        
        <button className='btn-primary'>Create</button>
    </form>
  )
}

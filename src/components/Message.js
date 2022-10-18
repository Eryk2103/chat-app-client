import React from 'react'
import './Message.css';
export default function Message(props) {
  return (
    <li className='message'>{props.message} <span className='message-user'>@{props.user}</span></li>
  )
}

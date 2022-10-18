import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ListItem.css';

export default function ListItem(props) {
  let navigate = useNavigate();
  return (
    <article className='list-item'>
        <p onClick={() => navigate(`/${props.name}`)}>{props.name}</p>
    </article>
  )
}
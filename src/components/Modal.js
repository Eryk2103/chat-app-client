import React from "react";
import "./Modal.css";
export default function Modal(props) {
  return (
    <div className="backdrop">
      <div className="modal">
        <h3 className="title">Create new room</h3>
        <button className="btn-close" onClick={props.close}></button>
        {props.children}
      </div>
    </div>
  );
}

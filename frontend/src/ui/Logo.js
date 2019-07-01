import React from 'react';
import logo from '../style/logo.png';

export default function Logo(props) {
  return (
    <div className="app__main-logo">
      <img src={logo} alt="logo" />
      <button className="link" onClick={props.howToClick}>How to play?</button>
    </div>
  )
}

import React from 'react';

export default ({children}) => {
  return <button className="b-btn">
    <span className="b-btn__text">{children}</span>
  </button>
}
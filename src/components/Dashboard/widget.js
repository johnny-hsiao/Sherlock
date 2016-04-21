import React from 'react';

const Widget = (props) => {
  return (
    <div>
      <h1>{props.str}</h1>
      <input type="text" onChange={ props.update } />
    </div>
  )
}
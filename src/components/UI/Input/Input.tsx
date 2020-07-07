import React from 'react';
import classes from './Input.module.css';

interface inputProps {
  label: string;
  elementType: string;
  elementConfig: string;
  value: string
}


const input = (props: inputProps) => {

  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      console.log('pirmas imputas iskrito');
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
      break;
    case ('textarea'):
      console.log('textarea');
      inputElement = <textarea  className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
      break;
    default:
      console.log('defaultinis');
      inputElement = <input  className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
}



  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
  </div>
  );
  
};



export default input;
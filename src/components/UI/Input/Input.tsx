import React, { ChangeEvent } from 'react';
import classes from './Input.module.css';
import { validationProps } from '../../../containers/Checkout/ContactData/ContactData';


interface inputProps {
  label: string;
  elementType: string;
  elementConfig: elementConfigProps
  value: string;
  changed: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  invalid: boolean;
  shouldValidate?: validationProps;
  touched?: boolean;
}

interface elementConfigProps {
    type?: string;
  placeholder?: string;
  options?: options[];
}


interface options {
  value: string;
  displayValue: string;
}


const input = (props: inputProps) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} 
      onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea  className={classes.InputElement} {...props.elementConfig} value={props.value} 
      onChange={props.changed}/>;
      break;
    case ('select'):
      if (props.elementConfig.options) {
        inputElement = <select
        className={classes.InputElement}
        value={props.value} 
          onChange={props.changed}>
          
        {props.elementConfig.options.map(option =>(
          <option key={option.value} value={option.value}>
            {option.displayValue}

          </option>
        ))}
        </select>;
      }
        break;
    default:
      inputElement = <input  className={classes.InputElement} {...props.elementConfig} value={props.value} 
      onChange={props.changed}/>;
}



  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
  </div>
  );
  
};



export default input;
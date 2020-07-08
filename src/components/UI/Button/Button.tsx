import React from 'react';
import classes from './Button.module.css'

export interface buttonProps{
  btnType: string;
  children: React.ReactNode;
  clicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}


const button = (props: buttonProps) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default button;
import React from 'react';
import classes from './Button.module.css'

export interface buttonProps{
  btnType: string;
  children: React.ReactNode;
  clicked: any// nepamirsti atkeisti i event klikeri(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>void;
}


const button = (props:buttonProps) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default button;
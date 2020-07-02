import React from 'react'
import classes from './BuildControl.module.css';

export interface buildControlProps {

  label: string;
  type: string;
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
  disabled?: boolean | number;


}
const buildControl = (props:buildControlProps) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removed}  disabled={props.disabled === true ? props.disabled:false}>Less</button>
    <button className={classes.More} onClick={props.added}>More</button>
    </div>
);


export default buildControl;


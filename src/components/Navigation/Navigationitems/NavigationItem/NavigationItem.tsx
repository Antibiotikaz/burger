import React from 'react';
import classes from './NavigationItem.module.css';

export interface navigationItemProps {
  children: React.ReactNode;
  link: string;
  active: boolean;
  
}
const navigationItem = (props:navigationItemProps) => (

  <li className={classes.NavigationItem}>
    <a
      href={props.link}
      className={props.active ? classes.active : undefined}
    >
      {props.children}
    </a>
  </li> 
);




export default navigationItem;
import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

export interface navigationItemProps {
  children: React.ReactNode;
  link: string;
  active: boolean;
  
}
const navigationItem = (props:navigationItemProps) => (

  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      
      activeClassName={classes.active}
     
    >
      {props.children}
    </NavLink>
  </li> 
);




export default navigationItem;
import React from 'react';
import classes from './DrawerToggle.module.css';

interface drawerToggle {
clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const drawerToggle = (props:drawerToggle) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
</div>
);


export default drawerToggle;
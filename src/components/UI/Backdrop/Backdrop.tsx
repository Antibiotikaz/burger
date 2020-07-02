import React from 'react';
import classes from './Backdrop.module.css'

interface backdropProps {
  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  show: boolean| undefined | string;
}

const backdrop = (props:backdropProps) => (
 props.show? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);


export default backdrop;
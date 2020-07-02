import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxiliary/auxiliary';


interface sideDrawerProps {
  closed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  open: boolean;
}

const sideDrawer = (props: sideDrawerProps) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')}>
      <div className={classes.Logo}>
      <Logo height=""/>
      </div>
      <nav>
        <NavigationItems />
      </nav>
      </div>
    </Aux>
  );

};




export default sideDrawer;



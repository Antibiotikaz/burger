import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
interface toolbarProps {
  drawerToggleClicked: () => void; 
}

const toolbar = (props:toolbarProps) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}>
    <Logo height=""/>
    </div>
  
    <nav className={classes.DesktopOnly}>
      <NavigationItems/>
    </nav>
   </header>
);


export default toolbar;
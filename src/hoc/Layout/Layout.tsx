import React from 'react';
import Aux from '../auxiliary/auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


interface layoutProps {
  children: React.ReactNode
}

interface myState {
  showSideDrawer: boolean;
}


class Layout extends React.Component<layoutProps, myState> {
  
  state = {
    showSideDrawer: false
  }


  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }


  sideDrawerToggleHandler = () => {
    this.setState((prevState) => { 
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
    <main className={classes.Content}>
      {this.props.children}
    </main>
    </Aux>
    )
    
  }
} 


export default Layout;
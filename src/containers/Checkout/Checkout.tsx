import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Route } from "react-router-dom";
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { reducerStateProps } from '../../store/reducer';



interface checkoutProps extends RouteComponentProps {
  ings: checkoutIngProps;
}

interface checkoutIngProps {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}




class Checkout extends Component<checkoutProps> {
  





  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }


  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
         
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
    }

const mapStateToProps = (state: reducerStateProps) => {
  return {
    ings: state.ingredients,
      }
    }

export default connect(mapStateToProps)(Checkout);
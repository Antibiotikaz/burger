import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Dispatch } from 'redux';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { burgerBuilderReducerProps } from '../../store/reducers/burgerBuilder';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Ingredients } from '../../components/Burger/Burger';







interface orderReducerProps {
  onFetchOrders: () => void;
  loading: boolean;
  orders: [{
    price: number,
    ingredients: Ingredients,
    id: number,
  }];
}

class Orders extends Component<orderReducerProps> {

  
  componentDidMount() {
    this.props.onFetchOrders();
    console.log(this.props.orders, 'cia yra orders');
  };

  
  render() {
    let orders: object= <Spinner />
    if (!this.props.loading) {
    
      orders=this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+ order.price}
        />
      ))
    }
      return (
        <div>
        {orders}
        </div>
    
      );
    }
  
}
  const mapStateToProps = (state: burgerBuilderReducerProps ) => {
    return {
      orders: state.order.orders,
      loading: state.order.loading
    };
  }

  

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()) 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
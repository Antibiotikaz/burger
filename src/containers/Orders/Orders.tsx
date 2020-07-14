import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Dispatch } from 'redux';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { burgerBuilderReducerProps } from '../../store/reducers/burgerBuilder';
import Spinner from '../../components/UI/Spinner/Spinner';





interface ordersIngProps {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
    [key: string]: number
}


interface orderReducerProps {
  onFetchOrders: () => void;
  loading: boolean;
  orders: [{
    price: number,
    ingredients: ordersIngProps,
    id: number,
  }];
}

class Orders extends Component<orderReducerProps> {

  
  componentDidMount() {
    this.props.onFetchOrders();
  };

  
  render() {
    let orders:any= <Spinner />
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
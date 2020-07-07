import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


interface ordersStateProps {
  orders: [{
    price: number,
    ingredients: ordersIngProps,
    id: number
  }];
  loading: boolean;
}


interface ordersIngProps {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
    [key: string]: number
}


class Orders extends Component {

  state:ordersStateProps = {
    orders: [{
      price: 0,
      ingredients: {} as ordersIngProps,
      id: 0

    }],
    loading: true,
  }


  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id:key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price = {+ order.price}
          />
        ))}
      </div>
    
    );
    }
}


export default withErrorHandler(Orders, axios);
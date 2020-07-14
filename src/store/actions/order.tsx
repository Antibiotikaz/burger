import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
import { Dispatch } from 'redux';


export const purchaseBurgerSuccess = (id: string, orderData: string) => {
  return {
    type: actionTypes.ActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};


export const purchaseBurgerFail = (error: boolean) => {
  return {
    type: actionTypes.ActionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.ActionTypes.PURCHASE_BURGER_START
  };
}

export const purchaseBurger: Function = (orderData: string) => {
  return (dispatch: Dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};


export const purchaseInit = () => {
  return {
      type:actionTypes.ActionTypes.PURCHASE_INIT
  };
}

export const fetchOrdersSuccess = (orders:any[]) => {
  return {
    type: actionTypes.ActionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error: boolean) => {
  return {
    type: actionTypes.ActionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.ActionTypes.FETCH_ORDERS_START,
  };
};


export const fetchOrders: Function = () => {
  return (dispatch: Dispatch) => { 
    dispatch(fetchOrdersStart());
    axios.get('orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id:key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
  };
};

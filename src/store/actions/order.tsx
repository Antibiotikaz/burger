import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
import { Dispatch } from 'redux';
import { contactStateProps } from '../../containers/Checkout/ContactData/ContactData';


export const purchaseBurgerSuccess = (id: string, orderData: contactStateProps) => {
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
// CIA NEPADUODA INGRIDIENTU!
export const purchaseBurger: Function = (orderData: contactStateProps) => {
  return (dispatch: Dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(orderData, 'Cia yra order Data');
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

export const fetchOrdersSuccess = (orders:object) => {
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
      const fetchedOrders:object[] = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id:key
        });
      }
      console.log(fetchedOrders, 'cia yra fetch orders');
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
  };
};

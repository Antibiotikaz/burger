import * as actionTypes from '../actions/actionsTypes';
import { Action } from '../actions/burgerBuilderActions';
import { updateObject } from '../utility';



 export interface reducerStateProps {
  loading: boolean;
  orders: reducerOrderProps[];
  purchased: boolean;
}

interface reducerOrderProps {
  id: string;
}


const initialState = {
  orders: [],
  loading: false,
  purchased: false
};


const purchaseInit = (state: reducerStateProps, action: Action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state: reducerStateProps, action: Action) => {
  return updateObject(state, { loading: true });
}


const purchaseBurgerSuccess =(state: reducerStateProps, action: Action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased:true,
    orders: state.orders.concat(newOrder)
  });
}

const purchaseBurgerFail = (state: reducerStateProps, action: Action) => {
  return updateObject(state, { loading: false });
}

const fetchOrderStart = (state: reducerStateProps, action: Action) => {
  return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state: reducerStateProps, action: Action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

const fetchOrderFail = (state: reducerStateProps, action: Action) => {
  return updateObject(state, { loading: true });
}

const reducer = (state: reducerStateProps = initialState, action: Action) => {
  switch (action.type) {

    case actionTypes.ActionTypes.PURCHASE_INIT: return purchaseInit(state, action);
     
    case actionTypes.ActionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
      
    case actionTypes.ActionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
      
    case actionTypes.ActionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
    
    case actionTypes.ActionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
      
    case actionTypes.ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
     
    case actionTypes.ActionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
       
    default: return state;
  }
  
};

export default reducer;
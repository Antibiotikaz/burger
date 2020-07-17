import * as actionTypes from '../actions/actionsTypes';
import { Action } from '../actions/burgerBuilderActions';
import { updateObject } from '../utility';
import { contactStateProps } from '../../containers/Checkout/ContactData/ContactData';



 export interface reducerStateProps {
  loading: boolean;
  orders: contactStateProps[];
  purchased: boolean;
}


const initialState = {
  orders: [],
  loading: false,
  purchased: false
};


const purchaseInit = (state: reducerStateProps) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state: reducerStateProps) => {
  return updateObject(state, { loading: true });
}


const purchaseBurgerSuccess =(state: reducerStateProps, action: Action) => {
  const newOrder: any = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased:true,
    orders: state.orders.concat(newOrder)
  });
}

const purchaseBurgerFail = (state: reducerStateProps) => {
  return updateObject(state, { loading: false });
}

const fetchOrderStart = (state: reducerStateProps) => {
  return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state: reducerStateProps, action: Action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

const fetchOrderFail = (state: reducerStateProps, action: Action) => {
  return updateObject(state, { loading: false });
}

const reducer = (state: reducerStateProps = initialState, action: Action) => {
  switch (action.type) {

    case actionTypes.ActionTypes.PURCHASE_INIT: return purchaseInit(state);
     
    case actionTypes.ActionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
      
    case actionTypes.ActionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
      
    case actionTypes.ActionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    
    case actionTypes.ActionTypes.FETCH_ORDERS_START: return fetchOrderStart(state);
      
    case actionTypes.ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
     
    case actionTypes.ActionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
       
    default: return state;
  }
  
};

export default reducer;
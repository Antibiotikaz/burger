import * as actionsTypes from './actionsTypes';
import axios from '../../axios-orders';
import { reducerIngProps } from '../reducers/burgerBuilder';
import { Dispatch } from 'redux';

interface add_Ingredient {
  type: typeof actionsTypes.ActionTypes.ADD_INGREDIENT
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}

interface remove_Ingredient {
  type: typeof actionsTypes.ActionTypes.REMOVE_INGREDIENT
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}

interface set_Ingredients {
  type: typeof actionsTypes.ActionTypes.SET_INGREDIENTS
  ingredients: reducerIngProps;
  ingredientName: string;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}

interface fetch_IngredientsFailed {
  type: typeof actionsTypes.ActionTypes.FETCH_INGREDIENTS_FAILED
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}


interface purchase_BurgerSuccess {
  orderId: string;
  orderData: { [element: string]: string; }
  type: typeof actionsTypes.ActionTypes.PURCHASE_BURGER_SUCCESS;
  ingredientName: string;
  ingredients: reducerIngProps;
  orders: { [element: string]: string; }
 
}

interface purchase_BurgerFail {
  type: typeof actionsTypes.ActionTypes.PURCHASE_BURGER_FAIL;
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}

interface purchase_BurgerStart {
  type: typeof actionsTypes.ActionTypes.PURCHASE_BURGER_START;
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}

interface purchase_Init {
  type: typeof actionsTypes.ActionTypes.PURCHASE_INIT;
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}



interface fetch_ordersStart {
  type: typeof actionsTypes.ActionTypes.FETCH_ORDERS_START;
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}


interface fetch_ordersSuccess {
  type: typeof actionsTypes.ActionTypes.FETCH_ORDERS_SUCCESS;
  orders: { [element: string]: string; }
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
}

interface fetch_ordersFail {
  type: typeof actionsTypes.ActionTypes.FETCH_ORDERS_FAIL;
  ingredientName: string;
  ingredients: reducerIngProps;
  orderId: string;
  orderData: { [element: string]: string; }
  orders: { [element: string]: string; }
}



export type Action = add_Ingredient | remove_Ingredient |fetch_IngredientsFailed | set_Ingredients| purchase_BurgerSuccess| purchase_BurgerFail | purchase_BurgerStart | purchase_Init | fetch_ordersStart | fetch_ordersSuccess |fetch_ordersFail;




//VIETA PO INTERFACE!

export const addIngredient = (name: string) => {
  return {
    type: actionsTypes.ActionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};


export const removeIngredient = (name: string) => {
  return {
    type: actionsTypes.ActionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients:set_Ingredients) => {
  return {
    type: actionsTypes.ActionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};


export const fetchIngredientsFailed  = () => {
  return {
        type: actionsTypes.ActionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients: Function = () => {
  return (dispatch: Dispatch) => {
    axios.get('https://react-my-burger-f85df.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data))
    })
    .catch(() => {
      dispatch(fetchIngredientsFailed());
    });
  };
};



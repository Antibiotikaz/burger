import {ActionTypes} from '../actions/actionsTypes';
import { Action } from '../actions/burgerBuilderActions';
import { updateObject } from '../utility';
 export interface reducerIngProps {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
 [key: string]: number
}

 export interface reducerStateProps {
   ingredients: reducerIngProps;
   totalPrice: number;
   error: boolean;
   loading?: boolean;

}

export interface burgerBuilderReducerProps {
  burgerBuilder: {
    ingredients: reducerIngProps;
    totalPrice: number;
    error: boolean;
  },
  order: {
    orders: [{
      price: number,
      ingredients: reducerIngProps,
      id: number,
    }],
    loading: boolean,
    purchased: boolean
  }

}

interface IngredientCostType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}


const initialState = {
  ingredients:{} as reducerIngProps,
  totalPrice: 0,
  error: false

};

const INGREDIENT_PRICES: IngredientCostType = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


const addIngredient = (state: reducerStateProps, action: Action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedState);
};


const removeIngredient = (state: reducerStateProps, action: Action) => {
  const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedSt);
     
};

const setIngredients = (state: reducerStateProps, action: Action) => { 
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 0,
    error: false
  });
};


const fetchIngredientsFailed = (state: reducerStateProps, action: Action) => {
  return updateObject(state, {error: true});
}

 const reducer = (state:reducerStateProps = initialState, action: Action)  =>{
   switch (action.type) {
     case ActionTypes.ADD_INGREDIENT: return addIngredient(state, action);
      
     case ActionTypes.REMOVE_INGREDIENT:return removeIngredient(state, action)
     
     case ActionTypes.SET_INGREDIENTS: return setIngredients(state, action);
 
     case ActionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state, action);
       
     default: return state;
  }
};

export default reducer;
import {ActionTypes} from '../actions/actionsTypes';
import { Action } from '../actions/burgerBuilderActions';
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

 const reducer = (state:reducerStateProps = initialState, action: Action)  =>{
   switch (action.type) {
     case ActionTypes.ADD_INGREDIENT:
       return {
         ...state,
         ingredients: {
           ...state.ingredients,
           [action.ingredientName]: state.ingredients[action.ingredientName] +1
         },
         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
       };
     case ActionTypes.REMOVE_INGREDIENT:
       return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
         },
         totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
       };
     
     case ActionTypes.SET_INGREDIENTS:
       return {
         ...state,
         ingredients: {
           salad: action.ingredients.salad,
           bacon: action.ingredients.bacon,
           cheese: action.ingredients.cheese,
           meat: action.ingredients.meat
         },
         error: false
       };
     case ActionTypes.FETCH_INGREDIENTS_FAILED:
       return {
         ...state,
         error: true
       };
     default:
       return state;
  }
};

export default reducer;
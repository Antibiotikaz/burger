import {ActionTypes, Action} from './actions';

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
}

interface IngredientCostType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}


const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0
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
     default:
       return state;
  }
};

export default reducer;
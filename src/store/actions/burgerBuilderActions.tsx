import * as actionsTypes from './actionsTypes';
import axios from '../../axios-orders';
import { reducerIngProps } from '../reducers/burgerBuilder';
import { Dispatch } from 'redux';

interface add_Ingredient {
  type: typeof actionsTypes.ActionTypes.ADD_INGREDIENT
  ingredientName: string;
}

interface remove_Ingredient {
  type: typeof actionsTypes.ActionTypes.REMOVE_INGREDIENT
  ingredientName: string;
}

interface set_Ingredients {
  type: typeof actionsTypes.ActionTypes.SET_INGREDIENTS
  ingredients: reducerIngProps;
}

interface fetch_IngredientsFailed {
  type: typeof actionsTypes.ActionTypes.FETCH_INGREDIENTS_FAILED
}


export type Action = add_Ingredient | remove_Ingredient |fetch_IngredientsFailed | set_Ingredients;


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



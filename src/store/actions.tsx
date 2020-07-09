
export enum ActionTypes {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT
}


interface add_Ingredient {
  type: ActionTypes.ADD_INGREDIENT;
  ingredientName: string;
}

interface remove_Ingredient {
  type: ActionTypes.REMOVE_INGREDIENT;
  ingredientName: string;
}

export type Action = add_Ingredient | remove_Ingredient;

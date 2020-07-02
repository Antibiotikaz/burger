import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


 export interface burgIng{
   ingredients: Ingredients;
  
}


 export interface Ingredients {
   salad: number;
   bacon: number;
   cheese: number;                    
   meat: number;
   [index: string]: number;
}



const burger = (props:burgIng) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey] as keyof Ingredients)].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
        
      })
    }).reduce((arr , el) => {
        return arr.concat(el)
      }, []);
  if (transformedIngredients.length === 0) {
         transformedIngredients = [<p key={'zero'}>Please start adding ingredients</p>]
      }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"}/>
        {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  
  );
};


export default burger;
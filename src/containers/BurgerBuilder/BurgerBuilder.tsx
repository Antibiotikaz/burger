import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary/auxiliary';
import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {RouteComponentProps} from "react-router-dom";






export interface IngredientType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
 [key: string]: number
}



interface burgerBuilderProps extends RouteComponentProps{

}

 export interface burgerBuilderStateProps {
  ingredients: IngredientType | null;
   totalPrice: number;
   purchaseable: boolean;
   purchasing: boolean;
   loading: boolean;
   error: boolean;
}



 
 interface IngredientCostType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}

const INGREDIENT_PRICES: IngredientCostType = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};



class BurgerBuilder extends Component<burgerBuilderProps>{
  
  state: burgerBuilderStateProps = {
    ingredients: {} as Ingredients,
      totalPrice: 0,
      purchaseable: false,
    purchasing: false,
       loading: false,
    error: false,
    
  }


  componentDidMount() {
    axios.get('https://react-my-burger-f85df.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(() => {
        this.setState({ error: true })
      });
  }

  updatePurchaseState(ingredients: { [x: string]: any; salad?: number; bacon?: number; cheese?: number; meat?: number; }) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
    
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type: string) => {
    if (this.state.ingredients) {
      const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
    }
    
  }

  removeIngredientHandler = (type: string) => {
    if (this.state.ingredients) {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount - 1;
      if (oldCount <= 0) {
        return;
      }
      const updatedIngredients = {
          ...this.state.ingredients
      };
  
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
   
  }


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
  
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }


  render() {
    const disabledInfo: {[key:string]:number|boolean} = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = null;
   
    
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
        <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        price={this.state.totalPrice}
        purchaseable={this.state.purchaseable}
         ordered={this.purchaseHandler}
          />
           </Aux>
      );
      orderSummary =  <OrderSummary
      purchaseCancelled={this.purchaseCancelHandler}
      price={this.state.totalPrice}
      purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.state.ingredients} />
      
      
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>
  }
    
    return (
        <Aux>
        <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
         {orderSummary}
        </Modal>
        {burger}
        </Aux>
      
    );
  }
  
  
}

export default withErrorHandler(BurgerBuilder, axios);
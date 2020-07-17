import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { burgerBuilderReducerProps } from '../../store/reducers/burgerBuilder';
import { Dispatch } from 'redux';
import * as actions from '../../store/actions/index';
import { Ingredients } from '../../components/Burger/Burger';
 


interface burgerBuilderProps extends RouteComponentProps{
  ings: Ingredients | null;
  onIngredientAdded:(ingName: string) => void;
  onIngredientRemoved: (ingName: string) => void;
  onInitIngredients: () => void;
  onInitPurchase: () => void;
  price: number;
  error: boolean;
}

 export interface burgerBuilderStateProps {
   purchasing: boolean;
}




class BurgerBuilder extends Component<burgerBuilderProps>{
  
  state: burgerBuilderStateProps = {
    purchasing: false,
  }
  


  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients: { [x: string]: number; salad: number; bacon: number; cheese: number; meat: number; }) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
    
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    return sum > 0 ;
  }

  


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }


  render() {
    const disabledInfo: {[key:string]:number|boolean} = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = null;
   
    
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
        <BuildControls
        ingredientAdded={this.props.onIngredientAdded}
        ingredientRemoved={this.props.onIngredientRemoved}
        disabled={disabledInfo}
        price={this.props.price}
        purchaseable={this.updatePurchaseState(this.props.ings)}
         ordered={this.purchaseHandler}
          />
           </Aux>
      );
      orderSummary =  <OrderSummary
      purchaseCancelled={this.purchaseCancelHandler}
      price={this.props.price}
      purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.props.ings} />
      
      
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

const mapStateToProps = (state: burgerBuilderReducerProps) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
}


const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    onIngredientAdded: (ingName: string) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: string) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
}



export default connect(mapStateToProps,mapDispatchProps)(withErrorHandler(BurgerBuilder, axios));
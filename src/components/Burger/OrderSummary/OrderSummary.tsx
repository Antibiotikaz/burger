import React, { Component } from 'react';
import Aux from '../../../hoc/auxiliary/auxiliary';
import Button from '../../UI/Button/Button';


export interface summaryIng {
  ingredients: { [index: string]: number }
  purchaseCancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  purchaseContinue: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  price: number;
}


class OrderSummary extends Component<summaryIng>{

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}</li>)
    });
    return (
      <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary.map((item, index) => (<div key={index}>{item}</div>))}
      </ul>
      <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
      <Button btnType={'Success'} clicked={this.props.purchaseContinue}>CONTINUE</Button>
    </Aux>
    );
  }
}



export default OrderSummary;
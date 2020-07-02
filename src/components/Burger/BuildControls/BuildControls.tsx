import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


export interface buildControlsProps {
  ingredientAdded: Function;
  ingredientRemoved: Function;
  disabled: { [key: string]: number | boolean };
  price: number;
  purchaseable: boolean;
  ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>void;
}


const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  {label:'Meat', type: 'meat'},
];

const buildControls = (props:buildControlsProps) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >ORDER NOW</button>
  </div>
);

export default buildControls;
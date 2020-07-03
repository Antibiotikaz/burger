import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps, Route } from "react-router-dom";


interface contactDataIngProps {
  salad: number;
  bacon: number;
  cheese: number;                    
  meat: number;
  [key: string]: number;
}

interface contactDataProps {
  ingredients: contactDataIngProps
  price: number;
}

interface contactRouterComponent extends RouteComponentProps {

}

class ContactData extends Component<contactRouterComponent> {
  state: = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    totalPrice:0
  }


  orderHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
     this.setState({loading: true})
    //alert('Continue!');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Ernis',
        address: {
          street: 'testStreet1',
          zipCode: '454654',
          country: 'Lithuania'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
      
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false});
      });
  }


  render() {
    let form = (<form >
      <input className={classes.Input} type="text" name="name" placeholder="Your name" />
      <input className={classes.Input} type="email" name="email" placeholder="Your email" />
      <input className={classes.Input} type="text" name="street" placeholder="Postal Code" />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form >);
      
    

  
    
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}


export default ContactData;
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from "react-router-dom";
import Input from '../../../components/UI/Input/Input';
import { type } from 'os';


interface contactDataIngProps {
  salad: number;
  bacon: number;
  cheese: number;                    
  meat: number;
  [key: string]: number;
}

// interface contactDataProps {
//   ingredients: contactDataIngProps
//   price: number;
// }

interface orderFromProps {
  elementType: string;
  elementConfig: {
    type: string;
    placeholder: string;
  },
  value: string;
  [index: string]: {};
}

interface deliveryProps {
  elementType: string;
      elementConfig: {
        options: [
          { value: string; displayValue: string; },
          { value: string; displayValue: string; }
        ]
      },
      value: string;
      [index: string]: {};
}
interface contactStateProps {
  orderForm: {
    name: orderFromProps;
    street: orderFromProps;
    zipCode: orderFromProps;
    country: orderFromProps;
    email: orderFromProps;
    deliveryMethod: deliveryProps;
  },
  loading: boolean;
  totalPrice: number;
}

interface contactRouterComponent extends RouteComponentProps {
  ingredients: contactDataIngProps;
  price: number;
}

class ContactData extends Component<contactRouterComponent> {
  state: contactStateProps= {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },


      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
          
        },
        value: ''
      },
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
    const allInfo = {
      name: {} as orderFromProps,
      street: {} as orderFromProps,
      zipCode: {} as orderFromProps,
      country: {} as orderFromProps,
      email: {} as orderFromProps,
      deliveryMethod: {} as deliveryProps

    }
    let testas: keyof typeof allInfo;
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }


    let form = (<form >
      {formElementsArray.map(formElement => (
        <Input
        
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.elementConfig}
          label=''
        />
      ))}
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
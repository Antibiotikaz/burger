import React, { Component, ChangeEvent } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from "react-router-dom";
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { reducerStateProps } from '../../../store/reducers/burgerBuilder';


interface contactDataIngProps {
  salad: number;
  bacon: number;
  cheese: number;                    
  meat: number;
  [key: string]: number;
}


interface orderFromProps {
  elementType: string;
  elementConfig:contactElementConfigProps
  value: string;
  validation?: validationProps;
  valid?: boolean;
  touched?: boolean;
}

interface contactElementConfigProps {
  type?: string;
  placeholder?: string;
  options?:contactOptions[];
}

export interface validationProps {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

interface contactOptions {
  value: string;
  displayValue: string;
}


interface contactStateProps {
  orderForm: {
    name: orderFromProps;
    street: orderFromProps;
    zipCode: orderFromProps;
    country: orderFromProps;
    email: orderFromProps;
    deliveryMethod: orderFromProps;
  },
  loading: boolean;
  totalPrice: number;
  formIsValid: boolean;
}


interface orderFormProps {
  name: orderFromProps;
    street: orderFromProps;
    zipCode: orderFromProps;
    country: orderFromProps;
    email: orderFromProps;
    deliveryMethod: orderFromProps;
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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },


      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },


      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },


      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },


      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },


      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
          
        },
        
        value: '',
        validation: {},
        valid: true
      }
    },
    loading: false,
    totalPrice: 0,
    formIsValid: false
  }


  orderHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    this.setState({ loading: true })


    
    const keyHelper = {
      name: {} as orderFromProps,
      street: {} as orderFromProps,
      zipCode: {} as orderFromProps,
      country: {} as orderFromProps,
      email: {} as orderFromProps,
      deliveryMethod: {} as orderFromProps

    }
    
    
    type Name = keyof typeof keyHelper;
    let key: Name;
    const formData: { [element: string]: string} = {};
    for (key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }


    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
  
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

  checkValidity(value: string, rules:validationProps | undefined) {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules?.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules?.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }


    return isValid;
      }



 
     inputChangedHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, inputIdentifier: keyof orderFormProps) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.currentTarget.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

 
    const keyHelper2 = {
      name: {} as orderFromProps,
      street: {} as orderFromProps,
      zipCode: {} as orderFromProps,
      country: {} as orderFromProps,
      email: {} as orderFromProps,
      deliveryMethod: {} as orderFromProps

    }
    let formIsValid:boolean|undefined = true;
    type Name = keyof typeof keyHelper2;
    let key2: Name;

    for (key2 in updatedOrderForm) {
      formIsValid = updatedOrderForm[key2].valid && formIsValid
    }
    console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };


  render() {
    const allInfo = {
      name: {} as orderFromProps,
      street: {} as orderFromProps,
      zipCode: {} as orderFromProps,
      country: {} as orderFromProps,
      email: {} as orderFromProps,
      deliveryMethod: {} as orderFromProps

    }
    let testas: keyof typeof allInfo;
    const formElementsArray = [];
    for ( testas in this.state.orderForm) {
      formElementsArray.push({
        id: testas,
        config: this.state.orderForm[testas]
      });
    }


    let form = (<form
        onSubmit={this.orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          label=''
          changed={(event) =>this.inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
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


const mapStateToProps = (state :reducerStateProps) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
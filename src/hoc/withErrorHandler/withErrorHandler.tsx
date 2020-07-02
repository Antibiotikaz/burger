import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../auxiliary/auxiliary';
import { AxiosInstance } from 'axios';



interface errorState {
  error: string;
}





const withErrorHandler = (WrappedComponent:Function, axios: AxiosInstance) => {
  
  

  return class extends Component<errorState> {
    
    
    state = {
      error: "",
    }
    reqInterceptor!: number;
    resInterceptor!: number;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: '' });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });

     
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    


    errorConfirmedHandler = () => {
      this.setState({ error: '' })
     
    }


    render() {
      
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
          {this.state.error !=='' ? true :false }
        </Modal>
        <WrappedComponent {...this.props}/>
      </Aux>
      );
    }
  } 
}



export default withErrorHandler;
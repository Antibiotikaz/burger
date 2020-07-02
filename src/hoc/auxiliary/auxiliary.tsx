import React from 'react';

interface auxProps {
  children: React.ReactNode;
}


const aux: React.FC<auxProps> = props => <>{props.children}</>;


export default aux;
import React from 'react';
import { Container } from 'react-bootstrap';
import AppRoutes from 'AppRoutes';
import { HeaderWrapper } from '@organisms/HeaderWrapper/HeaderWrapper';
import './scss/App.scss';

export default function App() {

  return (
   
      <Container fluid="md">
        <HeaderWrapper />
        <main>
          <AppRoutes />
        </main>
      </Container>
    
  );
}



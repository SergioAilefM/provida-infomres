import React from 'react';
import './scss/App.scss';
import HeaderWrapper from '@organisms/HeaderWrapper';
import { Container } from 'react-bootstrap';
import FooterWrapper from '@organisms/FooterWrapper';
import { IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

type AppProps = {
  pca: IPublicClientApplication;
};

export default function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <Container fluid="md" >
        <HeaderWrapper />
        <main>

        </main>
        <FooterWrapper />
      </Container>
    </MsalProvider>
  );
}



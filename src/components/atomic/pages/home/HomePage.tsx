import React from 'react';
import { HOME_PAGE_LABELS } from '@constants/homePageLabels';
import Container from 'react-bootstrap/Container';

function Home() {
  
    return (
        <Container>
            <h3> {HOME_PAGE_LABELS.NAME} </h3>
        </Container>

    );
};

export default Home;
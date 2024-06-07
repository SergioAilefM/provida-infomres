import React, { useEffect } from 'react';
import { ROLES_PAGE_LABELS } from '@constants/rolesPageLabels';
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics';
import Container from 'react-bootstrap/Container';

const Roles: React.FC  = () => {
    const { registerViewData} = useAdobeAnalytics()
    useEffect(() =>{
        registerViewData('ROLES', 'page')
    }, [])

    return (
        <Container>
            <div> ${ ROLES_PAGE_LABELS.NAME } </div>
        </Container>
    );
};

export default Roles;
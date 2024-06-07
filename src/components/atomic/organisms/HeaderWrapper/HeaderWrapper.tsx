import React from 'react'
import './HeaderWrapper.scss'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import BrandLogo from '@assetsICONS/BrandLogo'


export function HeaderWrapper() {
 

    return (
        <Container>
            <Navbar expand="lg" className="bg-body" >
                <Container>
                    <Navbar.Brand href="/"><BrandLogo /></Navbar.Brand>
                    <Navbar.Toggle />
                 
                </Container>
            </Navbar >
           
                <Navbar expand="lg" className="bg-body-tertiary" >
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <NavDropdown title="Comparativa" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/registro">Registro cambio</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Reportes" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/usuarios">Usuarios - perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/roles">Roles</NavDropdown.Item>
                                    <NavDropdown.Item href="/roles-perfil">Roles - perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/funcionalidades">Funcionalidades</NavDropdown.Item>
                                    <NavDropdown.Item href="/funcionalidades-roles">Funcionalidades - roles</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar >
           
        </Container>
    )
}


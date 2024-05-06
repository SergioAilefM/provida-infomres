import { AuthenticatedTemplate, useAccount, useMsal } from '@azure/msal-react';
import ButtonSignInSignOut from '@molecules/ButtonSeguridad';
import BrandLogo from 'assets/icons/BrandLogo';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const HeaderWrapper = () => {
    const { accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [name, setName] = useState("");

    useEffect(() => {
        //console.log(account);
        if (account && account.name) {
            //setName(account.name.split(" ")[0]);
            setName(account.name);
        } else {
            setName("");
        }
        //console.log(account?.username);
    }, [account]);

    return (
        <Container>
            <Navbar expand="lg" className="bg-body" >
                <Container>
                    <Navbar.Brand href="#home"><BrandLogo /></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <ButtonSignInSignOut />
                            <AuthenticatedTemplate>
                                Usuario : <a href="#login">{name}</a>
                            </AuthenticatedTemplate>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <AuthenticatedTemplate>
                <Navbar expand="lg" className="bg-body-tertiary" >
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <NavDropdown title="Comparativa" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Registro cambio</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Reportes" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Usuarios - perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Roles</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Roles - perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Funcionalidades</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Funcionalidades - roles</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar >
            </AuthenticatedTemplate>
        </Container>
    );
}


export default HeaderWrapper
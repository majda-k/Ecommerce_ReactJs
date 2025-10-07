import { Badge, Container, Navbar, Nav } from "react-bootstrap";
import styles from "./styles.module.css";
import HeaderBascket from "../../ecommerce/HeaderBascket/HeaderBascket";
import { NavLink } from "react-router-dom";





export default function Header() {
    const { headerContainer, headerLogo } = styles;
    return (
        <header >
            <div className={headerContainer}>
                <h1 className={headerLogo} >Our <Badge bg="info">Ecom</Badge></h1>

                <HeaderBascket />

            </div>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/" ></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
                        {/* <Nav.Link as={NavLink} to="products">Products</Nav.Link> */}
                        <Nav.Link as={NavLink} to="about-us">About-Us</Nav.Link>
                    </Nav>

                    <Nav >
                        <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="register">Register</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>


        </header>
    )
} 
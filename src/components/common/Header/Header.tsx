import { Badge, Container, Navbar, Nav } from "react-bootstrap";
import styles from "./styles.module.css";
import HeaderBascket from "../../ecommerce/HeaderBascket/HeaderBascket";
import { NavLink } from "react-router-dom";
import HeaderWishList from "@components/ecommerce/HeaderWishList/HeaderWishList";
import { NavDropdown } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actAuthLogout } from "@store/auth/authSlice";
import actGetWishList from "@store/wishLIst/act/actGetWishList";
import { useEffect } from "react";



export default function Header() {

    const dispatch = useAppDispatch();

    const { user, accessToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if(accessToken){
        dispatch(actGetWishList("ProductIds"));
        }
    }, [dispatch , accessToken]);



    const { headerContainer, headerLogo, HeaderWishListContainer } = styles;


    return (
        <header >
            <div className={headerContainer}>
                <h1 className={headerLogo} >Our <Badge bg="info">eCom</Badge></h1>

                <div className={HeaderWishListContainer}>
                    <HeaderWishList />
                    |
                    <HeaderBascket />
                </div>


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

                    {!accessToken ? <>
                        <Nav >
                        <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="register">Register</Nav.Link>

                    </Nav>
                        
                    </> : <>
                    <Nav>
                        <NavDropdown title={`Welcome : ${user?.firstName} ${user?.lastName} `} id="basic-nav-dropdown">
                            <NavDropdown.Item  as={NavLink} to="profile" end>Account</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="profile/orders">Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => dispatch(actAuthLogout())}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </>}
                   


                    
                </Container>
            </Navbar>


        </header>
    )
} 
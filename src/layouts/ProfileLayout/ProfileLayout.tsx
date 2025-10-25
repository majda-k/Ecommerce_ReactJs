import {Col , ListGroup, Row  } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ProfileLayout() {
    return (
        <Row>
            <Col md={3} >
            <ListGroup>
            <ListGroup.Item as={NavLink} to="/profile" end>Account Info</ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/profile/orders">Orders</ListGroup.Item>
            </ListGroup>
            </Col>
            <Col><Outlet /></Col>
        </Row>
        
    )
}
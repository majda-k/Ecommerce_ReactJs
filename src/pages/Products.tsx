
import Product from "@components/ecommerce/Product/product";
import { Col, Container, Row } from "react-bootstrap";

export default function Products() {
    return (
        <Container>
            <Row>
                <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Product />
                </Col>

                <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Product />
                </Col>

                <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
                        <Product />
                </Col>

                <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Product />
                </Col>

                <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Product />
                </Col>

                <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
                    <Product />
                </Col>
            </Row>
        </Container>

    )
}
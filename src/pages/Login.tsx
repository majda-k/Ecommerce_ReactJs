import { Col, Form } from "react-bootstrap";

import { Row, Button } from "react-bootstrap";


export default function Login() {
    return (
        <>
        <h3>User Login</h3>

        <Row>
        <Col md={{span:6 , offset:3}}>
        <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email"  />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  />
      </Form.Group>
   
      <Button type="submit" variant="info" style={{color:'white'}}>Submit</Button>
    </Form>
        </Col>
        </Row>

    
        </>
    )
}
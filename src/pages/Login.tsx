import { Alert, Col, Form, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { Row, Button } from "react-bootstrap";
import useLogin from "@hooks/useLogin";



export default function Login() {
  const {register , handleSubmit , formState: {errors} , submitHandler , loading , error , accessToken , searchParams , setSearchParams , navigate , dispatch , showModal , setShowModal} = useLogin();

if(accessToken){
  return <Navigate to="/" />;
}

    return (
        <>
        <h3>User Login</h3>

        <Row>
        <Col md={{span:6 , offset:3}}>
        {(searchParams.get("message") === "account created successfully") && <Alert variant="success">Your account Created Successfully , Please Login</Alert>}
        <Form onSubmit={handleSubmit(submitHandler)}>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" {...register("email")} isInvalid={errors.email?.message ? true : false} />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" {...register("password")} isInvalid={errors.password?.message ? true : false} />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>
   
      <Button type="submit" variant="info" style={{color:'white'}}>Submit</Button>
      <>{loading === "pending" && <Spinner animation="border" size="sm" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
      </>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Form>
        </Col>
        </Row>

    
        </>
    )
}
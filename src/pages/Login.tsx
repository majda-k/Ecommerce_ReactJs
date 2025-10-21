import { zodResolver } from "@hookform/resolvers/zod";
import { type TLoginForm, zodSchema } from "@validations/schemaLogin";
import { Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Row, Button } from "react-bootstrap";


export default function Login() {

const {register , handleSubmit , formState: {errors}} = useForm<TLoginForm>({
  mode : "onBlur",
  resolver: zodResolver(zodSchema),
});

const submitHandler = (data: TLoginForm) => {
  console.log(data);
}

    return (
        <>
        <h3>User Login</h3>

        <Row>
        <Col md={{span:6 , offset:3}}>
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
    </Form>
        </Col>
        </Row>

    
        </>
    )
}
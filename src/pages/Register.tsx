import { useForm, type SubmitHandler } from "react-hook-form"

import { Col, Form, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";




const zodSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((input) => input.password === input.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});


type TRegisteForm = z.infer<typeof zodSchema>;



export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<TRegisteForm>({
        mode: "onBlur",
        resolver: zodResolver(zodSchema),
    });

    const submitHandler: SubmitHandler<TRegisteForm> = (data: TRegisteForm) => {
        console.log(data);
    }


    return (
        <>
            <h3>User Registeration</h3>

            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" {...register("firstName")}  isInvalid={errors.firstName?.message ? true : false}/>
                            <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" {...register("lastName")}  isInvalid={errors.lastName?.message ? true : false}/>
                            <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" {...register("email")}  isInvalid={errors.email?.message ? true : false}/>
                            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" {...register("password")}  isInvalid={errors.password?.message ? true : false}/>
                            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" {...register("confirmPassword")}  isInvalid={errors.confirmPassword?.message ? true : false}/>
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="info" style={{ color: 'white' }}>Submit</Button>
                    </Form>
                </Col>
            </Row>


        </>
    )
}
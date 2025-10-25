
import { Col, Form, FormText, Row, Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navigate} from "react-router-dom";
import useRegister from "@hooks/useRegister";





export default function Register() {
    const {register , handleSubmit , formState: {errors} , submitHandler , checkEmailAvailabilityStatus , accessToken , emailOnBlurHandler , loading , error ,
     enteredEmail , checkEmailAvailability, resetCheckEmailAvailability} = useRegister();

        if(accessToken){
            return <Navigate to="/" />;
          }

    return (
        <>
            <h3>User Registeration</h3>

            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit(submitHandler)}  >
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" {...register("firstName")} isInvalid={errors.firstName?.message ? true : false} />
                            <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" {...register("lastName")} isInvalid={errors.lastName?.message ? true : false} />
                            <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                {...register("email")}
                                isInvalid={errors.email?.message ? true : false || checkEmailAvailabilityStatus === "notAvailable"}
                                isValid={checkEmailAvailabilityStatus === "available"}
                                onBlur={emailOnBlurHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message || (checkEmailAvailabilityStatus === "notAvailable" ? "Email is already in use" : "")}
                            </Form.Control.Feedback>
                            {checkEmailAvailabilityStatus === "available" && (
                                <Form.Control.Feedback type="valid">Email is available</Form.Control.Feedback>

                            )}
                            {checkEmailAvailabilityStatus === "checking" && (
                                <FormText>Checking email availability</FormText>
                            )}
                            {/* <details>
                                <summary>Debug</summary>
                                <pre>
                                {checkEmailAvailabilityStatus}
                                </pre>
                            </details> */}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" {...register("password")} isInvalid={errors.password?.message ? true : false} />
                            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" {...register("confirmPassword")} isInvalid={errors.confirmPassword?.message ? true : false} />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="info" style={{ color: 'white' }} disabled={checkEmailAvailabilityStatus === "checking" ? true : false || loading === "pending" ? true : false}>Submit</Button>
                        <>{loading === "pending" && <Spinner animation="border" size="sm" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                        </>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </Form>

                </Col>
            </Row>


        </>
    )
}

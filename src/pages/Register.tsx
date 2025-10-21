import { useForm, type SubmitHandler } from "react-hook-form"
import { Col, Form, FormText, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TRegisterForm, zodSchema } from "@validations/schemaRegister";
import useCheckEmailAvailability from "@hooks/UseCheckEmailAvailability";




export default function Register() {
    const { register, handleSubmit, formState: { errors }, trigger, getFieldState } = useForm<TRegisterForm>({
        mode: "onBlur",
        resolver: zodResolver(zodSchema),
    });

    const submitHandler: SubmitHandler<TRegisterForm> = (data: TRegisterForm) => {
        console.log(data);
    }

    const { checkEmailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability } = useCheckEmailAvailability();

    const emailOnBlurHandler =
        async (e: React.FocusEvent<HTMLInputElement>) => {
            await trigger("email");
            const value = e.target.value;
            const { isDirty, invalid } = getFieldState("email")
            if (isDirty && !invalid && enteredEmail !== value) {
                checkEmailAvailability(value);

            }

            if (isDirty && !invalid && enteredEmail) {
                resetCheckEmailAvailability();
            };

        };

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
                        <Button type="submit" variant="info" style={{ color: 'white' }} disabled={checkEmailAvailabilityStatus === "checking" ? true : false}>Submit</Button>
                    </Form>
                </Col>
            </Row>


        </>
    )
}

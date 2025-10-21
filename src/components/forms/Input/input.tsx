import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Form, FormText } from "react-bootstrap";

type TInputProps<TFieldValue extends FieldValues> = {
    label: string;
    type?: string;
    name: Path<TFieldValue>;
    register: UseFormRegister<TFieldValue>;
    errors?: string | undefined;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    formText?: string | undefined;
    succes?: string | undefined;
}


const Input = <TFieldValue extends FieldValues>({ label, type = "text", name, register, errors, onBlur, formText, succes }: TInputProps<TFieldValue>) => {
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e);
        } else {
            register(name).onBlur(e);
        }
    };



    return (
        <Form.Group className="mb-3" >
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} {...register(name)} isInvalid={errors ? true : false} onBlur={onBlurHandler} />
            <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">{succes}</Form.Control.Feedback>
            {formText && <FormText>{formText}</FormText>}
        </Form.Group>
    )
}

export default Input;
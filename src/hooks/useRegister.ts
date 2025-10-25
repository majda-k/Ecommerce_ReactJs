import { zodResolver } from "@hookform/resolvers/zod";
import { type TRegisterForm, zodSchema } from "@validations/schemaRegister";
import useCheckEmailAvailability from "@hooks/UseCheckEmailAvailability";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@store/hooks";
import actAuthRegister , { type TformDataType as TformDataType } from "@store/auth/act/actAuthRegister";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

export default function useRegister() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error , accessToken } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, trigger, getFieldState } = useForm<TRegisterForm>({
        mode: "onBlur",
        resolver: zodResolver(zodSchema),
    });

    const submitHandler: SubmitHandler<TRegisterForm> = async(data) => {
       const {firstName , lastName , email , password} = data; 
       await dispatch(actAuthRegister({firstName , lastName , email , password} )).unwrap().then(() => {
        navigate("/login?message=account created successfully");
       })
    }

    const { checkEmailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability } = useCheckEmailAvailability();

    const emailOnBlurHandler =
        async (e: React.FocusEvent<HTMLInputElement>) => {
            await trigger("email");
            const value = e.target.value;
            const { isDirty, invalid } = getFieldState("email")
            if (isDirty && !invalid && enteredEmail !== value) {
                checkEmailAvailability(value);
                // const {firstName , lastName , email , password} = data;
                // dispatch(actAuthRegister({firstName , lastName , email , password}));

            }

            if (isDirty && !invalid && enteredEmail) {
                resetCheckEmailAvailability();
            };

        };

    return {
        register,
        handleSubmit,
        formState: { errors },
        submitHandler,
        checkEmailAvailabilityStatus,
        enteredEmail,
        checkEmailAvailability,
        resetCheckEmailAvailability,
        emailOnBlurHandler,
        loading,
        error,
        accessToken,
    }
 }
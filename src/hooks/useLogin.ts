
import actAuthLogin, { type TFormData } from "@store/auth/act/actAuthLogin";
import {useAppSelector} from "@store/hooks";
import { resetUi } from "@store/auth/authSlice";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TLoginForm, zodSchema } from "@validations/schemaLogin";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function useLogin() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
 
   const {loading , error , accessToken} = useAppSelector((state) => state.auth);
   const [searchParams , setSearchParams] = useSearchParams();
   const [showModal , setShowModal] = useState(false);
   const {register , handleSubmit , formState: {errors}} = useForm<TLoginForm>({
      mode : "onBlur",
      resolver: zodResolver(zodSchema),
    });
    
    const submitHandler: SubmitHandler<TLoginForm> = async(data) => {
      if(searchParams.get("message") === "account created successfully" ){
        setSearchParams({message: ""});
      }
      if(searchParams.get("message") === "please login to access this page"){
        setSearchParams({message: ""});
      //   return <Alert variant="danger">Please login to access this page</Alert>;
      }
      await dispatch(actAuthLogin(data)).unwrap().then(()=> navigate("/"));
    }
    
    
        useEffect(() => {
          return () => {
            dispatch(resetUi());
          }
        }, [dispatch]);
 
   return {
      register , handleSubmit , errors , submitHandler , searchParams , setSearchParams , navigate , dispatch , accessToken , loading , error , showModal , setShowModal , formState: {errors} ,

    
   }
}
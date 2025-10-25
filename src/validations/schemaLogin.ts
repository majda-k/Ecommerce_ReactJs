import { z } from "zod";


const zodSchema = z.object({
   
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password is required" }),
 
});


export type TLoginForm = z.infer<typeof zodSchema>;

export { zodSchema , zodSchema as TLoginForm };
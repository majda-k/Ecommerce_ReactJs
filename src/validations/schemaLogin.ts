import { z } from "zod";


const zodSchema = z.object({
   
    email: z.string().email({ message: "Invalid email address" }).email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
 
});


export type TLoginForm = z.infer<typeof zodSchema>;

export { zodSchema , zodSchema as TLoginForm };
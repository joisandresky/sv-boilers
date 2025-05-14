import { z } from "zod";
 
export const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
  password_confirmation: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ['password_confirmation'],
  });
 
export type RegisterFormSchema = typeof formSchema;
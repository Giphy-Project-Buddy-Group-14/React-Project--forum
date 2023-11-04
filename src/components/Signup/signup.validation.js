import { getUserByEmail, getUserByUsername } from "@/services/users.services.js"
import * as z from "zod"

export const SignupValidation = z.object({
    firstName: z.string().min(4, { message: 'Min length should be 4 symbols' }).max(32, { message: 'Max length should be 32 symbols' }),
    lastName: z.string().min(4, { message: 'Min length should be 4 symbols' }).max(32, { message: 'Max length should be 32 symbols' }),
    username: z.string().min(2, { message: 'Min length should be 2 symbols' }).refine(async (value) => !(await getUserByUsername(value)).val(), { message: 'This username already exists' }),
    email: z.string().email().refine(async (email) => {
        console.log(email);
        return !((await getUserByEmail(email)).val())}, { message: 'Email already exists'}, ),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
})
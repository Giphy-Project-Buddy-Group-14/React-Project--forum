import * as z from "zod"

export const SignupValidation = z.object({
    firstName: z.string().min(4, { message: 'Min length should be 4 symbols' }).max(32, { message: 'Max length should be 32 symbols' }),
    lastName: z.string().min(4, { message: 'Min length should be 4 symbols' }).max(32, { message: 'Max length should be 32 symbols' }),
    username: z.string().min(2, { message: 'Min length should be 2 symbols' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
})
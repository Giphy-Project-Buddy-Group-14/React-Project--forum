import { getUserByEmail } from "@/services/users.services.js";
import { z } from "zod";

export const AccountSettingsValidation = z.object({
    email: z.string().email().refine(async (email) => {
        return !((await getUserByEmail(email)).val())}, { message: 'Email already exists'}, ),
    password: z.string().optional().refine((password) => {
        return !password || password.length >= 8;
    },{ message: 'Password must be at least 8 characters.' })
})
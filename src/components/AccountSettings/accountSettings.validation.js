import { getUserByEmail } from "@/services/users.services.js";
import { z } from "zod";

export const AccountSettingsValidation = z.object({
    email: z.string().email().refine(async (email) => {
        return !((await getUserByEmail(email)).val())}, { message: 'Email already exists'}, ),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
})
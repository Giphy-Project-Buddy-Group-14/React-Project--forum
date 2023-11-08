import { useState, useContext } from 'react'
import { EmailAuthProvider, getAuth, updateCurrentUser, updatePassword } from 'firebase/auth';
import { updateEmail, reauthenticateWithCredential } from 'firebase/auth';
import { AuthContext } from '@/context/AuthContext.jsx';
import { getAllUsers, updateProfileEmail } from '@/services/users.services.js';
import { Button } from '../ui/button.jsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form.jsx';
import { Input } from '../ui/input.jsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingsValidation } from './accountSettings.validation.js';
import { Separator } from '../ui/separator.jsx';
import { useToast } from '../ui/use-toast.js';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';

export default function AccountSettings() {

    // const [email, setEmail] = useState("");
    // const [emailError, setEmailError] = useState("");
    const { isLoggedInUser, user, userData, setUser } = useContext(AuthContext);
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(AccountSettingsValidation),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: "onChange",
    })

    /**
     * Handles the email change process.
     * @async
     */
    const changeEmail = async (email) => {
        const password = prompt(
          "Please enter your password to confirm email change:"
        );
        if (password) {
          const credentials = EmailAuthProvider.credential(
            userData.email,
            password
          );
          try {
            await reauthenticateWithCredential(user, credentials);
            if (email) {
              await updateEmail(user, email);
              alert("Congratulations! You successfully changed your email!");
              const allUsers = await getAllUsers();
              setUser((prev) => ({ ...prev, allUsers }));
              await updateProfileEmail(email, userData.username);
            //   setEmail("");
            //   setEmailError("");
            }
          } catch (error) {
            // setEmailError("Invalid email or password! Please try again.");
            console.error(error);
          }
        }
      };

    const resetEmailState = () => {
        // setEmail("");
        // setEmailError("");
    };

    const handleEmailError = (error) => {
        // setEmailError("Invalid email or password! Please try again.");
        console.error(error);
    };

    const onSubmit = async (data) => {
        try {
            if (data.email && (data.email !== userData.email)) {
                await changeEmail(data.email);
                toast({
                    title: 'You have updated your email successfully',
                })
            }

            if (data.password) {
                await updatePassword(user, data.password);
                toast({
                    title: 'You have updated your password successfully',
                })

            }

        } catch (error) {
            toast({
                title: 'Error updating your details',
                description: error.message
            })
        }
    }


    return (
        <ContentWrapper>
            <div className="space-y-6 shad-form-light_label mt-100">
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        You can update your email and password here. This is how others will see you on the site.
                    </p>
                </div>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='shad-form-light_label'>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Type new email' className='shad-input-light' {...field} />
                                </FormControl>
                                <FormDescription className='shad-textarea-light'>
                                    Enter a valid unique email.
                                </FormDescription>
                                <FormMessage className='shad-form-light_message' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='shad-form-light_label'>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type new password" type="password" className='shad-input-light' {...field} />
                                </FormControl>
                                <FormDescription className='shad-textarea-light'>
                                    Change your password. Min 8 characters long.
                                </FormDescription>
                                <FormMessage className='shad-form-light_message' />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Update profile</Button>
                </form>
            </Form>
        </ContentWrapper>
    )
}

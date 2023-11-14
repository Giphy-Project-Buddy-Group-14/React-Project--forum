import { useContext, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { EmailAuthProvider, updatePassword, verifyBeforeUpdateEmail } from 'firebase/auth';
import { reauthenticateWithCredential } from 'firebase/auth';
import { AuthContext } from '@/context/AuthContext.jsx';
import { updateProfileEmail, updateProfilePic } from '@/services/users.services.js';
import { Button } from '../ui/button.jsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form.jsx';
import { Input } from '../ui/input.jsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSettingsValidation } from './accountSettings.validation.js';
import { Separator } from '../ui/separator.jsx';
import { useToast } from '../ui/use-toast.js';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';
import { logoutUser } from '@/services/auth.services.js';

export default function AccountSettings() {

    const { user, userData, setUser } = useContext(AuthContext);
    const { toast } = useToast();
    const [picture, setPicture] = useState();

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
                    await verifyBeforeUpdateEmail(user, email);
                    await updateProfileEmail(email, userData.username);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            if (data.email && (data.email !== userData.email)) {
                await changeEmail(data.email);
                await logoutUser();
                setUser({user: null, userData: {}});
                toast({
                    title: 'You have successfully requested email change',
                    description: 'To finalize the change, verify your email by clicking on the link we sent to your new email address. You are now logged out.'
                });
            }

            if (data.password) {
                await updatePassword(user, data.password);
                toast({
                    title: 'You have updated your password successfully',
                });

            }

        } catch (error) {
            toast({
                title: 'Error updating your details',
                description: error.message
            });
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        try {
            const data = await updateProfilePic(file, userData.username);
            setPicture(data);
            toast({
                title: 'Successfully uploaded profile picture'
            });
        } catch (error) {
            toast({
                title: error.message
            });
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
                <div className="col-span-full mt-10">
                    <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        {!userData?.profilePictureURL && !picture ? (
                            <UserCircleIcon
                                className="h-12 w-12 text-gray-300"
                            />
                        ) : (
                            <img src={picture || userData.profilePictureURL} alt="profile-img" style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} />
                        )}
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            Change
                        </button>
                    </div>
                </div>
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
                                    Enter a valid unique email. To change your email, we will send you an email with verification link. After confirmation the change will take effect.
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
        </ContentWrapper >
    );
}

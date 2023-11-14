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
import { useToast } from '../ui/use-toast.js';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';
import { logoutUser } from '@/services/auth.services.js';
import { updateProfileFirstName, updateProfileLastName } from '@/services/users.services.js';

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
                setUser({ user: null, userData: {} })

                toast({
                    title: 'You have successfully requested email change',
                    description: 'To finalize the change, verify your email by clicking on the link we sent to your new email address. You are now logged out.'
                })
            }

            if (data.password) {
                await updatePassword(user, data.password);
                toast({
                    title: 'You have updated your password successfully',
                })
            }

            if (data.firstName) {
                await updateProfileFirstName(data.firstName, user);
                toast({
                    title: 'You have updated your first name successfully',
                })
            }

            if (data.lastName) {
                await updateProfileLastName(data.lastName, user);
                toast({
                    title: 'You have updated your last name successfully',
                })
            }

        } catch (error) {
            toast({
                title: 'Error updating your details',
                description: error.message
            })
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        try {
            const data = await updateProfilePic(file, userData.username);
            setPicture(data);
            toast({
                title: 'Successfully uploaded profile picture'
            })
        } catch (error) {
            toast({
                title: error.message
            })
        }
    }


    return (
        <div id="profile">
            <ContentWrapper>
                <h1 className='h1-semibold mb-5 mt-8 text-white'>Profile</h1>

                <div className='rounded-2xl bg-white shadow-sm bg-opacity-70 backdrop-blur-md overflow-hidden'>
                    <p className='text-lg font-medium text-white px-6 py-4 bg-slate-600'>
                        You can update your email and password here. This is how others will see you on the site.
                    </p>

                    <div className="p-6">
                        <Form {...form}>
                            <div className='flex'>
                                <div className='flex flex-col items-center mr-10'>
                                    <label htmlFor="photo">&nbsp;</label>
                                    <div className="mt-2">
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
                                            className="rounded-md mt-2 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={() => document.getElementById('fileInput').click()}
                                        >
                                            edit
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
                                                <FormDescription>
                                                    Enter a valid unique email. To change your email, we will send you an email with verification link. After confirmation the change will take effect.
                                                </FormDescription>
                                                <FormMessage />
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
                                                <FormDescription>
                                                    Change your password. Min 8 characters long.
                                                </FormDescription>
                                                <FormMessage className='shad-form-light_message' />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='shad-form-light_label'>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Type new First Name" type="text" className='shad-input-light' {...field} />
                                                </FormControl>
                                                <FormMessage className='shad-form-light_message' />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='shad-form-light_label'>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Type new Last Name" type="text" className='shad-input-light' {...field} />
                                                </FormControl>
                                                <FormMessage className='shad-form-light_message' />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit">Update profile</Button>
                                </form>
                            </div>
                        </Form>
                    </div>
                </div>

            </ContentWrapper>
        </div >
    )
}

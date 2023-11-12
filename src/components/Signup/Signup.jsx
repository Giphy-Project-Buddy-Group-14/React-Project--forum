import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupValidation } from './signup.validation.js'
import { registerUser } from '@/services/auth.services.js';
import { createUserUsername } from '@/services/users.services.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from '../Loader/Loader.jsx';
import { Button } from '../ui/button.jsx';
import { Link, useNavigate } from "react-router-dom"
import { useToast } from '../ui/use-toast.js';
import { AuthContext } from '@/context/AuthContext.jsx';

export default function Signup() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await registerUser(values.email, values.password);
      await createUserUsername(values.username, response.user.uid, response.user.email, values.firstName, values.lastName);
      setUser({ user: response });
      toast({
        title: "Your account was created successfully"
      });
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      toast({
        title: "Error creating your Account",
        description: error.message
      });
    } finally {
      setLoading(false);  
    }
  }


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <Link to='/'>
          <img src="src/assets/logo.png" alt="logo" width={60} height={60} />
        </Link>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 shad-form_label">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Forum, please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">First name</FormLabel>
                <FormControl>
                  <Input type="text" placeHolder="Type your first name"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Last name</FormLabel>
                <FormControl>
                  <Input type="text" placeHolder="Type your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" placeHolder="Type your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeHolder="Type your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeHolder="Type your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {loading ? (
              <div className="flex-center gap-2 shad-form_label" >
                <Loader />  ...Loading
              </div>
            ) : "Sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

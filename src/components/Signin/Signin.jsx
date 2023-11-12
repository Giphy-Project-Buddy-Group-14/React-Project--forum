import React, { useContext, useState } from 'react'
import { useToast } from '../ui/use-toast.js'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninValidation } from './signin.validation.js';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form.jsx';
import { Input } from '../ui/input.jsx';
import { Button } from '../ui/button.jsx';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import { AuthContext } from '@/context/AuthContext.jsx';
import { loginUser } from '@/services/auth.services.js';

export default function Signin() {

  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser, isLoggedIn } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const handleSignin = async (user) => {
    try {
      setLoading(true);
      const result = await loginUser(user.email, user.password);

      setUser({
        user: result
      });

      toast({
        title: "Successful log in",
      });

      setTimeout(() => {
        navigate('/home');
      }, 500);

    } catch (error) {
      toast({
        title: "Error log in",
        description: error.message,
      })
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <Link to='/'>
          <img src="src/assets/logo.png" alt="logo" width={60} height={60} />
        </Link>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Type your email" {...field} />
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
                  <Input type="password" placeholder="Type your password"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {loading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

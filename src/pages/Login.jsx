import React from 'react';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';

const Login = () => {
    return (
        <div className="container container-fluid mx-auto w-full h-screen flex justify-center items-center">
            <Card color="transparent" shadow={false}>
                <div className='bg-gray-800 border rounded-lg p-4'>
                    <Typography variant="h4" color="blue-gray" className='text-center text-white'>
                        Sign In
                    </Typography>
                </div>
                <Typography color="gray" className="mt-1 font-normal text-center">
                    Hello Agaaain! Enter your details to Login.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Button className="mt-6" fullWidth>
                        sign in
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Do not have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign Up
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default Login;
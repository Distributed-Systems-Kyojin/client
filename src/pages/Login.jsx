import React, { useRef, useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Spinner } from '@material-tailwind/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../services/api';

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);
    
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!email || !pwd) {
            setErrMsg('Please fill in all fields');
            setIsSubmitted(false);
            return;
        }

        try {
            const payload = {
                email,
                password: pwd
            };
            const response = await axios.post('/auth/login', payload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            // console.log(response.data.accessToken);
            setAuth(response.data);
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (error) {
            setErrMsg(error?.response?.data.error.message);
        } finally {
            setIsSubmitted(false);
        }
    }

    return (
        <div className="container container-fluid mx-auto w-full h-screen flex justify-center items-center">
            <Card color="transparent" shadow={false}>
                <div className='bg-gray-800 border rounded-lg p-4'>
                    <Typography variant="h4" color="blue-gray" className='text-center text-white'>
                        Sign In
                    </Typography>
                </div>
                <p ref={errRef} className={errMsg ? "flex text-red-500 mt-4" : "hidden"} aria-live='assertive'>{errMsg}</p>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                            type='text'
                            id='email'
                            ref={emailRef}
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                            id='password'
                            value={pwd}
                            required
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    <Button 
                        className="mt-6 flex justify-center" 
                        fullWidth
                        disabled={isSubmitted}
                        onClick={handleSubmit}
                    >
                        {isSubmitted ? <Spinner size="sm" color="gray" /> : "Sign in"}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Do not have an account?{" "}
                        <Link to="/register" className="font-medium text-gray-900">
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default Login;
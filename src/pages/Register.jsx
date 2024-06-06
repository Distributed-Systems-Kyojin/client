import React, { useRef, useState, useEffect } from 'react';
import { Card, Input, Checkbox, Button, Typography, Spinner } from '@material-tailwind/react';
import { CheckCircleIcon, InformationCircleIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import axios from '../services/api';

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const Register = () => {

    // related to validation
    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // set the focus on the username when the component loads
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    // validate the username input everytime the username changes
    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    // validate the email input everytime the email changes
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    // validate the password and confirmPassword inputs everytime one of them changes
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword]);

    // reset the error message when the user changes something
    useEffect(() => {
        setErrMsg('');
    }, [username, email, password, confirmPassword]);

    // related to form submission
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // validate the submitted information again to be cautious
        const v1 = USERNAME_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        const v4 = password === confirmPassword;
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg('Please check your information again.');
            setIsSubmitted(false);
            return;
        }

        try {
            const payload = {
                username,
                email,
                password
            }
            const response = await axios.post('/auth/register', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            setErrMsg(error.response.data.error.message);
        } finally {
            setIsSubmitted(false);
        }
    }
    
    return (
        <>
            {success ? (
                <div className="h-screen w-full bg-background m-0 p-0 flex items-center">
                    <div className="container container-fluid border-0 shadow-lg rounded-lg mx-auto w-2/3 h-1/3 text-center bg-white flex flex-col items-center">
                        <Typography variant="h2" color="blue-gray" className="text-center mt-8">
                            Success!
                        </Typography>
                        <CheckIcon className="h-12 w-12 text-green-500 mt-8" />
                        <Typography variant="h4" color="blue-gray" className="text-center mt-8">
                            You have successfully registered.
                        </Typography>
                        <Link to="/login" className='my-4 flex items-center'>
                            Sign In
                            <ArrowRightIcon className="h-4 w-4 inline-block ml-2" />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="container container-fluid mx-auto w-full h-screen flex justify-center items-center">
                    <Card color="transparent" shadow={false}>
                        <div className='bg-gray-800 border rounded-lg p-4'>
                            <Typography variant="h4" color="blue-gray" className='text-center text-white'>
                                Sign Up
                            </Typography>
                        </div>
                        <p ref={errRef} className={errMsg ? "flex text-red-500 mt-4" : "hidden"} aria-live='assertive'>{errMsg}</p>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Username
                                    {validUsername ? <span>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 inline-block ml-2" />
                                    </span> : null}
                                    {validUsername || !username ? null : <span>
                                        <InformationCircleIcon className="h-5 w-5 text-red-500 inline-block ml-2" />
                                    </span>}
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="example123"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                    className: "before:content-none after:content-none",
                                    }}
                                    type='text'
                                    id='username'
                                    ref={usernameRef}
                                    value={username}
                                    autoComplete='off'
                                    required
                                    aria-invalid={validUsername ? 'false' : 'true'}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <p id='uidnote' className={usernameFocus && username && !validUsername ? "flex text-red-500" : "hidden"}>
                                    4 to 24 characters.
                                    Must begin with a letter.
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Email
                                    {validEmail ? <span>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 inline-block ml-2" />
                                    </span> : null}
                                    {validEmail || !email ? null : <span>
                                        <InformationCircleIcon className="h-5 w-5 text-red-500 inline-block ml-2" />
                                    </span>}
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                    className: "before:content-none after:content-none",
                                    }}
                                    type='email'
                                    id='email'
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? 'false' : 'true'}
                                    aria-describedby='emailnote'
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p id='emailnote' className={emailFocus && email && !validEmail ? "flex text-red-500" : "hidden"}>
                                    Must be a valid email address.
                                </p>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Password
                                    {validPassword ? <span>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 inline-block ml-2" />
                                    </span> : null}
                                    {validPassword || !password ? null : <span>
                                        <InformationCircleIcon className="h-5 w-5 text-red-500 inline-block ml-2" />
                                    </span>}
                                </Typography>
                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                    className: "before:content-none after:content-none",
                                    }}
                                    id='password'
                                    value={password}
                                    required
                                    aria-invalid={validPassword ? 'false' : 'true'}
                                    aria-describedby='pwdnote'
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div id='pwdnote' className={passwordFocus && password && !validPassword ? "flex flex-col text-red-500" : "hidden"}>
                                    8 to 24 characters. At least one uppercase letter, one lowercase letter, one number, one special character.
                                    Allowed special characters: 
                                    <div>
                                        <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span>
                                        <span aria-label='hashtag'>#</span>
                                        <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
                                    </div>
                                </div>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Confirm Password
                                    {validConfirmPassword && confirmPassword ? <span>
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 inline-block ml-2" />
                                    </span> : null}
                                    {validConfirmPassword || !confirmPassword ? null : <span>
                                        <InformationCircleIcon className="h-5 w-5 text-red-500 inline-block ml-2" />
                                    </span>}
                                </Typography>
                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                    className: "before:content-none after:content-none",
                                    }}
                                    id='confirmPassword'
                                    value={confirmPassword}
                                    required
                                    aria-invalid={validConfirmPassword ? 'false' : 'true'}
                                    aria-describedby='confirmpwdnote'
                                    onFocus={() => setConfirmPasswordFocus(true)}
                                    onBlur={() => setConfirmPasswordFocus(false)}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <p id='confirmpwdnote' className={confirmPasswordFocus && confirmPassword && !validConfirmPassword ? "flex text-red-500" : "hidden"}>
                                    Must match the password.
                                </p>
                            </div>
                            <Checkbox
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <a href="#" className="font-medium transition-colors hover:text-gray-900" > &nbsp;Terms and Conditions </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                            />
                            <Button 
                                className="mt-6" 
                                fullWidth
                                disabled={!validUsername || !validEmail || !validPassword || !validConfirmPassword}
                                onClick={handleSubmit}
                            >
                                {isSubmitted ? <Spinner size="sm" color="gray" /> : "Sign up"}
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-gray-900">
                                    Sign in
                                </Link>
                            </Typography>
                        </form>
                    </Card>
                </div>
            )}
        </>
    );
}

export default Register;
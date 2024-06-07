import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody, Typography, Button } from '@material-tailwind/react';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import useLogout from '../hooks/useLogout';
// toastify
import { toast } from 'react-toastify';

const LogoutDialog = ({ logoutOpen, handleLogoutDialog }) => {

    const navigate = useNavigate();
    const logout = useLogout();

    const signout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            toast.error(error?.response?.data?.error.message);
            if (error?.response?.data?.error.status === 403) {
                navigate('/login', { state: { from: location.pathname }, replace: true });
                return;
            }
        }
    }

    return (
        <Dialog open={logoutOpen} handler={handleLogoutDialog}>
            <DialogBody className="grid place-items-center gap-4 p-8 mt-4">
                <BellAlertIcon className="h-10 w-10 text-red-500" />
                <Typography color="red" variant="h4">
                    Confirm to Proceed
                </Typography>
            </DialogBody>
            <div className="flex justify-center space-x-2 p-4 mb-4">
                <Button variant="text" color="blue-gray" onClick={handleLogoutDialog}>
                    close
                </Button>
                <Button variant="gradient" onClick={signout}>
                    Ok, Got it
                </Button>
            </div>
        </Dialog>
    );
}

export default LogoutDialog;
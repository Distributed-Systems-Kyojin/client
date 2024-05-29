import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Button } from '@material-tailwind/react';
import { BellAlertIcon } from '@heroicons/react/24/solid';

const DeleteDialog = ({ delOpen, handleDelOpen, handleDelClose, handleFileDelete }) => {

    return (
        <Dialog open={delOpen} handler={handleDelOpen}>
            <DialogBody className="grid place-items-center gap-4 p-8 mt-4">
                <BellAlertIcon className="h-10 w-10 text-red-500" />
                <Typography color="red" variant="h4">
                    Confirm to Proceed
                </Typography>
                <Typography className="text-center font-normal">
                    This is going to remove the selected file from the servers permanently.
                </Typography>
            </DialogBody>
            <div className="flex justify-center space-x-2 p-4 mb-4">
                <Button variant="text" color="blue-gray" onClick={handleDelClose}>
                    close
                </Button>
                <Button variant="gradient" onClick={handleFileDelete}>
                    Ok, Got it
                </Button>
            </div>
        </Dialog>
    );
}

export default DeleteDialog;
import React from 'react';
import { Dialog, DialogBody, Typography, Button } from '@material-tailwind/react';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import useDeleteFile from '../hooks/useDeleteFile';

const DeleteDialog = ({ delOpen, handleDelOpen, fileId }) => {

    const { deleteFile } = useDeleteFile();

    const handleFileDelete = async () => {
        console.log("deleting file: ", fileId);
        const response = await deleteFile(fileId);
        console.log(response);
    }

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
                <Button variant="text" color="blue-gray" onClick={handleDelOpen}>
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
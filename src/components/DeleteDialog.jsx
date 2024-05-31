import React from 'react';
import { Dialog, DialogBody, Typography, Button } from '@material-tailwind/react';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import useDeleteFile from '../hooks/useDeleteFile';

// toastify
import { toast } from 'react-toastify';

const DeleteDialog = ({ delOpen, handleDelOpen, fileId, getFileList }) => {

    const { deleteFile } = useDeleteFile();

    const handleFileDelete = async () => {
        console.log("deleting file: ", fileId);
        try {
            const response = await deleteFile(fileId);
            console.log(response);
            getFileList();
            handleDelOpen();
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred while deleting the file. Please try again later.");
        }
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
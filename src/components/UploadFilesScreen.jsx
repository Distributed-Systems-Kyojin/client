import React, { useState } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/16/solid';
import useFileUpload from '../hooks/useFileUpload';

const UploadFilesScreen = () => {

    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const { uploadFile } = useFileUpload();

    const handleClearFile = () => {
        setFileName('');
        setFile(null);
    }

    const handleFileUpload = async (formData) => {
        console.log(formData['file']);
    }

    return (
        <Card className="h-[calc(100vh-2rem)] w-full p-8 shadow-xl shadow-blue-gray-900/5">
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    const { files } = e.dataTransfer;
                    files[0] && setFileName(files[0].name);
                    if (files){
                        const reader = new FileReader();
                        reader.onload = () => {
                            setFile(reader.result);
                        }
                        reader.readAsDataURL(files[0]);
                    }
                }}
            >
                <Card 
                    className="container mx-auto border border-dashed border-gray-900 h-80 w-full p-16 shadow-none flex flex-col justify-center items-center bg-gray-400 hover:bg-gray-300 cursor-pointer"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                >
                    <form>
                        <input 
                            type="file" 
                            hidden
                            onChange={async ({ target: {files} }) => {
                                files[0] && setFileName(files[0].name);
                                if (files){
                                    const formData = new FormData();
                                    formData.append('file', files[0]);
                                    const result = await handleFileUpload(formData);
                                }
                            }}
                        />
                    </form>
                    <ArrowUpTrayIcon className="h-16 w-16 text-gray-900" />
                    <Typography variant='h6' className='text-center'>
                        Click to upload or drag and drop files here
                    </Typography>
                </Card>
            </div>
            {file ? <div className="file-details p-4 me-auto mt-8 flex shadow-xl shadow-blue-gray-900/5">
                <Typography variant='h6' className='flex-auto mr-2'>
                    {fileName}
                </Typography>
                <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={handleClearFile} />
            </div> : null}
            <Button 
                className="mt-8 me-auto w-32"
                onClick={handleFileUpload}
            >
                Upload
            </Button>
        </Card>
    );
}

export default UploadFilesScreen;
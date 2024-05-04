import React, { useState, useEffect } from 'react';
import { Typography, CardHeader, CardBody, Button } from '@material-tailwind/react';
import { DocumentChartBarIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const FileOverview = ({ fileArray, selectedFileId }) => {

    const [selectedFileIndex, setSelectedFileIndex] = useState(-1);

    useEffect(() => {
        const index = fileArray.findIndex((file) => file.id === selectedFileId);
        setSelectedFileIndex(index);
    }, [fileArray, selectedFileId]);

    return (
        <div className='flex flex-col'>
            <CardHeader color='gray' floated={false} shadow={false} className='m-0 flex px-4 py-8 text-center'>
                <DocumentChartBarIcon className='h-8 w-8 mr-8' />
                <Typography variant="h5" color="white">
                    File Metadata
                </Typography>
            </CardHeader>
            <CardBody className='flex flex-col justify-stretch h-full'>
                {selectedFileIndex !== -1 ? <>
                    <div className="flex flex-col">
                        <Typography variant="h6" color="blue-gray" className='flex'>
                            {fileArray[selectedFileIndex].name}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            {/* display in bytes, KB, or MB */}
                            {fileArray[selectedFileIndex].size > 1024 ?
                                fileArray[selectedFileIndex].size > 1048576 ? 
                                    `${(fileArray[selectedFileIndex].size / 1048576).toFixed(2)} MB` : 
                                    `${(fileArray[selectedFileIndex].size / 1024).toFixed(2)} KB` : 
                                `${fileArray[selectedFileIndex].size} bytes`}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            {fileArray[selectedFileIndex].modifiedDate}
                        </Typography>
                    </div>
                    <div className="flex flex-col my-8">
                        <Button className='flex me-auto mt-4' value={fileArray[selectedFileIndex].id} onClick={(e) => console.log("verifying file ", e.target.value)}>
                            Verify Integrity
                            <CheckIcon className='h-4 w-4 ml-2' />
                        </Button>
                        <Button className='flex me-auto mt-4' value={fileArray[selectedFileIndex].id} onClick={(e) => console.log("downloading file ", e.target.value)}>
                            Download
                            <ArrowDownTrayIcon className='h-4 w-4 ml-2' />
                        </Button>
                    </div>
                </> : 'File not Selected'}
            </CardBody>
        </div>
    );
}

export default FileOverview;
import React, { useState, useEffect } from 'react';
import { Typography, CardHeader, CardBody, Button } from '@material-tailwind/react';
import { DocumentChartBarIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import useFileRetrieve from '../hooks/useFileRetrieve';

const FileOverview = ({ fileArray, selectedFileId }) => {

    const [selectedFileIndex, setSelectedFileIndex] = useState(-1);
    const { fetchFile } = useFileRetrieve();

    useEffect(() => {
        const index = fileArray.findIndex((file) => file.fileId === selectedFileId);
        setSelectedFileIndex(index);
    }, [fileArray, selectedFileId]);

    const handleFileDownload = async (fileId) => {
        console.log("Downloading file ", fileId);
        const response = await fetchFile(fileId);
        console.log("this is the response");
        console.log(response);
        const data = await response.arrayBuffer();
        console.log("this is arrayBuffer");
        console.log(data);
        const blob = new Blob([data], { type: response.headers.get('content-type') });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        // const contentDisposition = response.headers.get('content-disposition') || '';
        const filename = fileArray[selectedFileIndex].fileName;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    }

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
                            {fileArray[selectedFileIndex].fileName}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            {/* display in bytes, KB, or MB */}
                            {fileArray[selectedFileIndex].fileSize > 1024 ?
                                fileArray[selectedFileIndex].fileSize > 1048576 ? 
                                    `${(fileArray[selectedFileIndex].fileSize / 1048576).toFixed(2)} MB` : 
                                    `${(fileArray[selectedFileIndex].fileSize / 1024).toFixed(2)} KB` : 
                                `${fileArray[selectedFileIndex].fileSize} bytes`}
                        </Typography>
                        <Typography variant="h6" color="blue-gray" className='flex'>
                            {fileArray[selectedFileIndex].fileType}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            Created At: {fileArray[selectedFileIndex].createdAt}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            Last Modified: {fileArray[selectedFileIndex].lastModified}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            Last Accessed: {fileArray[selectedFileIndex].lastAccessed}
                        </Typography>
                    </div>
                    <div className="flex flex-col my-8">
                        {/* <Button className='flex me-auto mt-4' value={fileArray[selectedFileIndex].id} onClick={(e) => console.log("verifying file ", e.target.value)}>
                            Verify Integrity
                            <CheckIcon className='h-4 w-4 ml-2' />
                        </Button> */}
                        <Button className='flex me-auto mt-4' value={fileArray[selectedFileIndex].fileId} onClick={(e) => handleFileDownload(e.target.value)}>
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
import React from 'react';
import { Typography, CardHeader, CardBody, Button } from '@material-tailwind/react';
import { DocumentChartBarIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const FileOverview = () => {
  return (
    <div className='flex flex-col'>
        <CardHeader color='gray' floated={false} shadow={false} className='m-0 flex px-4 py-8 text-center'>
            <DocumentChartBarIcon className='h-8 w-8 mr-8' />
            <Typography variant="h5" color="white">
                File Metadata
            </Typography>
        </CardHeader>
        <CardBody className='flex flex-col justify-stretch h-full'>
            <div className="flex flex-col">
                <Typography variant="h6" color="blue-gray" className='flex'>
                    random_file_name_1.txt
                </Typography>
                <Typography variant="h6" color="blue-gray">
                    126 KB
                </Typography>
                <Typography variant="h6" color="blue-gray">
                    2021-09-01 9.34 AM
                </Typography>
            </div>
            <div className="flex flex-col my-8">
                <Button className='flex me-auto mt-4'>
                    Verify Integrity
                    <CheckIcon className='h-4 w-4 ml-2' />
                </Button>
                <Button className='flex me-auto mt-4'>
                    Download
                    <ArrowDownTrayIcon className='h-4 w-4 ml-2' />
                </Button>
            </div>
        </CardBody>
    </div>
  );
}

export default FileOverview;
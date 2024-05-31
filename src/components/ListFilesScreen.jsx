import React, { useState, useEffect } from 'react';
import { Card, Typography, CardFooter, Button, IconButton, Spinner } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
// import FileOverview from './FileOverview';
import useFileList from '../hooks/useFileList';
import useFileRetrieve from '../hooks/useFileRetrieve';
import DeleteDialog from './DeleteDialog';

// toastify
import { toast } from 'react-toastify';

const ListFilesScreen = () => {

    // initialize the file list at component load
    const [fileList, setFileList] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const { fetchFileList } = useFileList();

    const getFileList = async () => {
        try {
            const files = await fetchFileList();
            setFileList(files);
            setFilteredFiles(files);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getFileList();
    }, [fetchFileList]);

    // related to delete dialog box
    const [delOpen, setDelOpen] = useState(false);
    const [currFileId, setCurrFileId] = useState(null);
    const handleDelOpen = () => setDelOpen(!delOpen);

    // related to file list table
    const TABLE_HEAD = ['File Name', 'Type', 'Size', 'Created At', 'Last Modified', 'Last Accessed', 'Actions'];
    const ITEMS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < Math.ceil(filteredFiles.length / ITEMS_PER_PAGE)) {
            setCurrentPage(currentPage + 1);
        }
    }

    // related to file search
    const [searchTerm, setSearchTerm] = useState('');

    const handleFileSearch = () => {
        const filteredFiles = fileList.filter((file) => file.fileName.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredFiles(filteredFiles);
    }

    useEffect(() => {
        handleFileSearch();
    }, [searchTerm]);

    // related to file download
    const { fetchFile } = useFileRetrieve();
    const [isFileDownloaded, setIsFileDownloaded] = useState(true);
    const [currDownloadingFileId, setCurrDownloadingFileId] = useState(null);

    const handleFileDownload = async (fileId, fileName) => {
        console.log("Downloading file ", fileId);
        setIsFileDownloaded(false);
        try {
            const response = await fetchFile(fileId);
            const data = response.data;
            const blob = new Blob([data], { type: response.headers.get('content-type') });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            // const contentDisposition = response.headers.get('content-disposition') || '';
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            toast.success("file downloaded successfully");
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred while downloading the file. Please try again later");
        } finally {
            setIsFileDownloaded(true);
            setCurrDownloadingFileId(null);
        }
    }

    return (
        <>
            <Card className="h-[calc(100vh-2rem)] w-full p-8 shadow-xl shadow-blue-gray-900/5">
                <div className="relative flex items-center rounded-lg shadow-md overflow-hidden p-4 w-full">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                    <input 
                        className='peer h-full w-full outline-none text-sm text-gray-700 pr-2'
                        placeholder='Search Files'
                        type='text' 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="container w-full mt-12 flex overflow-y-auto">
                    {/* <div className="file-list flex-auto w-64">
                        <List className='m-0 p-0'>
                            {filteredFiles.map((file) => (
                                <ListItem key={file.fileId} selected={selected === file.fileId} onClick={() => setSelected(file.fileId)} className='p-4 shadow-sm mt-4 flex'>
                                    <div className="flex-2">{file.fileName}</div>
                                    <div className="flex-auto text-end">
                                        <Typography className='modified-date' variant="small" color="gray">
                                            {file.lastModified}
                                        </ Typography>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div className="container flex-auto w-32 border rounded-lg mx-4 text-start p-4">
                        <FileOverview fileArray={fileList} selectedFileId={selected} />
                    </div> */}
                    {filteredFiles.length !== 0 ? <Card className="h-full w-full overflow-scroll">
                        <table className="w-full table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFiles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(({ fileId, fileName, fileType, fileSize, createdAt, lastModified, lastAccessed }, index) => {
                                    const isLast = index === filteredFiles.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                    <tr key={fileId} className="even:bg-blue-gray-50/50">
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {fileName}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {fileType}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                            {fileSize > 1024 ?
                                                fileSize > 1048576 ? 
                                                    `${(fileSize / 1048576).toFixed(2)} MB` : 
                                                    `${(fileSize / 1024).toFixed(2)} KB` : 
                                                `${fileSize} bytes`}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(createdAt).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(createdAt).toLocaleTimeString()}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(lastModified).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(lastModified).toLocaleTimeString()}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(lastAccessed).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {new Date(lastAccessed).toLocaleTimeString()}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <IconButton 
                                                variant='text' 
                                                ripple={true} 
                                                value={fileId} 
                                                onClick={() => {
                                                    setCurrDownloadingFileId(fileId);
                                                    handleFileDownload(fileId, fileName);
                                                }} 
                                                disabled={!isFileDownloaded}
                                            >
                                                {
                                                    (currDownloadingFileId === fileId)
                                                        ? <Spinner className='h-4 w-4' />
                                                        : <ArrowDownTrayIcon className='h-5 w-5' />
                                                }
                                            </IconButton>
                                            <IconButton variant='text' ripple={true} value={fileId} onClick={() => {
                                                setCurrFileId(fileId);
                                                handleDelOpen();
                                            }}>
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page {currentPage} of {Math.ceil(filteredFiles.length / ITEMS_PER_PAGE)}
                            </Typography>
                            <div className="flex gap-2">
                                <Button variant="outlined" size="sm" onClick={handlePrevious}>
                                    Previous
                                </Button>
                                <Button variant="outlined" size="sm" onClick={handleNext}>
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card> : <Typography variant='paragraph'>No files to display</Typography>}
                </div>
            </Card>
            <DeleteDialog 
                delOpen={delOpen} 
                handleDelOpen={handleDelOpen} 
                fileId={currFileId}
                getFileList={getFileList}
            />
        </>
    );
}

export default ListFilesScreen;
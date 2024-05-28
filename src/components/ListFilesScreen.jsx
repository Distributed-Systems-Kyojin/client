import React, { useState, useEffect } from 'react';
import { Card, List, ListItem, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import FileOverview from './FileOverview';
import useFileList from '../hooks/useFileList';

const ListFilesScreen = () => {

    const [selected, setSelected] = useState(0);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fileList, setFileList] = useState([]);

    const { fetchFileList } = useFileList();

    useEffect(() => {
        const getFileList = async () => {
            const files = await fetchFileList();
            console.log(files);
            setFileList(files);
            setFilteredFiles(files);
        }
        getFileList();
    }, [fetchFileList]);

    const handleFileSearch = () => {
        const filteredFiles = fileList.filter((file) => file.fileName.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredFiles(filteredFiles);
    }

    useEffect(() => {
        handleFileSearch();
    }, [searchTerm]);

    return (
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
                <div className="file-list flex-auto w-64">
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
                </div>
            </div>
        </Card>
    );
}

export default ListFilesScreen;
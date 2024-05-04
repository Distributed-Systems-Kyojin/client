import React, { useState, useEffect } from 'react';
import { Card, List, ListItem, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import FileOverview from './FileOverview';

const ListFilesScreen = () => {

    const [selected, setSelected] = useState(0);
    const setSelectedItem = (value) => setSelected(value);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fileArray = [
        { id: 1, name: 'Document_xyz.docx', size: 64342, modifiedDate: '2021-09-01' },
        { id: 2, name: 'Presentation_abc.pptx', size: 23456, modifiedDate: '2021-10-05' },
        { id: 3, name: 'Spreadsheet_qwe.xlsx', size: 12345, modifiedDate: '2022-01-15' },
        { id: 4, name: 'Image_zxc.jpg', size: 98765, modifiedDate: '2021-11-20' },
        { id: 5, name: 'Video_asd.mp4', size: 54321, modifiedDate: '2022-02-28' },
        { id: 6, name: 'Audio_fgh.mp3', size: 87654, modifiedDate: '2021-12-10' },
        { id: 7, name: 'Code_xyz.py', size: 34567, modifiedDate: '2022-03-05' },
        { id: 8, name: 'Text_abc.txt', size: 45678, modifiedDate: '2022-04-15' },
        { id: 9, name: 'Document_qwe.doc', size: 98765, modifiedDate: '2022-05-20' },
        { id: 10, name: 'Presentation_zxc.pptx', size: 23456, modifiedDate: '2022-06-30' },
        { id: 11, name: 'Spreadsheet_asd.xlsx', size: 87654, modifiedDate: '2022-07-25' },
        { id: 12, name: 'Image_fgh.jpg', size: 54321, modifiedDate: '2022-08-10' },
        { id: 13, name: 'Video_xyz.mp4', size: 12345, modifiedDate: '2022-09-15' },
        { id: 14, name: 'Audio_abc.mp3', size: 23456, modifiedDate: '2022-10-20' },
        { id: 15, name: 'Code_qwe.py', size: 98765, modifiedDate: '2022-11-30' }
    ];

    const handleFileSearch = () => {
        const filteredFiles = fileArray.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
                        {filteredFiles.map((file, index) => (
                            <ListItem key={index} selected={selected === index} onClick={() => setSelectedItem(index)} className='p-4 shadow-sm mt-4 flex'>
                                <div className="flex-2">{file.name}</div>
                                <div className="flex-auto text-end">
                                    <Typography className='modified-date' variant="small" color="gray">
                                        {file.modifiedDate}
                                    </ Typography>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div className="container flex-auto w-32 border rounded-lg mx-4 text-start p-4">
                    <FileOverview fileArray={fileArray} selectedFileIndex={selected} />
                </div>
            </div>
        </Card>
    );
}

export default ListFilesScreen;
import React, { useState } from 'react';
import { Card, List, ListItem, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import FileOverview from './FileOverview';

const ListFilesScreen = () => {

    const [selected, setSelected] = useState(0);
    const setSelectedItem = (value) => setSelected(value);

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
                />
            </div>
            <div className="container w-full mt-12 flex">
                <div className="file-list flex-auto w-64">
                    <List className='m-0 p-0'>
                        <ListItem selected={selected === 1} onClick={() => setSelectedItem(1)} className='p-4 shadow-sm my-4 flex'>
                            <div className="flex-2">File 1</div>
                            <div className="flex-auto text-end">
                                <Typography className='modified-date' variant="small" color="gray">
                                    2021-09-01
                                </ Typography>
                            </div>
                        </ListItem>
                        <ListItem selected={selected === 2} onClick={() => setSelectedItem(2)} className='p-4 shadow-sm my-4'>
                            <div className="flex-2">File 2</div>
                            <div className="flex-auto text-end">
                                <Typography className='modified-date' variant="small" color="gray">
                                    2021-09-01
                                </ Typography>
                            </div>
                        </ListItem>
                        <ListItem selected={selected === 3} onClick={() => setSelectedItem(3)} className='p-4 shadow-sm my-4'>
                            <div className="flex-2">File 3</div>
                            <div className="flex-auto text-end">
                                <Typography className='modified-date' variant="small" color="gray">
                                    2021-09-01
                                </ Typography>
                            </div>
                        </ListItem>
                        <ListItem selected={selected === 4} onClick={() => setSelectedItem(4)} className='p-4 shadow-sm my-4'>
                            <div className="flex-2">File 4</div>
                            <div className="flex-auto text-end">
                                <Typography className='modified-date' variant="small" color="gray">
                                    2021-09-01
                                </ Typography>
                            </div>
                        </ListItem>
                        <ListItem selected={selected === 5} onClick={() => setSelectedItem(5)} className='p-4 shadow-sm my-4'>
                            <div className="flex-2">File 5</div>
                            <div className="flex-auto text-end">
                                <Typography className='modified-date' variant="small" color="gray">
                                    2021-09-01
                                </ Typography>
                            </div>
                        </ListItem>
                    </List>
                </div>
                <div className="container flex-auto w-32 border rounded-lg mx-4 text-start p-4">
                    <FileOverview />
                </div>
            </div>
        </Card>
    );
}

export default ListFilesScreen;
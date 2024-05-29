import React, { useState } from 'react';

import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Drawer, IconButton, Tooltip } from '@material-tailwind/react';
import { UserCircleIcon, PowerIcon, FolderArrowDownIcon, FolderPlusIcon, MagnifyingGlassIcon, PresentationChartBarIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ setSelectedScreen }) => {
    return (
        <>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[50rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <List className='p-0 hidden lg:flex'>
                    <ListItem className='my-2' onClick={() => setSelectedScreen('dashboard')}>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-7 w-7" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem className='my-2' onClick={() => setSelectedScreen('listfiles')}>
                        <ListItemPrefix>
                            <FolderArrowDownIcon className="h-7 w-7" />
                        </ListItemPrefix>
                        List Files
                    </ListItem>
                    <ListItem className='my-2' onClick={() => setSelectedScreen('searchfiles')}>
                        <ListItemPrefix>
                            <MagnifyingGlassIcon className="h-7 w-7" />
                        </ListItemPrefix>
                        Search Files
                    </ListItem>
                    <ListItem className='my-2' onClick={() => setSelectedScreen('uploadfiles')}>
                        <ListItemPrefix>
                            <FolderPlusIcon className="h-7 w-7" />
                        </ListItemPrefix>
                        Upload Files
                    </ListItem>
                    <ListItem className='my-2' onClick={() => setSelectedScreen('profile')}>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-7 w-7" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                    <ListItem className='my-2'>
                        <ListItemPrefix>
                            <PowerIcon className="h-7 w-7" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
                <Tooltip placement="right" content="dashboard" color="blue-gray">
                    <IconButton className='lg:hidden my-2' variant="text" size="lg" onClick={() => setSelectedScreen('dashboard')}>
                        <PresentationChartBarIcon className="h-7 w-7 stroke-2 text-blue-gray-400" />
                    </IconButton>
                </Tooltip>
                <Tooltip placement="right" content="list files" color="blue-gray">
                    <IconButton className='lg:hidden my-2' variant="text" size="lg" onClick={() => setSelectedScreen('listfiles')}>
                        <FolderArrowDownIcon className="h-7 w-7 stroke-2 text-blue-gray-400" />
                    </IconButton>
                </Tooltip>
                <Tooltip placement="right" content="search files" color="blue-gray">
                    <IconButton className='lg:hidden my-2' variant="text" size="lg" onClick={() => setSelectedScreen('searchfiles')}>
                        <MagnifyingGlassIcon className="h-7 w-7 stroke-2 text-blue-gray-400" />
                    </IconButton>
                </Tooltip>
                <Tooltip placement="right" content="upload files" color="blue-gray">
                    <IconButton className='lg:hidden my-2' variant="text" size="lg" onClick={() => setSelectedScreen('uploadfiles')}>
                        <FolderPlusIcon className="h-7 w-7 stroke-2 text-blue-gray-400" />
                    </IconButton>
                </Tooltip>
                <Tooltip placement="right" content="profile" color="blue-gray">
                    <IconButton className='lg:hidden my-2' variant="text" size="lg" onClick={() => setSelectedScreen('profile')}>
                        <UserCircleIcon className="h-7 w-7 stroke-2 text-blue-gray-400" />
                    </IconButton>
                </Tooltip>
                <Tooltip placement="right" content="log out" color="blue-gray">
                    <IconButton className='lg:hidden my-2' variant="text" size="lg">
                        <PowerIcon className="h-7 w-7 stroke-2 text-blue-gray-400" />
                    </IconButton>
                </Tooltip>
            </Card>
        </>
    );
}

export default Sidebar;
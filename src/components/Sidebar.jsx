import React, { useState } from 'react';

import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Drawer, IconButton } from '@material-tailwind/react';
import { UserCircleIcon, PowerIcon, FolderArrowDownIcon, FolderPlusIcon, MagnifyingGlassIcon, PresentationChartBarIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ setSelectedScreen }) => {

    // related to sidebar with burger menu
    const [open, setOpen] = useState(0);
    const [openAlert, setOpenAlert] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[50rem] p-4 shadow-xl shadow-blue-gray-900/5">
                {isDrawerOpen ? (
                    <IconButton className='lg:hidden' variant="text" size="lg" onClick={closeDrawer}>
                        <XMarkIcon className="h-7 w-7 stroke-2" />
                    </IconButton>
                ) : (
                    <IconButton className='lg:hidden' variant="text" size="lg" onClick={openDrawer}>
                        <Bars3Icon className="h-7 w-7 stroke-2" />
                    </IconButton>
                )}
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
            </Card>
            <Drawer className='p-4' open={isDrawerOpen} onClose={closeDrawer}>
                {isDrawerOpen ? (
                    <IconButton variant="text" size="lg" onClick={closeDrawer}>
                        <XMarkIcon className="h-7 w-7 stroke-2" />
                    </IconButton>
                ) : (
                    <IconButton variant="text" size="lg" onClick={openDrawer}>
                        <Bars3Icon className="h-7 w-7 stroke-2" />
                    </IconButton>
                )}
                <List className='p-0'>
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
            </Drawer>
        </>
    );
}

export default Sidebar;
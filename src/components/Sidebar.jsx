import React from 'react';

import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from '@material-tailwind/react';
import { FolderIcon, UserCircleIcon, PowerIcon, FolderArrowDownIcon, FolderPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ setSelectedScreen }) => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[50rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
            {/* <Typography variant="h5" color="blue-gray">
                Menu
            </Typography> */}
        </div>
        <List>
            <ListItem onClick={() => setSelectedScreen('dashboard')}>
                <ListItemPrefix>
                    <FolderIcon className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
            </ListItem>
            <ListItem onClick={() => setSelectedScreen('listfiles')}>
                <ListItemPrefix>
                    <FolderArrowDownIcon className="h-5 w-5" />
                </ListItemPrefix>
                List Files
            </ListItem>
            <ListItem onClick={() => setSelectedScreen('searchfiles')}>
                <ListItemPrefix>
                    <MagnifyingGlassIcon className="h-5 w-5" />
                </ListItemPrefix>
                Search Files
                {/* <ListItemSuffix>
                    <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                </ListItemSuffix> */}
            </ListItem>
            <ListItem onClick={() => setSelectedScreen('uploadfiles')}>
                <ListItemPrefix>
                    <FolderPlusIcon className="h-5 w-5" />
                </ListItemPrefix>
                Upload Files
            </ListItem>
            <ListItem onClick={() => setSelectedScreen('profile')}>
                <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
            </ListItem>
        </List>
    </Card>
  );
}

export default Sidebar;
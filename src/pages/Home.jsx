import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ListFilesScreen from '../components/ListFilesScreen';
import UploadFilesScreen from '../components/UploadFilesScreen';
import Dashboard from '../components/Dashboard';
import ProfileScreen from '../components/ProfileScreen';

const Home = () => {

  const [selectedScreen, setSelectedScreen] = useState('dashboard');

  return (
    <div className='bg-background fixed flex w-full h-full'>
      <div className="container mx-auto flex">
        <div className="sidebar container flex-1 content-center p-4">
          <Sidebar setSelectedScreen={setSelectedScreen} />
        </div>
        <div className="content container flex-auto content-center p-4 pl-0">
          {selectedScreen === 'dashboard' && <Dashboard />}
          {selectedScreen === 'listfiles' && <ListFilesScreen />}
          {selectedScreen === 'searchfiles' && <ListFilesScreen />}
          {selectedScreen === 'uploadfiles' && <UploadFilesScreen />}
          {selectedScreen === 'profile' && <ProfileScreen />}
        </div>
      </div>
    </div>
  );
}

export default Home;
import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ActiveMasterNodesProvider from './contexts/activeMasterNodes-context';
import { HomePage } from './screens/home/HomePage';
function App() {
  return (
    <ActiveMasterNodesProvider>
      <HomePage />
    </ActiveMasterNodesProvider>
    
  );
}

export default App;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import state from './store';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import { useSnapshot } from 'valtio';

const App = () => {
  const snap = useSnapshot(state);
  return (
    <main className="app transition-all ease-in">
      {/* Render the page based on the current state */}
      {getPageComponent(snap.currentPage)}
      <Canvas />

      {/* AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {snap.currentPage && (
          <motion.section key={snap.currentPage}>
            {getPageComponent(snap.currentPage)}
          </motion.section> 
        )}
        
      </AnimatePresence>

    </main>
  );
};

const getPageComponent = (page) => {
  switch (page) {
    case 'home':
      return <Home />;
    case 'customizer':
      return <Customizer />;
    case 'authentication':
      return <Authentication />;
    default:
      return null;
  }
};

export default App;

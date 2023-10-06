import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
   return (
      <ParallaxProvider>
         <Router>
            <Navbar />
            <Routes>
               <Route path="/" element={<Home />} />
               {/* Add more Routes for other pages here */}
            </Routes>
         </Router>
      </ParallaxProvider>
   );
}

export default App;

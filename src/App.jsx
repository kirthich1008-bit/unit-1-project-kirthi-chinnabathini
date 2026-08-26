import { Routes, Route } from 'react-router';
import { useState } from 'react';
import Header from './components/Layout/Header';
import HomePage from './components/Pages/Home';
import AboutPage from './components/Pages/About';
import ProfilePage from './components/Pages/ChildrenProfile';
import MemoryPage from './components/Pages/Memories';
import MilestonePage from './components/Pages/Milestones';
import GalleryPage from './components/Pages/Gallery';
import Footer from './components/Layout/Footer';
import './App.css';

const App = () => {
   
  const [galleryData] = useState(() => {
    const parse = (key) => JSON.parse(localStorage.getItem(key)) || { Duggu: [], Mikku: [] };
    const milestones = parse('childrenMilestones');
    const memories = parse('childrenMemories');
    const combined = [];

    // merging data to gallery page
    const mergeData = (dataObject, type) => {
      Object.entries(dataObject).forEach(([childName, data]) => {
        if (Array.isArray(data)) {
          data.forEach((item) => combined.push({ ...item, childName, type }));
        }
      });
    };

    mergeData(milestones, 'Milestone');
    mergeData(memories, 'Memory');

    return combined.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  return(
    <>
    <Header/>
    <Routes>
      
      
      
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/childrenprofile" element={<ProfilePage/>}/>
      <Route path="/memories" element={<MemoryPage/>}/>
      <Route path="/milestones" element={<MilestonePage/>}/>
      <Route path="/gallery" element={<GalleryPage data={galleryData}/>}/>


      


    </Routes>
    <Footer/>
    
    </>
  );
};

export default App;


import { Routes, Route } from 'react-router';
import Header from './components/Layout/Header';
import HomePage from './components/Pages/Home';
import AboutPage from './components/Pages/About';
import ProfilePage from './components/Pages/ChildrenProfile';
import MemoryCard from './components/Pages/Memories';
import MilestonePage from './components/Pages/Milestones';
import Gallery from './components/Pages/Gallery';
import Footer from './components/Layout/Footer';
import './app.css';

const App = () => {
  return(
    <>
    <Header/>
    <Routes>
      
      
      
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/childrenprofile" element={<ProfilePage/>}/>
      <Route path="/memories" element={<MemoryCard/>}/>
      <Route path="/milestones" element={<MilestonePage/>}/>
      <Route path="/gallery" element={<Gallery/>}/>


      


    </Routes>
    <Footer/>
    
    </>
  );
};

export default App;


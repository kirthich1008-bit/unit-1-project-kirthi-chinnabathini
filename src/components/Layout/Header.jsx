import './Layout.css';
import Navigation from "./Navigation";

const Header = () => {
    return(
        <header>
            <div className="header">
            
            <img src="logo.jpeg" alt="family picture" height={100} width={100}/> 
            <h1>SK Memories & Milestones</h1>
           

                
            </div>
            <Navigation/>
        </header>
    );
};

export default Header;